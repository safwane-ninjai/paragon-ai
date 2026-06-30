const LEADS = [
  {
    initials: "PD",
    gradient: "linear-gradient(135deg, #C2984C, #A8852D)",
    name: "Patrick Durand",
    email: "patrick.durand@gmail.com",
    address: "12 rue de la Paix · Montluçon (03)",
    projet: "Pergola bioclimatique 18 m²",
    delay: "il y a 12 min",
    isNew: true,
  },
  {
    initials: "ML",
    gradient: "linear-gradient(135deg, #6B46C1, #9333EA)",
    name: "Marie Lambert",
    email: "m.lambert@orange.fr",
    address: "8 av. Victor Hugo · Vichy (03)",
    projet: "Fenêtres alu · 12 ouvertures",
    delay: "il y a 47 min",
    isNew: true,
  },
  {
    initials: "JR",
    gradient: "linear-gradient(135deg, #DC2626, #F87171)",
    name: "Jean-Pierre Roux",
    email: "jp.roux@wanadoo.fr",
    address: "25 chemin du Lac · Moulins (03)",
    projet: "Porte-fenêtre coulissante alu",
    delay: "il y a 2 h",
    isNew: true,
  },
  {
    initials: "SM",
    gradient: "linear-gradient(135deg, #0EA5E9, #38BDF8)",
    name: "Sophie Mercier",
    email: "sophie.mercier@gmail.com",
    address: "4 rue des Fleurs · Cusset (03)",
    projet: "Pergola toit fixe + véranda",
    delay: "il y a 4 h",
    isNew: true,
  },
];

const TABS = [
  { label: "Nouvelles demandes", count: 4, active: true, gold: true },
  { label: "À rappeler", count: 2 },
  { label: "Devis en cours", count: 3 },
  { label: "Signés", count: 7 },
];

export default function DashboardMockup() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid #E8EAEE",
        borderRadius: 20,
        boxShadow: "0 24px 60px rgba(11,19,32,0.10), 0 6px 24px rgba(11,19,32,0.04)",
        marginBottom: 24,
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-3"
        style={{
          background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
          borderBottom: "1px solid #E8EAEE",
          padding: "10px 14px",
        }}
      >
        <div className="flex gap-[6px] shrink-0">
          <span className="block rounded-full" style={{ width: 11, height: 11, background: "#F87171" }} />
          <span className="block rounded-full" style={{ width: 11, height: 11, background: "#FBBF24" }} />
          <span className="block rounded-full" style={{ width: 11, height: 11, background: "#4ADE80" }} />
        </div>
        <div
          className="flex items-center gap-[7px] mx-auto"
          style={{
            background: "#fff",
            border: "1px solid #E8EAEE",
            borderRadius: 7,
            padding: "5px 14px",
            fontSize: 11.5,
            color: "#6B7280",
            fontWeight: 600,
            maxWidth: 320,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>app.paragon-ia.com</span>
        </div>
        <div style={{ width: 50, flexShrink: 0 }} />
      </div>

      {/* CRM header */}
      <div
        className="flex items-center justify-between flex-wrap gap-2"
        style={{
          background: "linear-gradient(180deg, #0B1320 0%, #1A2238 100%)",
          padding: "16px 22px",
        }}
      >
        <div>
          <div
            className="inline-flex items-center gap-2"
            style={{
              background: "rgba(255,255,255,0.10)",
              padding: "6px 12px",
              borderRadius: 50,
              fontSize: 11.5,
              fontWeight: 800,
              letterSpacing: "1.3px",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C2984C", boxShadow: "0 0 0 3px rgba(194,152,76,0.25)", display: "inline-block" }} />
            Paragon IA
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 500, marginTop: 6 }}>Mon espace · Patrick Martin</p>
        </div>
        <div
          className="flex items-center gap-[6px]"
          style={{
            background: "rgba(22,163,74,0.20)",
            border: "1px solid rgba(22,163,74,0.30)",
            color: "#4ADE80",
            fontSize: 11.5,
            fontWeight: 600,
            padding: "7px 14px",
            borderRadius: 50,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
          +12 demandes cette semaine
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center gap-3"
        style={{ background: "#fff", padding: "10px 22px", borderBottom: "1px solid #F0F2F5" }}
      >
        <div
          className="flex items-center gap-2 flex-1"
          style={{
            background: "#F8FAFC",
            border: "1px solid #E8EAEE",
            borderRadius: 10,
            padding: "8px 14px",
            fontSize: 12.5,
            color: "#9CA3AF",
            fontWeight: 500,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Rechercher un prospect…
        </div>
        <div
          className="flex items-center gap-[6px] shrink-0"
          style={{
            background: "#fff",
            border: "1px solid #E8EAEE",
            borderRadius: 10,
            padding: "8px 14px",
            fontSize: 12.5,
            fontWeight: 600,
            color: "#0B1320",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
          </svg>
          Filtrer
        </div>
        <div
          style={{
            background: "#F8FAFC",
            border: "1px solid #E8EAEE",
            borderRadius: 10,
            padding: "8px 14px",
            fontSize: 12.5,
            fontWeight: 600,
            color: "#0B1320",
          }}
        >
          Vichy · 40km
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-0 overflow-x-auto"
        style={{ background: "#fff", borderBottom: "1px solid #F0F2F5", paddingLeft: 22 }}
      >
        {TABS.map((tab) => (
          <div
            key={tab.label}
            className="flex items-center gap-1.5 shrink-0"
            style={{
              padding: "12px 18px 12px 0",
              marginRight: 8,
              fontSize: 12,
              fontWeight: 600,
              color: tab.active ? "#0B1320" : "#9CA3AF",
              borderBottom: tab.active ? "2px solid #C2984C" : "2px solid transparent",
              cursor: "default",
            }}
          >
            {tab.label}
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: tab.gold ? "#C2984C" : "#9CA3AF",
                background: tab.gold ? "rgba(194,152,76,0.10)" : "#F3F4F6",
                padding: "1px 7px",
                borderRadius: 50,
              }}
            >
              {tab.count}
            </span>
          </div>
        ))}
      </div>

      {/* Leads */}
      <div style={{ background: "#fff" }}>
        {LEADS.map((lead, i) => (
          <div
            key={lead.name}
            className="flex items-start gap-3"
            style={{
              padding: "16px 22px",
              borderBottom: i < LEADS.length - 1 ? "1px solid #F8FAFC" : "none",
              background: i === 0 ? "linear-gradient(90deg, #FFFCF6 0%, #fff 100%)" : "#fff",
            }}
          >
            {/* Avatar */}
            <div
              className="flex items-center justify-center text-white shrink-0"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: lead.gradient,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {lead.initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0B1320" }}>{lead.name}</p>
                {lead.isNew && (
                  <span
                    className="flex items-center gap-[5px]"
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: "#15803D",
                      background: "#DCFCE7",
                      padding: "2px 8px",
                      borderRadius: 50,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#15803D", display: "inline-block" }} />
                    Nouveau
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-1.5" style={{ fontSize: 11.5, color: "#9CA3AF" }}>
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {lead.email}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {lead.address}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "#C2984C", textTransform: "uppercase", letterSpacing: "0.8px" }}>Projet</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0B1320" }}>{lead.projet}</span>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <p style={{ fontSize: 10.5, color: "#9CA3AF", whiteSpace: "nowrap" }}>{lead.delay}</p>
              <button
                style={{
                  background: "linear-gradient(180deg, #0B1320 0%, #060B1A 100%)",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "7px 16px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Appeler
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between"
        style={{
          background: "linear-gradient(180deg, #fff 0%, #FAFAF7 100%)",
          borderTop: "1px solid #F0F2F5",
          padding: "12px 22px",
        }}
      >
        <p style={{ fontSize: 12, color: "#6B7280" }}>
          <strong style={{ color: "#0B1320" }}>4 nouvelles demandes</strong> à traiter aujourd'hui
        </p>
        <p style={{ fontSize: 11, fontWeight: 800, color: "#C2984C", letterSpacing: "0.8px", textTransform: "uppercase" }}>
          ⚡ Tous exclusifs · Tous qualifiés
        </p>
      </div>
    </div>
  );
}
