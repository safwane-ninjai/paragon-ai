const steps = [
  {
    number: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Définissez votre zone",
    description: "Ville, rayon, codes postaux, type de chantier. En 1 minute.",
  },
  {
    number: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: "On qualifie pour vous",
    description: "Campagnes ciblées. Coordonnées + adresse + projet vérifiés avant livraison.",
  },
  {
    number: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Closez vos ventes",
    description: "Direct dans votre plateforme. Vous payez uniquement quand une demande est livrée.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="w-full max-w-[920px] mx-auto px-5 mt-16 pt-8"
      style={{ borderTop: "1px solid #F0F2F5" }}
    >
      {/* Eyebrow */}
      <div
        className="text-center text-[11px] font-extrabold uppercase tracking-[2px] mb-2 flex items-center justify-center gap-3.5"
        style={{ color: "#A8852D" }}
      >
        <span className="w-7 h-px opacity-50" style={{ background: "#C2984C" }} />
        Comment ça marche
        <span className="w-7 h-px opacity-50" style={{ background: "#C2984C" }} />
      </div>

      {/* Title */}
      <h2
        className="text-center font-extrabold mb-7"
        style={{ fontSize: "22px", letterSpacing: "-0.6px", color: "#0B1320" }}
      >
        3 étapes. 1 flux exclusif de demandes qualifiées.
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-[18px] p-6 transition-all duration-200 hover:-translate-y-0.5 cursor-default hover:shadow-[0_12px_28px_rgba(11,19,32,0.06)] hover:border-[rgba(194,152,76,0.32)]"
            style={{ background: "#fff", border: "1px solid #E8EAEE" }}
          >
            <div className="text-[11px] font-extrabold tracking-[1.4px] mb-1.5" style={{ color: "#A8852D" }}>{step.number}</div>
            <div
              className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-[11px] mb-3"
              style={{ background: "#FAEDD6", color: "#A8852D" }}
            >
              {step.icon}
            </div>
            <h3 className="font-extrabold mb-1.5" style={{ fontSize: "15px", letterSpacing: "-0.2px", color: "#0B1320" }}>{step.title}</h3>
            <p style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: "1.55" }}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
