import { NextRequest, NextResponse } from "next/server";

const PLAN_META: Record<string, { volume: number; prix: number }> = {
  starter:    { volume: 20, prix: 95 },
  booster:    { volume: 30, prix: 85 },
  croissance: { volume: 40, prix: 75 },
};

async function airtablePOST(tableId: string, fields: Record<string, unknown>, apiKey: string, baseId: string) {
  const res = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableArtisans     = process.env.AIRTABLE_TABLE_ARTISANS;
  const tableAbonnements  = process.env.AIRTABLE_TABLE_ABONNEMENTS;

  if (!apiKey || !baseId || !tableArtisans || !tableAbonnements) {
    return NextResponse.json({ error: "Airtable non configuré" }, { status: 503 });
  }

  const { compte, selectedPlan, ciblage } = await req.json();
  const meta = PLAN_META[selectedPlan] ?? PLAN_META.starter;

  // 1. Créer le profil artisan
  const artisanRecord = await airtablePOST(tableArtisans, {
    "Nom Entreprise":   compte.nomEntreprise,
    "Prénom":           compte.prenom,
    "Nom":              compte.nom,
    "Email":            compte.email,
    "Téléphone":        compte.telephone,
    "Ville":            ciblage?.ville ?? "",
    "Types Chantier":   ciblage?.typesChantier ?? [],
    "Date Inscription": new Date().toISOString(),
  }, apiKey, baseId).catch((err) => {
    console.error("Airtable Artisans error:", err);
    return null;
  });

  // 2. Créer l'abonnement lié
  if (artisanRecord?.id) {
    await airtablePOST(tableAbonnements, {
      "Référence":        `${selectedPlan} — ${compte.nomEntreprise}`,
      "Plan":             selectedPlan,
      "Statut":           "En attente",
      "Volume commandé":  meta.volume,
      "Prix unitaire":    meta.prix,
      "Total":            meta.volume * meta.prix,
      "Date début":       new Date().toISOString(),
      "Artisan":          [artisanRecord.id],
    }, apiKey, baseId).catch((err) => {
      console.error("Airtable Abonnements error:", err);
    });
  }

  return NextResponse.json({ success: true, artisanId: artisanRecord?.id });
}
