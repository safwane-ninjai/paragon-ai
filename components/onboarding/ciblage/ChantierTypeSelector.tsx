"use client";

import { useOnboardingStore } from "@/lib/store/onboarding";

const GROUPS = [
  {
    label: "Menuiserie & extérieur",
    items: ["Menuiserie", "Pergola", "Porte-fenêtre", "Véranda", "Portail", "Store / Volet", "Autres"],
  },
  {
    label: "Rénovation énergétique",
    items: ["Pompe à chaleur", "Panneaux photovoltaïques", "Autres"],
  },
];

export default function ChantierTypeSelector() {
  const { ciblage, toggleChantier } = useOnboardingStore();

  return (
    <div style={{ marginTop: 26, paddingTop: 26, borderTop: "1px solid #F0F2F5" }}>
      <div className="flex items-center gap-2 mb-1 text-[11px] font-extrabold uppercase" style={{ color: "#A8852D", letterSpacing: "2.4px" }}>
        <span className="w-[18px] h-[1.5px] rounded" style={{ background: "#C2984C" }} />
        Type de chantier
      </div>
      <p className="mb-4 text-[13px]" style={{ color: "#6B7280" }}>Sélectionnez tous les chantiers qui vous intéressent.</p>

      {GROUPS.map((group) => (
        <div key={group.label} className="mb-4 last:mb-0">
          {/* Group label */}
          <div
            className="flex items-center gap-2 mb-2.5 text-[11px] font-extrabold uppercase"
            style={{ color: "#A8852D", letterSpacing: "1.4px" }}
          >
            <span className="w-4 h-0.5 rounded" style={{ background: "#C2984C" }} />
            {group.label}
          </div>
          {/* Chips */}
          <div className="flex flex-wrap gap-2.5">
            {group.items.map((item) => {
              const active = ciblage.typesChantier.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleChantier(item)}
                  className="inline-flex items-center gap-1.5 rounded-full font-semibold transition-all duration-150"
                  style={{
                    padding: "11px 18px",
                    fontSize: "13.5px",
                    background: active ? "#FAEDD6" : "#fff",
                    border: `1.5px solid ${active ? "#C2984C" : "#E8EAEE"}`,
                    color: active ? "#A8852D" : "#4A5468",
                    fontWeight: active ? 700 : 600,
                    boxShadow: active ? "0 2px 8px rgba(194,152,76,0.15)" : "none",
                  }}
                >
                  {active && <span style={{ fontWeight: 900, color: "#A8852D" }}>✓</span>}
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
