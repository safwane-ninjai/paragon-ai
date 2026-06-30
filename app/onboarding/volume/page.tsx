"use client";

import Link from "next/link";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import ProgressBar from "@/components/onboarding/ProgressBar";
import PlanCard from "@/components/onboarding/volume/PlanCard";
import { useOnboardingStore } from "@/lib/store/onboarding";

const PLANS = [
  {
    id: "starter" as const,
    name: "Starter",
    subtitle: "20 demandes de rendez-vous qualifiés / mois",
    price: 95,
    packPrice: "1 900",
    features: [
      { prefix: "Zone ", bold: "exclusive" },
      { prefix: "Demandes ", bold: "qualifiées", suffix: " · adresse vérifiée" },
      { prefix: "Non conforme = ", bold: "remplacée gratuitement" },
      { prefix: "Paiement à la livraison" },
    ],
  },
  {
    id: "booster" as const,
    name: "Booster",
    subtitle: "30 demandes de rendez-vous qualifiés / mois",
    price: 85,
    packPrice: "2 550",
    features: [
      { prefix: "Zone ", bold: "exclusive" },
      { prefix: "Demandes ", bold: "qualifiées", suffix: " · adresse vérifiée" },
      { prefix: "Non conforme = ", bold: "remplacée gratuitement" },
      { prefix: "Paiement à la livraison" },
    ],
  },
  {
    id: "croissance" as const,
    name: "Croissance",
    subtitle: "40 demandes de rendez-vous qualifiés / mois",
    price: 75,
    packPrice: "3 000",
    badge: "★ Recommandé · Meilleur tarif",
    features: [
      { prefix: "Zone ", bold: "exclusive" },
      { prefix: "Demandes ", bold: "qualifiées", suffix: " · adresse vérifiée" },
      { prefix: "Non conforme = ", bold: "remplacée gratuitement" },
      { prefix: "Économisez 20 € par demande", suffix: " vs Starter", gold: true },
    ],
  },
];

const PLAN_LABELS: Record<string, string> = {
  starter: "Starter",
  booster: "Booster",
  croissance: "Croissance",
};

const ctaStyle = {
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  background: "linear-gradient(180deg, #0B1320 0%, #060B1A 100%)",
  color: "#fff",
  padding: "18px 28px",
  borderRadius: 50,
  fontSize: 16,
  fontWeight: 700,
  letterSpacing: "-0.2px",
  boxShadow: "0 12px 28px rgba(11,19,32,0.30), 0 4px 8px rgba(11,19,32,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
  textDecoration: "none",
  marginTop: 22,
} as const;

export default function VolumePage() {
  const { selectedPlan, setSelectedPlan } = useOnboardingStore();

  return (
    <div className="flex flex-col items-center w-full px-5 pb-16">
      <OnboardingHeader backHref="/onboarding/plateforme" />
      <ProgressBar step={3} stepName="Volume" />

      {/* Intro */}
      <div className="text-center mb-9 max-w-[720px]">
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
          Sans engagement de durée
        </div>
        <h1
          className="font-bold leading-[1.15] mb-3.5"
          style={{ fontSize: "clamp(28px,3.6vw,40px)", letterSpacing: "-1.1px", color: "#0B1320" }}
        >
          Choisissez votre{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(transparent calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 1px), transparent calc(100% - 1px))",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              paddingBottom: "2px",
            }}
          >
            volume
          </span>
          .
        </h1>
        <p className="text-[15.5px] leading-relaxed max-w-[560px] mx-auto" style={{ color: "#4A5468" }}>
          Zone <strong style={{ color: "#0B1320" }}>exclusive</strong>, payée{" "}
          <strong style={{ color: "#0B1320" }}>par demande livrée</strong>. Non conforme ={" "}
          <strong style={{ color: "#0B1320" }}>remplacée gratuitement</strong>.
        </p>
      </div>

      {/* Plans grid */}
      <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-3 gap-[18px] mb-6">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            selected={selectedPlan === plan.id}
            onSelect={() => setSelectedPlan(plan.id)}
          />
        ))}
      </div>

      {/* Garantie */}
      <p className="text-center text-[13px] mb-2 max-w-[660px]" style={{ color: "#6B7280" }}>
        <span style={{ color: "#A8852D", fontWeight: 700 }}>✓ Garantie de remplacement</span>
        {" · "}Non conforme = <strong style={{ color: "#0B1320" }}>remplacée gratuitement</strong>. Vous ne payez que les demandes livrées.
      </p>

      {/* CTA */}
      <div className="w-full max-w-[600px]">
        <Link href="/onboarding/compte" style={ctaStyle}>
          <span>Continuer avec {PLAN_LABELS[selectedPlan]}</span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
