"use client";

import Link from "next/link";
import { useOnboardingStore } from "@/lib/store/onboarding";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import ProgressBar from "@/components/onboarding/ProgressBar";
import ZoneWidget from "@/components/onboarding/ZoneWidget";
import LocalisationForm from "@/components/onboarding/ciblage/LocalisationForm";
import ProspectTypeSelector from "@/components/onboarding/ciblage/ProspectTypeSelector";
import ChantierTypeSelector from "@/components/onboarding/ciblage/ChantierTypeSelector";

const ctaBase = {
  width: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "18px 28px",
  borderRadius: "50px",
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "-0.2px",
  marginTop: "22px",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  transition: "all 0.18s",
} as const;

export default function CiblagePage() {
  const { ciblage } = useOnboardingStore();

  const isValid =
    ciblage.ville.trim() !== "" &&
    ciblage.typeProspect !== null &&
    ciblage.typesChantier.length > 0;

  return (
    <div className="flex flex-col items-center w-full px-5 pb-16">
      <OnboardingHeader />
      <ProgressBar step={1} stepName="Ciblage" />

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
          Votre cible
        </div>
        <h1
          className="font-bold leading-[1.15] mb-3.5"
          style={{ fontSize: "clamp(28px,3.6vw,40px)", letterSpacing: "-1.1px", color: "#0B1320" }}
        >
          Ciblez votre{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(transparent calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 1px), transparent calc(100% - 1px))",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              paddingBottom: "2px",
            }}
          >
            zone
          </span>
          {" "}et vos prospects.
        </h1>
        <p className="text-[15.5px] leading-relaxed max-w-[560px] mx-auto" style={{ color: "#4A5468" }}>
          Plus votre ciblage est précis, plus vos{" "}
          <strong style={{ color: "#0B1320" }}>demandes de rendez-vous qualifiés</strong>{" "}
          seront pertinentes.
        </p>
      </div>

      {/* Zone preview */}
      <div className="w-full max-w-[560px]">
        <ZoneWidget rayon={ciblage.rayon} />
      </div>

      {/* Form card */}
      <div
        className="w-full max-w-[600px] rounded-[22px] p-5 sm:p-8"
        style={{
          background: "#fff",
          border: "1px solid #E8EAEE",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06), 0 4px 18px rgba(194,152,76,0.08)",
        }}
      >
        <LocalisationForm />
        <ProspectTypeSelector />
        <ChantierTypeSelector />
      </div>

      {/* CTA */}
      <div className="w-full max-w-[600px]">
        {isValid ? (
          <Link
            href="/onboarding/plateforme"
            style={{
              ...ctaBase,
              background: "linear-gradient(180deg, #0B1320 0%, #060B1A 100%)",
              color: "#fff",
              boxShadow: "0 12px 28px rgba(11,19,32,0.30), 0 4px 8px rgba(11,19,32,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <span>Continuer</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        ) : (
          <button
            type="button"
            disabled
            style={{ ...ctaBase, background: "linear-gradient(180deg, #0B1320 0%, #060B1A 100%)", color: "#fff", opacity: 0.45, cursor: "not-allowed" }}
          >
            <span>Continuer</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
