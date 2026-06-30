import { NextRequest, NextResponse } from "next/server";

const PLAN_DATA: Record<string, { volume: number; prixUnitaire: number; total: number }> = {
  starter: { volume: 20, prixUnitaire: 85, total: 1700 },
  booster: { volume: 30, prixUnitaire: 85, total: 2550 },
  croissance: { volume: 40, prixUnitaire: 75, total: 3000 },
};

export async function POST(req: NextRequest) {
  const apiUrl = process.env.DOCUSEAL_API_URL;
  const apiKey = process.env.DOCUSEAL_API_KEY;
  const templateId = process.env.DOCUSEAL_TEMPLATE_ID;

  if (!apiUrl || !apiKey || !templateId) {
    return NextResponse.json({ error: "DocuSeal non configuré" }, { status: 503 });
  }

  const { compte, selectedPlan, nomComplet, signatureBase64 } = await req.json();
  const plan = PLAN_DATA[selectedPlan] ?? PLAN_DATA.starter;

  // 1. Créer la soumission avec les champs pré-remplis
  const submissionRes = await fetch(`${apiUrl}/api/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Auth-Token": apiKey },
    body: JSON.stringify({
      template_id: Number(templateId),
      send_email: true,
      submitters: [
        {
          email: compte.email,
          name: `${compte.prenom} ${compte.nom}`,
          role: "Première partie",
          send_email: true,
          values: {
            societe: compte.nomEntreprise,
            dirigeant: nomComplet || `${compte.prenom} ${compte.nom}`,
            email: compte.email,
            telephone: compte.telephone,
          },
        },
      ],
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

  return NextResponse.json({ success: true });
}
