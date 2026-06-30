"use client";

import Image from "next/image";
import Link from "next/link";
import { useOnboardingStore } from "@/lib/store/onboarding";

const NEXT_STEPS = [
  {
    num: "01 · Maintenant",
    iconBg: "#DCFCE7",
    iconColor: "#15803D",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: "Email d'activation envoyé",
    desc: (email: string) => (
      <>
        Un email vient d'être envoyé à <strong style={{ color: "#0B1320" }}>{email || "votre adresse"}</strong>. Cliquez sur le lien pour accéder à votre plateforme. Le <strong style={{ color: "#0B1320" }}>contrat signé en PDF</strong> est joint.
      </>
    ),
  },
  {
    num: "02 · Dans l'heure",
    iconBg: "#FAEDD6",
    iconColor: "#A8852D",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
    title: "Votre agent dédié",
    desc: () => (
      <>
        Votre interlocutrice prend contact pour valider votre <strong style={{ color: "#0B1320" }}>ciblage exact</strong> et lancer la campagne sur votre zone.
      </>
    ),
  },
  {
    num: "03 · Sous 24-48h",
    iconBg: "#FAEDD6",
    iconColor: "#A8852D",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Premières demandes",
    desc: () => (
      <>
        Vos <strong style={{ color: "#0B1320" }}>premières demandes de rendez-vous qualifiés</strong> arrivent dans votre plateforme. Notifications email en temps réel.
      </>
    ),
  },
];

export default function ConfirmationPage() {
  const { compte } = useOnboardingStore();
  const prenom = compte.prenom || "cher artisan";
  const email = compte.email || "";

  return (
    <>
      <style>{`
        @keyframes success-pop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes agent-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(22,163,74,0.18); }
          50% { box-shadow: 0 0 0 7px rgba(22,163,74,0.04); }
        }
        .success-pop { animation: success-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .agent-pulse { animation: agent-pulse 1.6s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-col items-center w-full px-5 pb-16" style={{ background: "linear-gradient(135deg, #fdfaf2 0%, #ffffff 100%)", minHeight: "100vh" }}>

        {/* Logo only (no back button on confirmation) */}
        <header className="w-full max-w-[600px] mx-auto flex items-center justify-center pt-8 pb-6">
          <Image src="/logo-paragon.png" alt="Paragon IA" width={140} height={36} priority className="h-8 w-auto object-contain" />
        </header>

        {/* Progress — 100% green */}
        <div className="w-full max-w-[600px] mx-auto flex flex-col items-center mb-10">
          <div className="w-full h-1 rounded-full overflow-hidden mb-2.5" style={{ background: "rgba(22,163,74,0.12)" }}>
            <div className="h-full w-full rounded-full" style={{ background: "linear-gradient(90deg, #16A34A 0%, #22C55E 100%)", boxShadow: "0 0 10px rgba(22,163,74,0.4)" }} />
          </div>
          <div className="inline-flex items-center gap-2 text-[11px] font-extrabold" style={{ color: "#15803D", letterSpacing: "1px", textTransform: "uppercase" }}>
            ✓ Activation confirmée · Tout est validé
          </div>
        </div>

        {/* Success hero */}
        <div className="text-center mb-10 max-w-[720px]">
          {/* Green check icon */}
          <div
            className="success-pop flex items-center justify-center mx-auto mb-[26px]"
            style={{
              width: 84, height: 84,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
              boxShadow: "0 14px 36px rgba(22,163,74,0.28), 0 0 0 8px rgba(22,163,74,0.06)",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-[7px] mb-[18px] text-[11px] font-extrabold uppercase"
            style={{
              background: "#DCFCE7",
              border: "1px solid rgba(22,163,74,0.18)",
              borderRadius: 50,
              padding: "6px 14px",
              color: "#15803D",
              letterSpacing: "1.4px",
            }}
          >
            <span className="w-[6px] h-[6px] rounded-full" style={{ background: "#16A34A" }} />
            Intégration validée
          </div>

          <h1
            className="font-bold leading-[1.15] mb-4"
            style={{ fontSize: "clamp(28px,3.6vw,40px)", letterSpacing: "-1.1px", color: "#0B1320" }}
          >
            Bienvenue chez Paragon,{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(transparent calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 1px), transparent calc(100% - 1px))",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                paddingBottom: "2px",
              }}
            >
              {prenom}&nbsp;!
            </span>
          </h1>
          <p className="text-[15.5px] leading-relaxed max-w-[560px] mx-auto" style={{ color: "#4A5468" }}>
            Votre intégration est <strong style={{ color: "#0B1320" }}>validée</strong>. L'activation est lancée. Vous recevrez vos <strong style={{ color: "#0B1320" }}>premières demandes de rendez-vous qualifiés</strong> dans les <strong style={{ color: "#0B1320" }}>24 à 48 heures</strong>.
          </p>
        </div>

        {/* 3 next steps */}
        <div
          className="w-full grid mb-9"
          style={{ maxWidth: 920, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}
        >
          {NEXT_STEPS.map((step) => (
            <div
              key={step.num}
              style={{
                background: "#fff",
                border: "1px solid #E8EAEE",
                borderRadius: 18,
                padding: "24px 22px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="inline-flex items-center justify-center mb-3"
                style={{ width: 38, height: 38, borderRadius: 11, background: step.iconBg, color: step.iconColor }}
              >
                {step.icon}
              </div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#A8852D", letterSpacing: "1.4px", marginBottom: 4 }}>{step.num}</p>
              <p style={{ fontSize: 14.5, fontWeight: 800, color: "#0B1320", marginBottom: 5, letterSpacing: "-0.2px" }}>{step.title}</p>
              <p style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.55 }}>{step.desc(email)}</p>
            </div>
          ))}
        </div>

        {/* Agent card */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            maxWidth: 720,
            background: "linear-gradient(180deg, #FFFCF6 0%, #fff 100%)",
            border: "1px solid rgba(194,152,76,0.28)",
            borderRadius: 24,
            padding: "32px",
            display: "grid",
            gridTemplateColumns: "140px 1fr",
            gap: 28,
            alignItems: "center",
            boxShadow: "0 12px 36px rgba(194,152,76,0.10), 0 4px 16px rgba(11,19,32,0.04)",
          }}
        >
          {/* Gold top bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #C2984C 0%, #D9B770 50%, #C2984C 100%)" }} />

          {/* Agent photo */}
          <div
            className="relative"
            style={{
              width: 140, height: 140,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #fff",
              boxShadow: "0 10px 28px rgba(11,19,32,0.15), 0 2px 8px rgba(11,19,32,0.06)",
              flexShrink: 0,
            }}
          >
            {/* Fallback initials */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0B1320 0%, #2A3656 50%, #A8852D 100%)",
                color: "#fff",
                fontSize: 44,
                fontWeight: 900,
                letterSpacing: "-1.5px",
              }}
            >
              MC
            </div>
            {/* Online status dot */}
            <div
              className="absolute"
              style={{
                bottom: 8, right: 8,
                width: 22, height: 22,
                background: "#22C55E",
                borderRadius: "50%",
                border: "4px solid #fff",
                boxShadow: "0 2px 6px rgba(34,197,94,0.4)",
              }}
            />
          </div>

          {/* Agent info */}
          <div>
            <div
              className="inline-flex items-center gap-2 mb-2"
              style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "1.4px", textTransform: "uppercase", color: "#15803D" }}
            >
              <span
                className="agent-pulse"
                style={{ width: 7, height: 7, background: "#16A34A", borderRadius: "50%", display: "inline-block" }}
              />
              Votre agent dédié · En ligne
            </div>
            <p style={{ fontSize: 26, fontWeight: 900, color: "#0B1320", letterSpacing: "-0.7px", lineHeight: 1.15, marginBottom: 3 }}>Marie Claire</p>
            <p style={{ fontSize: 12.5, color: "#6B7280", fontWeight: 600, marginBottom: 14 }}>Customer Success Manager · Paragon IA</p>
            <p
              style={{
                fontSize: 14,
                color: "#4A5468",
                lineHeight: 1.6,
                paddingLeft: 14,
                borderLeft: "3px solid #C2984C",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              "Bonjour <strong style={{ color: "#0B1320", fontStyle: "normal", fontWeight: 700 }}>{prenom}</strong>, bienvenue chez Paragon. Je m'occupe personnellement de votre activation. <strong style={{ color: "#0B1320", fontStyle: "normal", fontWeight: 700 }}>Vous serez contacté(e) dans l'heure.</strong>"
            </p>
          </div>
        </div>

        {/* Reassurance note */}
        <p className="text-center mt-8 max-w-[600px]" style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.65 }}>
          Pas reçu l'email ? Vérifiez vos spams ou contactez-nous à{" "}
          <a href="mailto:serviceclient@paragon-ia.com" style={{ color: "#0B1320", fontWeight: 600 }}>
            serviceclient@paragon-ia.com
          </a>. Toute question urgente, Marie Claire répond directement sur la plateforme.
        </p>

        {/* Footer */}
        <footer className="w-full max-w-[600px] mx-auto text-center mt-16 pt-7" style={{ borderTop: "1px solid #F0F2F5" }}>
          <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1 mb-3" style={{ fontSize: 12.5 }}>
            <Link href="https://paragon-ia.com/mentions-legales" target="_blank" rel="noopener" style={{ color: "#6B7280", fontWeight: 600 }}>Mentions Légales</Link>
            <span style={{ color: "#9CA3AF" }}>·</span>
            <Link href="https://paragon-ia.com/politique-de-confidentialite" target="_blank" rel="noopener" style={{ color: "#6B7280", fontWeight: 600 }}>Politique de Confidentialité</Link>
            <span style={{ color: "#9CA3AF" }}>·</span>
            <Link href="https://paragon-ia.com/cgv" target="_blank" rel="noopener" style={{ color: "#6B7280", fontWeight: 600 }}>CGV</Link>
          </div>
          <p style={{ fontSize: 11.5, color: "#9CA3AF", marginBottom: 14 }}>© 2026 Paragon IA · Tous droits réservés.</p>
        </footer>
      </div>
    </>
  );
}
