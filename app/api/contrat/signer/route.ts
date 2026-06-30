import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildActivationEmail } from "@/lib/email/activation";

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
  const adminEmail = process.env.PARAGON_EMAIL_SUPPORT ?? "serviceclient@paragon-ia.com";

  // 1. Créer la soumission DocuSeal
  const submissionRes = await fetch(`${apiUrl}/api/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Auth-Token": apiKey },
    body: JSON.stringify({
      template_id: Number(templateId),
      send_email: true,
      submitters: [
        {
          email:    compte.email,
          name:     `${compte.prenom} ${compte.nom}`,
          role:     "Première partie",
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
        {
          headers: { Authorization: `Bearer ${whopKey}` },
          signal: AbortSignal.timeout(6000),
        },
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
            : whopUserId
              ? `${dashBase}/users/${whopUserId}/`
              : null;

          await patchArtisan(
            artisanId,
            {
              ...(whopProfileUrl ? { "Lien Whop": whopProfileUrl } : {}),
              ...(whopUserId ? { "Whop User ID": whopUserId } : {}),
            },
            airtableKey,
            baseId,
            tableId,
          );
          console.log("Whop info saved to Airtable:", whopProfileUrl ?? whopUserId);
        } else {
          console.log("Aucun membership Whop trouvé pour:", compte.email);
        }
      } else {
        console.error("Whop memberships error:", await memberRes.text());
      }
    } catch (err) {
      console.error("Whop lookup exception:", err);
    }
  }

  // 3. Email d'activation Resend
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const hubUrl    = process.env.WHOP_HUB_URL ?? "https://whop.com/hub/paragon-ia/";

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const { subject, html, text } = buildActivationEmail({
        prenom:        compte.prenom,
        nom:           compte.nom,
        nomEntreprise: compte.nomEntreprise,
        selectedPlan,
        hubUrl,
      });

      const result = await resend.emails.send({
        from:    fromEmail,
        to:      compte.email,
        bcc:     adminEmail,
        subject,
        html,
        text,
      });

      if (result.error) console.error("Resend error:", result.error);
      else console.log("Resend email sent:", result.data?.id);
    } catch (err) {
      console.error("Resend exception:", err);
    }
  }

  return NextResponse.json({ success: true });
}
