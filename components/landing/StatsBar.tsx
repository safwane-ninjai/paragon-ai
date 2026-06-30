import React from "react";

const stats = [
  { value: "56 000", plus: "+", label: "Rendez-vous générés" },
  { value: "5", plus: "+", label: "Années d'expérience" },
  { value: "17", plus: "", label: "Secteurs d'activité" },
  { value: "4,9", suffix: "/5", label: "★★★★★ Satisfaction client" },
];

export default function StatsBar() {
  return (
    <section className="w-full max-w-[1100px] mx-auto px-5 mt-[72px] text-center">
      {/* Live counter */}
      <div
        className="inline-flex items-center gap-2.5 rounded-full mb-7 text-[13px] font-semibold"
        style={{
          background: "linear-gradient(135deg, rgba(22,163,74,0.08) 0%, rgba(22,163,74,0.03) 100%)",
          border: "1px solid rgba(22,163,74,0.22)",
          padding: "9px 18px",
          color: "#0B1320",
        }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{
            background: "#16A34A",
            boxShadow: "0 0 0 4px rgba(22,163,74,0.18)",
            animation: "notif-pulse 1.6s ease-in-out infinite",
          }}
        />
        <strong style={{ color: "#15803D", fontWeight: 900, fontSize: "14px", letterSpacing: "-0.2px" }}>712</strong>{" "}
        demandes de rendez-vous qualifiés générées{" "}
        <span style={{ color: "#6B7280", fontWeight: 500 }}>ce mois-ci</span>
      </div>

      {/* Stats grid */}
      <div
        className="grid items-center relative overflow-hidden rounded-[22px]"
        style={{
          gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
          background: "#fff",
          border: "1px solid #E8EAEE",
          padding: "28px 32px",
          boxShadow: "0 12px 36px rgba(11,19,32,0.06), 0 4px 12px rgba(11,19,32,0.03)",
        }}
      >
        {/* Gold top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, #C2984C 0%, #D9B770 50%, #C2984C 100%)" }}
        />

        {stats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <div className="text-center px-2">
              <div
                className="font-black inline-block leading-none"
                style={{
                  fontSize: "36px",
                  letterSpacing: "-1.5px",
                  background: "linear-gradient(135deg, #0B1320 0%, #A8852D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
                {stat.plus && (
                  <span style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.8px", WebkitTextFillColor: "#A8852D", color: "#A8852D" }}>
                    {stat.plus}
                  </span>
                )}
                {stat.suffix && (
                  <span style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.8px", WebkitTextFillColor: "#A8852D", color: "#A8852D" }}>
                    {stat.suffix}
                  </span>
                )}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest mt-2" style={{ color: "#6B7280" }}>
                {stat.label}
              </div>
            </div>
            {i < stats.length - 1 && (
              <div className="w-px h-12 mx-4" style={{ background: "#E8EAEE" }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <style>{`
        @keyframes notif-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(22,163,74,0.18); }
          50% { box-shadow: 0 0 0 7px rgba(22,163,74,0.08); }
        }
      `}</style>
    </section>
  );
}
