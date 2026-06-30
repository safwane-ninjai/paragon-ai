"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOnboardingStore } from "@/lib/store/onboarding";

const PLAN_DATA: Record<string, { label: string; volume: number; prixUnitaire: number; total: number }> = {
  starter:    { label: "Starter",    volume: 20, prixUnitaire: 95, total: 1900 },
  booster:    { label: "Booster",    volume: 30, prixUnitaire: 85, total: 2550 },
  croissance: { label: "Croissance", volume: 40, prixUnitaire: 75, total: 3000 },
};

const HOW_CARDS = [
  {
    num: "01",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "On génère les prospects",
    desc: "Campagnes ciblées sur votre zone exclusive auprès de propriétaires de maison.",
  },
  {
    num: "02",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    title: "On les qualifie",
    desc: "Nom, email, téléphone, adresse, statut propriétaire : tout est vérifié avant attribution.",
  },
  {
    num: "03",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: "On vous les livre",
    desc: "Direct dans votre plateforme et par email. Vous payez à la livraison.",
  },
];

const inputStyle = {
  width: "100%",
  background: "#fff",
  border: "1.5px solid #E8EAEE",
  borderRadius: "12px",
  padding: "13px 16px",
  fontSize: "14.5px",
  color: "#0B1320",
  outline: "none",
  fontFamily: "inherit",
} as const;

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13,
  fontWeight: 600,
  color: "#0B1320",
  marginBottom: 8,
} as const;

export default function ContratClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { compte, selectedPlan, artisanId, setWhopReceiptId } = useOnboardingStore();
  const plan = PLAN_DATA[selectedPlan] ?? PLAN_DATA.starter;

  const [hydrated, setHydrated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [nomComplet, setNomComplet] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showContrat, setShowContrat] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setHydrated(true);
    const receiptId = searchParams.get("receipt_id") ?? searchParams.get("payment_id");
    if (receiptId) setWhopReceiptId(receiptId);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!hydrated) return;
    if (!compte.email) router.replace("/onboarding/ciblage");
  }, [hydrated]); // eslint-disable-line

  function getPos(e: MouseEvent | Touch, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const clientX = "clientX" in e ? e.clientX : (e as Touch).clientX;
    const clientY = "clientY" in e ? e.clientY : (e as Touch).clientY;
    return { x: (clientX - rect.left) * (canvas.width / rect.width), y: (clientY - rect.top) * (canvas.height / rect.height) };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    drawing.current = true;
    const canvas = canvasRef.current!;
    const raw = "touches" in e ? e.touches[0] : (e as React.MouseEvent).nativeEvent;
    lastPos.current = getPos(raw as MouseEvent | Touch, canvas);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing.current || !canvasRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const raw = "touches" in e ? e.touches[0] : (e as React.MouseEvent).nativeEvent;
    const pos = getPos(raw as MouseEvent | Touch, canvas);
    ctx.beginPath();
    ctx.strokeStyle = "#0B1320";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
    lastPos.current = pos;
  }

  function stopDraw() { drawing.current = false; lastPos.current = null; }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
  }

  function isCanvasEmpty() {
    const canvas = canvasRef.current;
    if (!canvas) return true;
    return !canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height).data.some((v) => v !== 0);
  }

  async function handleSubmit() {
    if (!checked || !nomComplet.trim() || isCanvasEmpty()) return;
    setSubmitting(true);
    setSubmitError(null);
    const signatureBase64 = canvasRef.current!.toDataURL("image/png");
    try {
      const res = await fetch("/api/contrat/signer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ compte, selectedPlan, nomComplet: nomComplet.trim(), signatureBase64, artisanId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      router.push("/onboarding/confirmation");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erreur inconnue");
      setSubmitting(false);
    }
  }

  const isValid = checked && nomComplet.trim().length > 2;

  const contractText = `PARAGON INTELLIGENCE LLC — société de droit de l'État du Wyoming (États-Unis), siège social 30 N Gould St, STE R, Sheridan, WY 82801 (USA), EIN 41-3424515, exploitant la marque Paragon IA (le « Prestataire »).

Entre les soussignées

Le Prestataire — Paragon Intelligence LLC, identifiée en en-tête ci-dessus.

Le Client — Société : ${compte.nomEntreprise || "[à compléter]"} · Dirigeant : ${compte.prenom} ${compte.nom} · Email : ${compte.email} · Téléphone : ${compte.telephone || "[à compléter]"}, agissant en qualité de représentant de la société et dans le cadre de son activité professionnelle.

Ci-après désignées ensemble les « Parties » et individuellement une « Partie ».

Préambule

Le Prestataire exploite une plateforme logicielle (SaaS) assistée par intelligence artificielle, spécialisée dans la génération et la fourniture de prospects qualifiés — propriétaires de maison ciblés et ayant déclaré un intérêt pour des travaux ou services — destinés aux entreprises souhaitant développer leur activité.

Article 1 — Définition du Prospect qualifié

On entend par « Prospect qualifié » la mise à disposition du Client, via la plateforme, de la donnée d'un propriétaire de maison réunissant : prénom et nom valides, adresse email valide, numéro de téléphone valide, statut de propriétaire de maison, situation dans la zone géographique définie par le Client, intérêt déclaré pour des travaux correspondant à l'activité du Client.

Article 2 — Exclusivité de fourniture

Chaque Prospect qualifié est revendu exclusivement au Client dans sa zone géographique. Le Prestataire ne le revend, ne le cède ni ne le propose à aucun autre client ni concurrent dans cette même zone.

Article 3 — Nature de l'engagement et absence de garantie de résultat

Le Prestataire est tenu d'une obligation de livraison des Prospects qualifiés, à l'exclusion de toute obligation de résultat commercial. Il ne garantit ni vente, ni signature, ni chiffre d'affaires. La concrétisation commerciale relève de la seule responsabilité du Client.

Article 4 — Volume engagé et tarification

Volume engagé : ${plan.volume} Prospects qualifiés · Prix unitaire : ${plan.prixUnitaire} € par Prospect · Montant total : ${plan.total.toLocaleString("fr-FR")} € TTC. Le montant total n'est pas réglé d'avance ; le Client est prélevé au fur et à mesure des livraisons.

Article 6 — Délais de livraison

Les Prospects qualifiés sont livrés dans un délai maximal de sept (7) jours à compter de la mise en place.

Article 7 — Garantie de remplacement (recours unique)

Tout Prospect qualifié auquel manque objectivement l'un des éléments requis fait l'objet d'un remplacement gratuit, sous réserve du respect des conditions cumulatives (appel le jour même, compte rendu renseigné, signalement sous 24h). Le remplacement constitue le recours unique du Client ; aucun remboursement n'est dû.

Article 8 — Rôle et obligations du Client

Le Client s'engage à appeler chaque Prospect le jour même de sa réception, assurer seul le rappel et le closing, renseigner le compte rendu de chaque Prospect, s'abstenir de revendre les Prospects à des tiers, et maintenir un moyen de paiement valide.

Article 13 — Acceptation et signature électronique

Le présent contrat est conclu et signé par voie électronique. Conformément aux articles 1366 et 1367 du Code civil, cette signature électronique a la même valeur juridique qu'une signature manuscrite.`;

  return (
    <>
    {/* ── Modale contrat complet ─────────────────────────────────────────── */}
    {showContrat && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(11,19,32,0.55)", backdropFilter: "blur(4px)" }}
        onClick={() => setShowContrat(false)}
      >
        <div
          className="relative w-full flex flex-col"
          style={{
            maxWidth: 740,
            maxHeight: "90vh",
            background: "#fff",
            borderRadius: 22,
            boxShadow: "0 24px 60px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div
            className="flex items-center gap-3 px-6 py-4 shrink-0"
            style={{ borderBottom: "1px solid #F0F2F5" }}
          >
            <div
              className="flex items-center justify-center shrink-0"
              style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #0B1320, #1A2238)", color: "#C2984C" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 15, fontWeight: 800, color: "#0B1320", letterSpacing: "-0.2px" }}>Contrat d'activation — Paragon IA</p>
              <p style={{ fontSize: 11.5, color: "#6B7280", marginTop: 2 }}>Document complet · {compte.prenom} {compte.nom}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowContrat(false)}
              style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "#F3F4F6", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#6B7280",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Modal body — scrollable */}
          <div
            className="flex-1 overflow-y-auto px-6 py-5"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#E8EAEE transparent" }}
          >
            <div
              className="whitespace-pre-line"
              style={{ fontSize: 13, color: "#374151", lineHeight: 1.75 }}
            >
              {contractText}
            </div>
          </div>

          {/* Modal footer */}
          <div
            className="px-6 py-4 shrink-0 flex items-center justify-between gap-4 flex-wrap"
            style={{ borderTop: "1px solid #F0F2F5", background: "#FAFAFA" }}
          >
            <p style={{ fontSize: 11.5, color: "#6B7280" }}>
              Signature horodatée · valeur légale (art. 1366-1367 Code civil)
            </p>
            <button
              type="button"
              onClick={() => setShowContrat(false)}
              style={{
                background: "linear-gradient(135deg, #0B1320, #1A2238)",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                padding: "10px 20px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="flex flex-col items-center w-full px-5 pb-16">
      {/* Intro */}
      <div className="text-center mb-8 max-w-[720px]">
        <div
          className="inline-flex items-center gap-2 rounded-full mb-[18px] text-[11px] font-bold uppercase"
          style={{
            background: "#fff",
            border: "1px solid rgba(194,152,76,0.25)",
            padding: "8px 16px",
            color: "#0B1320",
            letterSpacing: "2px",
            boxShadow: "0 1px 3px rgba(194,152,76,0.15)",
          }}
        >
          <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#C2984C" }} />
          Dernière étape
        </div>
        <h1
          className="font-bold leading-[1.15] mb-3.5"
          style={{ fontSize: "clamp(28px,3.6vw,40px)", letterSpacing: "-1.1px", color: "#0B1320" }}
        >
          {compte.prenom ? <>{compte.prenom}, signez votre{" "}</> : <>Signez votre{" "}</>}
          <span
            style={{
              backgroundImage: "linear-gradient(transparent calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 1px), transparent calc(100% - 1px))",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              paddingBottom: "2px",
            }}
          >
            contrat d'activation
          </span>
          .
        </h1>
        <p className="text-[15.5px] leading-relaxed max-w-[560px] mx-auto" style={{ color: "#4A5468" }}>
          Plus qu'une signature pour démarrer la livraison de vos{" "}
          <strong style={{ color: "#0B1320" }}>demandes de rendez-vous qualifiés</strong>. Lisez votre contrat, signez, et vos premières demandes arrivent.
        </p>
      </div>

      {/* 3 how-it-works cards */}
      <div
        className="w-full grid mb-8"
        style={{ maxWidth: 880, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}
      >
        {HOW_CARDS.map((c) => (
          <div
            key={c.num}
            style={{
              background: "#fff",
              border: "1px solid #E8EAEE",
              borderRadius: 16,
              padding: "22px 20px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="inline-flex items-center justify-center mb-3"
              style={{ width: 38, height: 38, borderRadius: 11, background: "#FAEDD6", color: "#A8852D" }}
            >
              {c.icon}
            </div>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#A8852D", letterSpacing: "1.4px", marginBottom: 3 }}>{c.num}</p>
            <p style={{ fontSize: 14.5, fontWeight: 800, color: "#0B1320", marginBottom: 5, letterSpacing: "-0.2px" }}>{c.title}</p>
            <p style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.55 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Contract card */}
      <div
        className="w-full p-4 sm:px-[26px] sm:py-[22px]"
        style={{
          maxWidth: 880,
          background: "#fff",
          border: "1px solid #E8EAEE",
          borderRadius: 22,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06), 0 4px 18px rgba(194,152,76,0.08)",
        }}
      >
        {/* Contract header */}
        <div className="flex items-center gap-3.5 flex-wrap pb-4 mb-4" style={{ borderBottom: "1px solid #F0F2F5" }}>
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 40, height: 40, borderRadius: 11,
              background: "linear-gradient(135deg, #0B1320, #1A2238)",
              color: "#C2984C",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 16, fontWeight: 800, color: "#0B1320", letterSpacing: "-0.2px" }}>Contrat d'activation</p>
            <p style={{ fontSize: 12.5, color: "#6B7280", marginTop: 3 }}>
              Paiement à l'usage · {plan.prixUnitaire} € TTC par demande livrée
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowContrat(true)}
            className="inline-flex items-center gap-[6px] shrink-0"
            style={{
              background: "#FAEDD6",
              border: "1px solid rgba(194,152,76,0.28)",
              borderRadius: 50,
              padding: "8px 14px",
              fontSize: 12.5,
              fontWeight: 700,
              color: "#A8852D",
              cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            Lire le contrat
          </button>
        </div>

        {/* Contract scroll */}
        <div
          style={{
            maxHeight: 280,
            overflowY: "auto",
            padding: "6px 12px 6px 4px",
            fontSize: 12,
            color: "#4A5468",
            lineHeight: 1.6,
            scrollbarWidth: "thin",
            scrollbarColor: "#E8EAEE transparent",
          }}
        >
          <style>{`.contract-scroll::-webkit-scrollbar{width:4px}.contract-scroll::-webkit-scrollbar-track{background:transparent}.contract-scroll::-webkit-scrollbar-thumb{background:#E8EAEE;border-radius:2px}`}</style>
          <div className="contract-scroll whitespace-pre-line">{contractText}</div>
        </div>

        {/* Pack souscrit */}
        <div
          style={{
            marginTop: 18, paddingTop: 18,
            borderTop: "1px solid rgba(194,152,76,0.16)",
          }}
        >
          <p style={{ fontSize: 10.5, fontWeight: 800, color: "#A8852D", letterSpacing: "1.6px", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C2984C", display: "inline-block" }} />
            Votre pack souscrit
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4" style={{ borderBottom: "1px solid rgba(194,152,76,0.16)" }}>
            <div>
              <p style={{ fontSize: "clamp(16px,2.2vw,22px)", fontWeight: 900, color: "#0B1320", letterSpacing: "-0.6px", lineHeight: 1.1 }}>
                {plan.label} — {plan.volume} demandes qualifiées
              </p>
              <p style={{ fontSize: 12.5, color: "#6B7280", marginTop: 6, fontWeight: 600 }}>
                {plan.prixUnitaire} € TTC / demande livrée · zone exclusive
              </p>
            </div>
            <div className="sm:text-right">
              <p style={{ fontSize: 10.5, color: "#6B7280", fontWeight: 800, letterSpacing: "1.4px", textTransform: "uppercase" }}>Total du pack</p>
              <p style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 900, color: "#A8852D", letterSpacing: "-0.8px", lineHeight: 1.1, marginTop: 4 }}>
                {plan.total.toLocaleString("fr-FR")} € TTC
              </p>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#4A5468", lineHeight: 1.55, marginTop: 14 }}>
            Vous ne payez <strong style={{ color: "#A8852D" }}>rien d'avance</strong>. Le total est prélevé au fur et à mesure que chaque demande de rendez-vous qualifié est livrée dans votre plateforme.
          </p>
        </div>
      </div>

      {/* Acceptance checkbox */}
      <div
        className="w-full mt-[18px]"
        style={{
          maxWidth: 880,
          background: "#fff",
          border: "1.5px solid #E8EAEE",
          borderRadius: 14,
          padding: 18,
        }}
      >
        <label className="flex items-start gap-[10px] cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ width: 18, height: 18, marginTop: 2, cursor: "pointer", accentColor: "#16A34A", flexShrink: 0 }}
          />
          <span style={{ fontSize: 13, color: "#0B1320", lineHeight: 1.55 }}>
            J'ai lu et j'accepte le <strong>contrat de prestation</strong> et les{" "}
            <a href="https://paragon-ia.com/cgv" target="_blank" rel="noopener" style={{ color: "#0B1320", fontWeight: 700 }}>CGV</a>{" "}
            de Paragon IA. Je commande un pack de{" "}
            <strong>{plan.volume} demandes de rendez-vous qualifiés</strong>{" "}
            (total <strong>{plan.total.toLocaleString("fr-FR")} €</strong> prélevé au fur et à mesure,{" "}
            <strong>{plan.prixUnitaire} € par demande livrée</strong>). Je m'engage à payer la totalité et je reconnais qu'il{" "}
            <strong>n'y a pas de garantie de résultat commercial</strong>.
          </span>
        </label>
      </div>

      {/* Signature section */}
      <div className="w-full mt-3.5" style={{ maxWidth: 880 }}>
        {/* Nom complet */}
        <div className="mb-4">
          <label style={labelStyle}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Votre nom complet
          </label>
          <input
            type="text"
            value={nomComplet}
            onChange={(e) => setNomComplet(e.target.value)}
            placeholder="Patrick Martin"
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = "#C2984C"; e.target.style.boxShadow = "0 0 0 3px rgba(194,152,76,0.15)"; }}
            onBlur={(e) => { e.target.style.borderColor = "#E8EAEE"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Canvas */}
        <div className="flex items-center justify-between mb-2">
          <label style={{ ...labelStyle, marginBottom: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Dessinez votre signature
          </label>
          <button
            type="button"
            onClick={clearCanvas}
            className="inline-flex items-center gap-1"
            style={{ background: "none", border: "none", color: "#6B7280", fontSize: 12, cursor: "pointer" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Effacer
          </button>
        </div>
        <canvas
          ref={canvasRef}
          width={900}
          height={170}
          className="w-full touch-none cursor-crosshair"
          style={{ background: "#fff", border: "1.5px dashed #E8EAEE", borderRadius: 12, display: "block" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        <p style={{ fontSize: 11.5, color: "#6B7280", marginTop: 7 }}>Signez avec la souris ou le doigt dans le cadre.</p>

        {/* Error */}
        {submitError && (
          <p className="text-center mt-3" style={{ fontSize: 13, color: "#DC2626" }}>{submitError}</p>
        )}

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className="w-full flex items-center justify-center gap-[10px] transition-all duration-[180ms]"
          style={{
            marginTop: 22,
            padding: "18px 28px",
            borderRadius: 50,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "-0.2px",
            border: "none",
            cursor: isValid && !submitting ? "pointer" : "not-allowed",
            background: "linear-gradient(180deg, #16A34A 0%, #15803D 100%)",
            color: "#fff",
            opacity: isValid && !submitting ? 1 : 0.45,
            boxShadow: isValid && !submitting
              ? "0 12px 28px rgba(22,163,74,0.34), 0 4px 8px rgba(22,163,74,0.18), inset 0 1px 0 rgba(255,255,255,0.15)"
              : "none",
          }}
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signature en cours…
            </>
          ) : (
            <>
              <span>Signer mon engagement</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </>
          )}
        </button>

        <p className="text-center mt-3.5" style={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.55 }}>
          Signature horodatée · vaut signature électronique (art. 1366-1367 du Code civil). PDF du contrat signé disponible ensuite.
        </p>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => router.push("/")}
          style={{ background: "none", border: "none", fontSize: 12, color: "#9CA3AF", cursor: "pointer", textDecoration: "underline" }}
        >
          Me déconnecter
        </button>
      </div>
    </div>
    </>
  );
}
