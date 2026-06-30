"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import ProgressBar from "@/components/onboarding/ProgressBar";
import { useOnboardingStore } from "@/lib/store/onboarding";

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
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#0B1320",
  marginBottom: "8px",
  letterSpacing: "-0.1px",
} as const;

const TRUST_ITEMS = [
  {
    label: "Plateforme dédiée",
    sub: "Suivi en temps réel",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    label: "Email & plateforme",
    sub: "Notif chaque demande",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
  {
    label: "Agent dédié",
    sub: "Contact sous 1h",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

export default function ComptePage() {
  const router = useRouter();
  const { compte, setCompte, selectedPlan, ciblage, setArtisanId } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);

  const isValid =
    compte.nomEntreprise.trim() !== "" &&
    compte.prenom.trim() !== "" &&
    compte.nom.trim() !== "" &&
    compte.email.trim() !== "" &&
    compte.telephone.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/compte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ compte, selectedPlan, ciblage }),
      });
      const data = await res.json();
      if (data.artisanId) setArtisanId(data.artisanId);
    } catch {
      // on continue même si Airtable échoue
    } finally {
      setIsLoading(false);
    }
    router.push("/onboarding/paiement");
  }

  return (
    <div className="flex flex-col items-center w-full px-5 pb-16">
      <OnboardingHeader backHref="/onboarding/volume" />
      <ProgressBar step={4} stepName="Compte" />

      {/* Intro */}
      <div className="text-center mb-6 max-w-[720px]">
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
          Dernière ligne droite · 30 secondes
        </div>
        <h1
          className="font-bold leading-[1.15] mb-3.5"
          style={{ fontSize: "clamp(28px,3.6vw,40px)", letterSpacing: "-1.1px", color: "#0B1320" }}
        >
          Activez votre{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(transparent calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 1px), transparent calc(100% - 1px))",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              paddingBottom: "2px",
            }}
          >
            compte
          </span>
          .
        </h1>
        <p className="text-[15.5px] leading-relaxed max-w-[560px] mx-auto" style={{ color: "#4A5468" }}>
          Vos identifiants pour recevoir vos <strong style={{ color: "#0B1320" }}>demandes de rendez-vous qualifiés</strong>. Plateforme dédiée, notifications email.
        </p>
      </div>

      {/* Trust bar */}
      <div
        className="w-full max-w-[560px] flex items-center mb-4"
        style={{
          background: "#fff",
          border: "1px solid #E8EAEE",
          borderRadius: 16,
          padding: "14px 20px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
        }}
      >
        {TRUST_ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center" style={{ flex: 1 }}>
            {i > 0 && <div style={{ width: 1, height: 28, background: "#E8EAEE", flexShrink: 0, marginRight: 16 }} />}
            <div className="flex items-center gap-[10px]" style={{ padding: "0 4px" }}>
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 32, height: 32, borderRadius: 9, background: "#FAEDD6", color: "#A8852D" }}
              >
                {item.icon}
              </div>
              <div>
                <p style={{ fontSize: 12.5, fontWeight: 800, color: "#0B1320", letterSpacing: "-0.1px", lineHeight: 1.2 }}>{item.label}</p>
                <p style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{item.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[560px]"
        style={{
          background: "#fff",
          border: "1px solid #E8EAEE",
          borderRadius: 22,
          padding: "28px 32px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06), 0 4px 18px rgba(194,152,76,0.08)",
        }}
      >
        {/* Section 01 */}
        <div>
          <div className="flex items-start gap-3 mb-[18px]">
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: "linear-gradient(135deg, #C2984C 0%, #A8852D 100%)",
                color: "#fff",
                fontSize: 11, fontWeight: 900, letterSpacing: "-0.2px",
                boxShadow: "0 4px 10px rgba(194,152,76,0.25)",
              }}
            >
              01
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#0B1320", letterSpacing: "-0.2px", lineHeight: 1.2 }}>Vos coordonnées</p>
              <p style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>Identifient votre entreprise dans le contrat</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label style={labelStyle}>Nom de l'entreprise</label>
              <input
                type="text"
                placeholder="Menuiserie Martin"
                value={compte.nomEntreprise}
                onChange={(e) => setCompte({ nomEntreprise: e.target.value })}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#C2984C"; e.target.style.boxShadow = "0 0 0 3px rgba(194,152,76,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#E8EAEE"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Prénom</label>
                <input
                  type="text"
                  placeholder="Patrick"
                  value={compte.prenom}
                  onChange={(e) => setCompte({ prenom: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#C2984C"; e.target.style.boxShadow = "0 0 0 3px rgba(194,152,76,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#E8EAEE"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={labelStyle}>Nom</label>
                <input
                  type="text"
                  placeholder="Martin"
                  value={compte.nom}
                  onChange={(e) => setCompte({ nom: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#C2984C"; e.target.style.boxShadow = "0 0 0 3px rgba(194,152,76,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#E8EAEE"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email professionnel</label>
              <input
                type="email"
                placeholder="vous@menuiserie.fr"
                value={compte.email}
                onChange={(e) => setCompte({ email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#C2984C"; e.target.style.boxShadow = "0 0 0 3px rgba(194,152,76,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#E8EAEE"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div>
              <label style={labelStyle}>Téléphone</label>
              <input
                type="tel"
                placeholder="06 12 34 56 78"
                value={compte.telephone}
                onChange={(e) => setCompte({ telephone: e.target.value })}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#C2984C"; e.target.style.boxShadow = "0 0 0 3px rgba(194,152,76,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#E8EAEE"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full flex items-center justify-center gap-[10px] transition-all duration-[180ms]"
          style={{
            marginTop: 26,
            padding: "18px 28px",
            borderRadius: 50,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "-0.2px",
            border: "none",
            cursor: isValid && !isLoading ? "pointer" : "not-allowed",
            background: "linear-gradient(180deg, #16A34A 0%, #15803D 100%)",
            color: "#fff",
            opacity: isValid && !isLoading ? 1 : 0.45,
            boxShadow: isValid && !isLoading
              ? "0 12px 28px rgba(22,163,74,0.34), 0 4px 8px rgba(22,163,74,0.18), inset 0 1px 0 rgba(255,255,255,0.15)"
              : "none",
          }}
        >
          <span>{isLoading ? "Enregistrement…" : "Créer mon compte"}</span>
          {!isLoading && (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>

        <p className="text-center mt-3.5" style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.55 }}>
          En créant votre compte, vous acceptez les{" "}
          <a href="#" style={{ color: "#0B1320", fontWeight: 600 }}>CGU</a>. Notifications email pour chaque demande (jamais de pub).
        </p>
      </form>
    </div>
  );
}
