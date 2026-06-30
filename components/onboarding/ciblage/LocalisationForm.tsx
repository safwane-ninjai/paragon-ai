"use client";

import { useOnboardingStore } from "@/lib/store/onboarding";

const RAYONS = [10, 20, 30, 50, 100];

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
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#0B1320",
  marginBottom: "8px",
  letterSpacing: "-0.1px",
} as const;

export default function LocalisationForm() {
  const { ciblage, setCiblage } = useOnboardingStore();

  return (
    <div>
      {/* Section title */}
      <div
        className="flex items-center gap-2 mb-4 text-[11px] font-extrabold uppercase"
        style={{ color: "#A8852D", letterSpacing: "2.4px" }}
      >
        <span className="w-[18px] h-[1.5px] rounded" style={{ background: "#C2984C" }} />
        Localisation
      </div>

      {/* Ville */}
      <div className="mb-4">
        <label style={labelStyle}>Ville principale</label>
        <input
          type="text"
          value={ciblage.ville}
          onChange={(e) => setCiblage({ ville: e.target.value })}
          placeholder="Ex : Lyon, Bordeaux, Nantes…"
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = "#C2984C"; e.target.style.boxShadow = "0 0 0 3px rgba(194,152,76,0.15)"; }}
          onBlur={(e) => { e.target.style.borderColor = "#E8EAEE"; e.target.style.boxShadow = "none"; }}
        />
      </div>

      {/* Pays + Rayon */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label style={labelStyle}>Pays</label>
          <div className="relative">
            <select
              value={ciblage.pays}
              onChange={(e) => setCiblage({ pays: e.target.value })}
              style={{ ...inputStyle, paddingRight: 40, appearance: "none" }}
            >
              <option value="France">🇫🇷 France</option>
              <option value="Belgique">🇧🇪 Belgique</option>
              <option value="Suisse">🇨🇭 Suisse</option>
              <option value="Luxembourg">🇱🇺 Luxembourg</option>
            </select>
            <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path stroke="#0B1320" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 1l5 5 5-5" />
            </svg>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Rayon (km)</label>
          <div className="relative">
            <select
              value={ciblage.rayon}
              onChange={(e) => setCiblage({ rayon: Number(e.target.value) })}
              style={{ ...inputStyle, paddingRight: 40, appearance: "none" }}
            >
              {RAYONS.map((r) => (
                <option key={r} value={r}>{r} km</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path stroke="#0B1320" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 1l5 5 5-5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Codes postaux */}
      <div>
        <label style={labelStyle}>
          Codes postaux prioritaires{" "}
          <span style={{ color: "#6B7280", fontWeight: 500 }}>(optionnel)</span>
        </label>
        <textarea
          value={ciblage.codesPostaux}
          onChange={(e) => setCiblage({ codesPostaux: e.target.value })}
          placeholder="Ex : 69001, 69002, 69003…"
          rows={3}
          style={{ ...inputStyle, resize: "vertical", minHeight: 60 }}
          onFocus={(e) => { e.target.style.borderColor = "#C2984C"; e.target.style.boxShadow = "0 0 0 3px rgba(194,152,76,0.15)"; }}
          onBlur={(e) => { e.target.style.borderColor = "#E8EAEE"; e.target.style.boxShadow = "none"; }}
        />
        <p className="mt-2 text-[12.5px]" style={{ color: "#6B7280" }}>
          Séparés par une virgule. Laissez vide pour couvrir tout le rayon.
        </p>
      </div>
    </div>
  );
}
