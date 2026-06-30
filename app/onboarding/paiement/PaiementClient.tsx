"use client";

import WhopEmbed from "@/components/onboarding/paiement/WhopEmbed";
import { useOnboardingStore } from "@/lib/store/onboarding";

const TRUST_ITEMS = [
  {
    label: "SSL 256 bits",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    label: "PCI-DSS niveau 1",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"/>
      </svg>
    ),
  },
  {
    label: "Sécurisé par Whop",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
];

const REASSURANCE = [
  {
    title: "0 € aujourd'hui",
    desc: "Prélevé uniquement par demande livrée.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    title: "Sécurisé par Whop",
    desc: "Whop chiffre votre carte. Jamais stockée chez Paragon.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    title: "Remplacement gratuit",
    desc: "Non conforme = remplacée sans frais.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.4 0 4.58.94 6.19 2.48"/>
      </svg>
    ),
  },
];

interface PaiementClientProps {
  planIds: { starter?: string; booster?: string; croissance?: string };
}

export default function PaiementClient({ planIds }: PaiementClientProps) {
  const { compte, selectedPlan } = useOnboardingStore();
  const planId = planIds[selectedPlan as keyof typeof planIds] ?? planIds.starter;

  return (
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
          Étape finale · Inscription
        </div>
        <h1
          className="font-bold leading-[1.15] mb-3.5"
          style={{ fontSize: "clamp(28px,3.6vw,40px)", letterSpacing: "-1.1px", color: "#0B1320" }}
        >
          Validez votre{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(transparent calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 1px), transparent calc(100% - 1px))",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              paddingBottom: "2px",
            }}
          >
            inscription
          </span>
          .
        </h1>
        <p className="text-[15.5px] leading-relaxed max-w-[560px] mx-auto" style={{ color: "#4A5468" }}>
          <strong style={{ color: "#0B1320" }}>0 € aujourd'hui.</strong> Recevez vos{" "}
          <strong style={{ color: "#0B1320" }}>demandes de rendez-vous qualifiés</strong>{" "}
          directement dans votre plateforme.
        </p>
      </div>

      {/* Main card */}
      <div
        className="w-full max-w-[700px]"
        style={{
          background: "#fff",
          border: "1px solid #E8EAEE",
          borderRadius: 22,
          padding: "28px 30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06), 0 4px 18px rgba(194,152,76,0.08)",
        }}
      >
        {/* Security trust strip */}
        <div
          className="flex items-center justify-center flex-wrap mb-[18px]"
          style={{
            background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
            border: "1px solid #E2E8F0",
            borderRadius: 12,
            padding: "12px 18px",
            fontSize: 11.5,
            color: "#334155",
            fontWeight: 600,
            gap: 0,
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <span key={item.label} className="inline-flex items-center">
              {i > 0 && <span style={{ width: 1, height: 14, background: "#CBD5E1", display: "inline-block", margin: "0 0" }} />}
              <span className="inline-flex items-center gap-[6px]" style={{ padding: "0 16px" }}>
                {item.icon}
                <strong>{item.label}</strong>
              </span>
            </span>
          ))}
        </div>

        {/* Why now box */}
        <div
          className="flex gap-3 items-start mb-[22px]"
          style={{
            background: "#FDFAF2",
            border: "1px solid rgba(194,152,76,0.18)",
            borderRadius: 14,
            padding: "16px 18px",
            fontSize: 13,
            color: "#4A5468",
            lineHeight: 1.55,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8852D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
          </svg>
          <span>
            <strong style={{ color: "#0B1320" }}>Pourquoi votre carte maintenant ?</strong>{" "}
            Pour prélever automatiquement chaque demande de rendez-vous qualifiée livrée, sans rien ressaisir.{" "}
            <strong style={{ color: "#0B1320" }}>0 € de débit aujourd'hui</strong>, on enregistre juste votre carte.
          </span>
        </div>

        {/* Whop checkout */}
        <div
          className="mb-[22px] relative"
          style={{
            background: "#fff",
            border: "1.5px solid #E8EAEE",
            borderRadius: 18,
            padding: 4,
            minHeight: 480,
            overflow: "hidden",
          }}
        >
          {!planId ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
              style={{ background: "#FEF2F2", borderRadius: 16 }}
            >
              <p style={{ fontSize: 14, fontWeight: 700, color: "#DC2626" }}>Configuration manquante</p>
              <p style={{ fontSize: 12, color: "#F87171", marginTop: 4 }}>
                Les identifiants Whop ne sont pas configurés. Contactez le support Paragon IA.
              </p>
            </div>
          ) : (
            <WhopEmbed planId={planId} email={compte.email} />
          )}
        </div>

        {/* 3 reassurance cards */}
        <div className="grid grid-cols-3 gap-[10px]">
          {REASSURANCE.map((r) => (
            <div
              key={r.title}
              style={{
                background: "#FDFAF2",
                border: "1px solid rgba(194,152,76,0.18)",
                borderRadius: 14,
                padding: "16px",
              }}
            >
              <div
                className="flex items-center justify-center mb-3"
                style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: "#FAEDD6",
                  color: "#A8852D",
                }}
              >
                {r.icon}
              </div>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#0B1320", letterSpacing: "-0.1px", marginBottom: 4 }}>{r.title}</p>
              <p style={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.4 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
