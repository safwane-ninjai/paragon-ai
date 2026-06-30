import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildActivationEmail } from "@/lib/email/activation";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  // DocuSeal envoie différents event_type — on ne traite que la complétion
  if (payload.event_type !== "submission.completed") {
    return NextResponse.json({ ok: true });
  }

  const submission = payload.data ?? payload;
  const externalId: string | undefined = submission.external_id;
  const documents: { name: string; url: string }[] = submission.documents ?? [];

  if (!externalId) {
    console.error("Webhook DocuSeal: external_id manquant");
    return NextResponse.json({ ok: true });
  }

  // Récupérer les infos artisan depuis Airtable via external_id (= artisanId)
  const airtableKey = process.env.AIRTABLE_API_KEY;
  const baseId      = process.env.AIRTABLE_BASE_ID;
  const tableId     = process.env.AIRTABLE_TABLE_ARTISANS;
  const tableAbo    = process.env.AIRTABLE_TABLE_ABONNEMENTS;

  if (!airtableKey || !baseId || !tableId || !tableAbo) {
    console.error("Webhook: Airtable non configuré");
    return NextResponse.json({ ok: true });
  }

  const artisanRes = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableId}/${externalId}`,
    { headers: { Authorization: `Bearer ${airtableKey}` }, signal: AbortSignal.timeout(6000) },
  ).catch(() => null);

  if (!artisanRes?.ok) {
    console.error("Webhook: artisan introuvable pour id", externalId);
    return NextResponse.json({ ok: true });
  }

  const artisan = await artisanRes.json();
  const f = artisan.fields ?? {};
  const email         = f["Email"] as string;
  const prenom        = f["Prénom"] as string ?? "";
  const nom           = f["Nom"] as string ?? "";
  const nomEntreprise = f["Nom Entreprise"] as string ?? "";
  const aboIds: string[] = f["Abonnements"] ?? [];

  if (!email) {
    console.error("Webhook: email manquant sur artisan", externalId);
    return NextResponse.json({ ok: true });
  }

  // Récupérer le plan depuis l'abonnement lié
  let selectedPlan = "starter";
  if (aboIds.length > 0) {
    const aboRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableAbo}/${aboIds[0]}`,
      { headers: { Authorization: `Bearer ${airtableKey}` }, signal: AbortSignal.timeout(6000) },
    ).catch(() => null);
    if (aboRes?.ok) {
      const abo = await aboRes.json();
      selectedPlan = (abo.fields?.["Plan"] as string) ?? "starter";
    }
  }

  // Télécharger le PDF signé depuis DocuSeal
  let pdfAttachment: { filename: string; content: Buffer } | undefined;
  const pdfDoc = documents.find((d) => d.name?.toLowerCase().endsWith(".pdf")) ?? documents[0];
  const pdfUrl = pdfDoc?.url ?? null;

  if (pdfUrl) {
    const docusealKey = process.env.DOCUSEAL_API_KEY;
    const pdfRes = await fetch(pdfUrl, {
      headers: docusealKey ? { "X-Auth-Token": docusealKey } : {},
      signal: AbortSignal.timeout(15000),
    }).catch(() => null);

    if (pdfRes?.ok) {
      const buffer = await pdfRes.arrayBuffer();
      pdfAttachment = {
        filename: "Contrat_Paragon_IA.pdf",
        content: Buffer.from(buffer),
      };
    }
  }

  // Patcher Airtable : Lien Contrat + Lien Whop
  const whopKey = process.env.WHOP_API_KEY;
  const whopEnv = process.env.NEXT_PUBLIC_WHOP_ENVIRONMENT ?? "production";
  const airtableFields: Record<string, string> = {};

  if (pdfUrl) airtableFields["Lien Contrat"] = pdfUrl;

  if (whopKey) {
    const memberRes = await fetch(
      `https://api.whop.com/api/v5/memberships?user_email=${encodeURIComponent(email)}&expand[]=user`,
      { headers: { Authorization: `Bearer ${whopKey}` }, signal: AbortSignal.timeout(6000) },
    ).catch(() => null);
    if (memberRes?.ok) {
      const memberData = await memberRes.json();
      const memberships: unknown[] = memberData?.data ?? memberData?.memberships ?? [];
      if (memberships.length > 0) {
        const m = memberships[0] as Record<string, unknown>;
        const user = m.user as Record<string, unknown> | undefined;
        const membershipId = m.id as string | undefined;
        const userId = (m.user_id ?? user?.id) as string | undefined;
        const dashBase = whopEnv === "sandbox" ? "https://sandbox.whop.com" : "https://whop.com";
        const whopUrl = membershipId
          ? `${dashBase}/memberships/${membershipId}/`
          : userId ? `${dashBase}/users/${userId}/` : null;
        if (whopUrl) airtableFields["Lien Whop"] = whopUrl;
        if (userId) airtableFields["Whop User ID"] = userId;
      }
    }
  }

  if (Object.keys(airtableFields).length > 0) {
    await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}/${externalId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${airtableKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields: airtableFields }),
      signal: AbortSignal.timeout(6000),
    }).catch((err) => console.error("Airtable patch error:", err));
    console.log("Airtable patché:", Object.keys(airtableFields).join(", "));
  }

  // Envoyer l'email d'activation avec le PDF joint
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "team@paragon-ia.tech";
  const hubUrl    = process.env.WHOP_HUB_URL ?? "https://whop.com/hub/paragon-ia/";
  const adminEmail = process.env.PARAGON_EMAIL_SUPPORT ?? "team@paragon-ia.com";

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const { subject, html, text } = buildActivationEmail({
        prenom, nom, nomEntreprise, selectedPlan, hubUrl,
      });

      const result = await resend.emails.send({
        from:    fromEmail,
        to:      email,
        bcc:     adminEmail,
        subject,
        html,
        text,
        ...(pdfAttachment ? { attachments: [pdfAttachment] } : {}),
      });

      if (result.error) console.error("Resend webhook error:", result.error);
      else console.log("Email activation + PDF envoyé à", email, result.data?.id);
    } catch (err) {
      console.error("Resend webhook exception:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
