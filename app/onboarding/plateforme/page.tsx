import Link from "next/link";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import ProgressBar from "@/components/onboarding/ProgressBar";
import DashboardMockup from "@/components/onboarding/plateforme/DashboardMockup";
import TestimonialCard from "@/components/onboarding/plateforme/TestimonialCard";
import PlatformeStatsBar from "@/components/onboarding/plateforme/PlatformeStatsBar";

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

export default function PlateformePage() {
  return (
    <div className="flex flex-col items-center w-full px-5 pb-16">
      <OnboardingHeader backHref="/onboarding/ciblage" />
      <ProgressBar step={2} stepName="Votre plateforme" />

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
          Votre future plateforme
        </div>
        <h1
          className="font-bold leading-[1.15] mb-3.5"
          style={{ fontSize: "clamp(28px,3.6vw,40px)", letterSpacing: "-1.1px", color: "#0B1320" }}
        >
          Des{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(transparent calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 1px), transparent calc(100% - 1px))",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              paddingBottom: "2px",
            }}
          >
            demandes de rendez-vous qualifiés
          </span>
          , prêtes à être traitées.
        </h1>
        <p className="text-[15.5px] leading-relaxed max-w-[560px] mx-auto" style={{ color: "#4A5468" }}>
          Chaque demande arrive avec le <strong style={{ color: "#0B1320" }}>nom du prospect</strong>, son{" "}
          <strong style={{ color: "#0B1320" }}>email</strong>, son{" "}
          <strong style={{ color: "#0B1320" }}>adresse</strong> et son{" "}
          <strong style={{ color: "#0B1320" }}>projet</strong>. Vous appelez, vous chiffrez, vous closez.
        </p>
      </div>

      {/* CRM mockup — wider */}
      <div className="w-full max-w-[920px]">
        <DashboardMockup />
      </div>

      {/* CTA */}
      <div className="w-full max-w-[600px] flex flex-col items-center">
        <Link href="/onboarding/volume" style={ctaStyle}>
          <span>Oui, je veux développer mon activité</span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
        <p className="mt-3.5 text-center text-[12.5px]" style={{ color: "#6B7280" }}>
          <strong style={{ color: "#0B1320" }}>0 € aujourd'hui.</strong>{" "}
          Vous payez uniquement quand une demande qualifiée vous est livrée.
        </p>
      </div>

      {/* Témoignages + stats */}
      <div className="w-full max-w-[920px] mt-10 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TestimonialCard
            name="Olivier Chevalier"
            company="Menuiserie Chevalier · Lyon (69)"
            badge="+15 chantiers / 2 sem"
          >
            Avec <strong>Paragon IA</strong>, j'ai signé{" "}
            <strong>15 chantiers en 2 semaines</strong>. Pergolas à 8-12 k€ chacune. Mes commerciaux n'ont jamais autant closé.
          </TestimonialCard>

          <TestimonialCard
            name="Thomas Roussel"
            company="Solar Énergie Pro · Bordeaux (33)"
            badge="+22 installs / mois"
          >
            En 1 mois avec <strong>Paragon IA</strong>, j'ai installé{" "}
            <strong>22 systèmes photovoltaïques</strong>. Mon meilleur trimestre depuis 5 ans, sans budget pub.
          </TestimonialCard>

          <TestimonialCard
            name="Caroline Vasseur"
            company="Vasseur Climat · Nantes (44)"
            badge="+18 PAC / 3 sem"
          >
            <strong>Paragon IA</strong> m'a permis de signer{" "}
            <strong>18 pompes à chaleur en 3 semaines</strong>. ROI immédiat, plus jamais sans.
          </TestimonialCard>
        </div>

        <PlatformeStatsBar />
      </div>
    </div>
  );
}
