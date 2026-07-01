import { NextRequest, NextResponse } from "next/server";

async function patchArtisanByEmail(
  email: string,
  fields: Record<string, string>,
  apiKey: string,
  baseId: string,
  tableId: string,
) {
  // Chercher le dernier artisan créé avec cet email
  const params = new URLSearchParams({
    filterByFormula: `{Email}="${email}"`,
    "sort[0][field]": "Date Inscription",
    "sort[0][direction]": "desc",
    maxRecords: "1",
  });
  const searchRes = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableId}?${params}`,
    { headers: { Authorization: `Bearer ${apiKey}` }, signal: AbortSignal.timeout(6000) },
  ).catch(() => null);

  if (!searchRes?.ok) return;
  const data = await searchRes.json();
  const record = data.records?.[0];
  if (!record?.id) return;

  await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}/${record.id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
    signal: AbortSignal.timeout(6000),
  }).catch((err) => console.error("Airtable patch error:", err));

  console.log("Whop webhook → Airtable patché pour", email, Object.keys(fields));
}

export async function POST(req: NextRequest) {
  const payload = await req.json();

  // Log complet pour debugger le format Whop
  console.log("Whop webhook reçu:", JSON.stringify(payload, null, 2));

  const action: string = payload.type ?? payload.action ?? "";

  if (action !== "membership.activated" && action !== "membership.went_valid" && action !== "payment.succeeded") {
    console.log("Whop webhook: event ignoré →", action);
    return NextResponse.json({ ok: true });
  }

  const data = payload.data ?? {};
  const user = data.user ?? {};
  // "membership.activated" a l'id de membership en data.id ; "payment.succeeded" l'a en data.membership.id
  const membershipId: string = data.membership?.id ?? data.id ?? "";
  const userId: string       = user.id ?? data.user_id ?? "";
  const userEmail: string    = user.email ?? data.email ?? payload.email ?? "";
  const manageUrl: string    = data.manage_url ?? "";
  const memberId: string     = data.member?.id ?? "";

  console.log("Whop webhook parsed →", { action, membershipId, userId, userEmail, manageUrl });

  if (!membershipId && !userId) {
    console.log("Whop webhook: aucune donnée membership");
    return NextResponse.json({ ok: true });
  }

  const airtableKey = process.env.AIRTABLE_API_KEY;
  const baseId      = process.env.AIRTABLE_BASE_ID;
  const tableId     = process.env.AIRTABLE_TABLE_ARTISANS;
  const whopEnv     = process.env.NEXT_PUBLIC_WHOP_ENVIRONMENT ?? "production";

  if (!airtableKey || !baseId || !tableId || !userEmail) {
    console.log("Whop webhook: config manquante ou email absent. Email trouvé:", userEmail || "AUCUN");
    return NextResponse.json({ ok: true });
  }

  const dashBase    = whopEnv === "sandbox" ? "https://sandbox.whop.com" : "https://whop.com";
  const whopUrl     = manageUrl
    || (memberId ? `${dashBase}/billing/manage/${memberId}` : "")
    || (membershipId ? `${dashBase}/memberships/${membershipId}/` : `${dashBase}/users/${userId}/`);

  const fields: Record<string, string> = {
    "Lien Whop":     whopUrl,
    "Whop User ID":  userId,
  };

  await patchArtisanByEmail(userEmail, fields, airtableKey, baseId, tableId);

  return NextResponse.json({ ok: true });
}
