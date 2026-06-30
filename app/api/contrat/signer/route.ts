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

  // Lien Whop rempli par le webhook /api/whop/webhook (membership.went_valid)
  const airtableKey = process.env.AIRTABLE_API_KEY;
  const baseId      = process.env.AIRTABLE_BASE_ID;
  const tableId     = process.env.AIRTABLE_TABLE_ARTISANS;

  // En dev : complétion automatique DocuSeal + envoi email immédiat (le webhook ne peut pas appeler localhost)
  if (process.env.NODE_ENV === "development") {
    try {
      // Compléter la soumission côté DocuSeal
      await fetch(`${apiUrl}/api/submitters/${submitter.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Auth-Token": apiKey },
        body: JSON.stringify({ send_email: false, completed: true }),
        signal: AbortSignal.timeout(8000),
      });

      // Attendre que DocuSeal génère le PDF
      await new Promise((r) => setTimeout(r, 4000));

      // Récupérer l'URL du PDF
      const subRes = await fetch(`${apiUrl}/api/submissions/${submitter.submission_id ?? ""}`, {
        headers: { "X-Auth-Token": apiKey },
        signal: AbortSignal.timeout(6000),
      }).catch(() => null);

      let pdfAttachment: { filename: string; content: Buffer } | undefined;
      if (subRes?.ok) {
        const subData = await subRes.json();
        const pdfDoc = (subData.documents ?? [])[0];
        if (pdfDoc?.url) {
          const pdfRes = await fetch(pdfDoc.url, {
            headers: { "X-Auth-Token": apiKey },
            signal: AbortSignal.timeout(15000),
          }).catch(() => null);
          if (pdfRes?.ok) {
            pdfAttachment = {
              filename: "Contrat_Paragon_IA.pdf",
              content: Buffer.from(await pdfRes.arrayBuffer()),
            };
          }
        }
      }

      // Patcher Airtable avec Lien Contrat + Lien Whop
      if (artisanId && airtableKey && baseId && tableId) {
        const devFields: Record<string, string> = {};
        if (pdfAttachment) {
          // Récupérer l'URL publique du PDF depuis DocuSeal
          const subCheck = await fetch(`${apiUrl}/api/submissions/${submitter.submission_id ?? ""}`, {
            headers: { "X-Auth-Token": apiKey },
            signal: AbortSignal.timeout(6000),
          }).catch(() => null);
          if (subCheck?.ok) {
            const subData = await subCheck.json();
            const pdfUrl = (subData.documents ?? [])[0]?.url;
            if (pdfUrl) devFields["Lien Contrat"] = pdfUrl;
          }
        }
        if (Object.keys(devFields).length > 0) {
          await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}/${artisanId}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${airtableKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({ fields: devFields }),
            signal: AbortSignal.timeout(6000),
          }).catch((err) => console.error("[DEV] Airtable patch error:", err));
          console.log("[DEV] Airtable patché:", Object.keys(devFields).join(", "));
        }
      }

      // Envoyer l'email d'activation avec PDF
      const { Resend } = await import("resend");
      const { buildActivationEmail } = await import("@/lib/email/activation");
      const resendKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "team@paragon-ia.tech";
      const hubUrl    = process.env.WHOP_HUB_URL ?? "https://whop.com/hub/paragon-ia/";

      if (resendKey) {
        const resend = new Resend(resendKey);
        const { subject, html, text } = buildActivationEmail({
          prenom: compte.prenom, nom: compte.nom,
          nomEntreprise: compte.nomEntreprise, selectedPlan, hubUrl,
        });
        const result = await resend.emails.send({
          from: fromEmail, to: compte.email, bcc: adminEmail,
          subject, html, text,
          ...(pdfAttachment ? { attachments: [pdfAttachment] } : {}),
        });
        console.log("[DEV] Email activation envoyé:", result.data?.id, pdfAttachment ? "+ PDF" : "(sans PDF)");
      }
    } catch (err) {
      console.error("[DEV] Erreur auto-complétion:", err);
    }
  }

  // En prod : l'email est envoyé par /api/docuseal/webhook après signature réelle
  return NextResponse.json({ success: true });
}
