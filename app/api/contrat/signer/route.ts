import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiUrl     = process.env.DOCUSEAL_API_URL;
  const apiKey     = process.env.DOCUSEAL_API_KEY;
  const templateId = process.env.DOCUSEAL_TEMPLATE_ID;

  if (!apiUrl || !apiKey || !templateId) {
    return NextResponse.json({ error: "DocuSeal non configuré" }, { status: 503 });
  }

  const { compte, selectedPlan, nomComplet, signatureBase64, artisanId } = await req.json();
  const adminEmail = process.env.PARAGON_EMAIL_SUPPORT ?? "team@paragon-ia.com";

  if (!signatureBase64) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  // 1. Créer la soumission DocuSeal avec la signature dessinée par le client
  // déjà intégrée (champ "signature" du template) — pas d'email DocuSeal séparé,
  // le client signe directement sur la page Paragon. external_id est porté par
  // le submitter (pas par la soumission) : c'est lui qui permet de retrouver
  // l'artisan dans Airtable.
  const submissionRes = await fetch(`${apiUrl}/api/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Auth-Token": apiKey },
    body: JSON.stringify({
      template_id:  Number(templateId),
      send_email:   false,
      submitters: [
        {
          email:       compte.email,
          name:        nomComplet || `${compte.prenom} ${compte.nom}`,
          role:        "Première partie",
          send_email:  false,
          external_id: artisanId ?? undefined,
          values: {
            "société": compte.nomEntreprise,
            dirigeant: nomComplet || `${compte.prenom} ${compte.nom}`,
            email:     compte.email,
            telephone: compte.telephone,
          },
          fields: [
            { name: "signature", default_value: signatureBase64 },
          ],
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

  // 2. Valider la soumission — la signature est déjà fournie, il ne reste qu'à
  // marquer le submitter comme complété pour que DocuSeal génère le PDF final.
  await fetch(`${apiUrl}/api/submitters/${submitter.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Auth-Token": apiKey },
    body: JSON.stringify({ completed: true }),
    signal: AbortSignal.timeout(8000),
  }).catch((err) => console.error("DocuSeal completion error:", err));

  // Attendre que DocuSeal génère le PDF signé
  await new Promise((r) => setTimeout(r, 4000));

  const subRes = await fetch(`${apiUrl}/api/submissions/${submitter.submission_id ?? ""}`, {
    headers: { "X-Auth-Token": apiKey },
    signal: AbortSignal.timeout(6000),
  }).catch(() => null);

  let pdfAttachment: { filename: string; content: Buffer } | undefined;
  let pdfUrl: string | undefined;
  if (subRes?.ok) {
    const subData = await subRes.json();
    const pdfDoc = (subData.documents ?? [])[0];
    if (pdfDoc?.url) {
      pdfUrl = pdfDoc.url;
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

  // 3. Patcher Airtable avec le lien du contrat (Lien Whop géré par /api/whop/webhook)
  const airtableKey = process.env.AIRTABLE_API_KEY;
  const baseId      = process.env.AIRTABLE_BASE_ID;
  const tableId     = process.env.AIRTABLE_TABLE_ARTISANS;

  if (artisanId && pdfUrl && airtableKey && baseId && tableId) {
    await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}/${artisanId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${airtableKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields: { "Lien Contrat": pdfUrl } }),
      signal: AbortSignal.timeout(6000),
    }).catch((err) => console.error("Airtable patch error:", err));
  }

  // 4. Envoyer l'email d'activation avec le contrat signé en pièce jointe
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
    if (result.error) console.error("Resend error:", result.error);
  }

  return NextResponse.json({ success: true });
}
