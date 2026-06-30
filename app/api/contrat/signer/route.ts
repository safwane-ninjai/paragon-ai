import { NextRequest, NextResponse } from "next/server";

async function patchArtisan(
  artisanId: string,
  fields: Record<string, unknown>,
  apiKey: string,
  baseId: string,
  tableId: string,
) {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}/${artisanId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) console.error("Airtable patch error:", await res.text());
  } catch (err) {
    console.error("Airtable patch exception:", err);
  }
}

export async function POST(req: NextRequest) {
  const apiUrl     = process.env.DOCUSEAL_API_URL;
  const apiKey     = process.env.DOCUSEAL_API_KEY;
  const templateId = process.env.DOCUSEAL_TEMPLATE_ID;

  if (!apiUrl || !apiKey || !templateId) {
    return NextResponse.json({ error: "DocuSeal non configuré" }, { status: 503 });
  }

  const { compte, selectedPlan, nomComplet, artisanId } = await req.json();
  const adminEmail = process.env.PARAGON_EMAIL_SUPPORT ?? "team@paragon-ia.com";

  // 1. Créer la soumission DocuSeal
  // external_id = artisanId → utilisé par le webhook /api/docuseal/webhook pour retrouver le client
  const submissionRes = await fetch(`${apiUrl}/api/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Auth-Token": apiKey },
    body: JSON.stringify({
      template_id:  Number(templateId),
      send_email:   true,
      external_id:  artisanId ?? null,
      submitters: [
        {
          email:      compte.email,
          name:       `${compte.prenom} ${compte.nom}`,
          role:       "Première partie",
          send_email: true,
          values: {
            societe:   compte.nomEntreprise,
            dirigeant: nomComplet || `${compte.prenom} ${compte.nom}`,
            email:     compte.email,
            telephone: compte.telephone,
          },
        },
      ],
      bcc_completed: adminEmail,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!submissionRes.ok) {
    const err = await submissionRes.text();
    console.error("DocuSeal submission error:", err);
    return NextResponse.json({ error: "Erreur création soumission" }, { status: 502 });
  }

  const submissionData = await submissionRes.json();
  const submitters = Array.isArray(submissionData)
    ? submissionData
    : submissionData?.submitters ?? [];
  const submitter = submitters[0];

  if (!submitter?.id) {
    return NextResponse.json({ error: "Submitter introuvable" }, { status: 502 });
  }

  // 2. Récupérer le membership Whop par email → patcher Airtable
  const whopKey     = process.env.WHOP_API_KEY;
  const airtableKey = process.env.AIRTABLE_API_KEY;
  const baseId      = process.env.AIRTABLE_BASE_ID;
  const tableId     = process.env.AIRTABLE_TABLE_ARTISANS;
  const whopEnv     = process.env.NEXT_PUBLIC_WHOP_ENVIRONMENT ?? "production";

  if (whopKey && airtableKey && baseId && tableId && artisanId) {
    try {
      const memberRes = await fetch(
        `https://api.whop.com/api/v5/memberships?user_email=${encodeURIComponent(compte.email)}&expand[]=user`,
        { headers: { Authorization: `Bearer ${whopKey}` }, signal: AbortSignal.timeout(6000) },
      );
      if (memberRes.ok) {
        const memberData = await memberRes.json();
        const memberships: unknown[] = memberData?.data ?? memberData?.memberships ?? [];
        if (memberships.length > 0) {
          const m = memberships[0] as Record<string, unknown>;
          const user = m.user as Record<string, unknown> | undefined;
          const whopMembershipId = m.id as string | undefined;
          const whopUserId       = (m.user_id ?? user?.id) as string | undefined;
          const dashBase         = whopEnv === "sandbox" ? "https://sandbox.whop.com" : "https://whop.com";
          const whopProfileUrl   = whopMembershipId
            ? `${dashBase}/memberships/${whopMembershipId}/`
            : whopUserId ? `${dashBase}/users/${whopUserId}/` : null;

          await patchArtisan(
            artisanId,
            {
              ...(whopProfileUrl ? { "Lien Whop": whopProfileUrl } : {}),
              ...(whopUserId ? { "Whop User ID": whopUserId } : {}),
            },
            airtableKey, baseId, tableId,
          );
        }
      }
    } catch (err) {
      console.error("Whop lookup exception:", err);
    }
  }

  // L'email d'activation avec PDF est envoyé par /api/docuseal/webhook
  // dès que le client a signé dans DocuSeal
  return NextResponse.json({ success: true });
}
