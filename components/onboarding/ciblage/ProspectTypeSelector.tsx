"use client";

import { useOnboardingStore } from "@/lib/store/onboarding";

const OPTIONS = [
  { value: "maison" as const, label: "Propriétaires de maison", description: "Maison individuelle — meilleur taux de conversion" },
  { value: "appartement" as const, label: "Propriétaires d'appartement", description: "Appartement en copropriété" },
  { value: "les-deux" as const, label: "Les deux", description: "Maison + appartement" },
];

export default function ProspectTypeSelector() {
  const { ciblage, setCiblage } = useOnboardingStore();

  return (
    <div style={{ marginTop: 26, paddingTop: 26, borderTop: "1px solid #F0F2F5" }}>
      <div className="flex items-center gap-2 mb-4 text-[11px] font-extrabold uppercase" style={{ color: "#A8852D", letterSpacing: "2.4px" }}>
        <span className="w-[18px] h-[1.5px] rounded" style={{ background: "#C2984C" }} />
        Vos prospects cibles
      </div>

      <div className="flex flex-col gap-2.5">
        {OPTIONS.map((opt) => {
          const active = ciblage.typeProspect === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setCiblage({ typeProspect: opt.value })}
              className="flex items-center gap-3.5 text-left transition-all duration-[180ms] rounded-[14px]"
              style={{
                padding: "16px 18px",
                background: active ? "linear-gradient(180deg,#FFFCF6 0%,#fff 100%)" : "#fff",
                border: `1.5px solid ${active ? "#C2984C" : "#E8EAEE"}`,
                boxShadow: active ? "0 2px 12px rgba(194,152,76,0.18)" : "none",
              }}
            >
              {/* Radio dot */}
              <span
                className="flex items-center justify-center shrink-0 rounded-full transition-all duration-[180ms]"
                style={{
                  width: 22, height: 22,
                  border: `2px solid ${active ? "#16A34A" : "#E8EAEE"}`,
                  background: active ? "#16A34A" : "#fff",
                }}
              >
                {active && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <div>
                <p className="text-[14.5px] font-semibold" style={{ color: "#0B1320" }}>{opt.label}</p>
                <p className="text-[12.5px] mt-0.5 font-medium" style={{ color: "#6B7280" }}>{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
