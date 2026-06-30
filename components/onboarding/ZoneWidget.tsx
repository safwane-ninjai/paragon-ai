"use client";

export function estimateProspects(rayon: number): number {
  return Math.round((rayon * rayon * 1.3) / 100) * 100;
}

interface ZoneWidgetProps {
  rayon: number;
}

export default function ZoneWidget({ rayon }: ZoneWidgetProps) {
  const estimate = estimateProspects(rayon);
  const formatted = estimate.toLocaleString("fr-FR");

  return (
    <div
      className="w-full relative overflow-hidden rounded-[18px] mb-4"
      style={{
        background: "#fff",
        border: "1px solid #E8EAEE",
        boxShadow: "0 8px 24px rgba(11,19,32,0.05)",
      }}
    >
      {/* Gold top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #C2984C 0%, #D9B770 50%, #C2984C 100%)" }} />

      {/* SVG */}
      <div className="h-[180px] relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFCF6 0%, #fff 100%)" }}>
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <defs>
            <pattern id="zw-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E0D6" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="zw-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C2984C" stopOpacity="0.18" />
              <stop offset="70%" stopColor="#C2984C" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#C2984C" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="200" fill="url(#zw-grid)" />
          <circle cx="200" cy="100" r="85" fill="url(#zw-grad)" />
          <circle cx="200" cy="100" r="85" fill="none" stroke="#C2984C" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.6">
            <animate attributeName="r" values="85;88;85" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="100" r="60" fill="none" stroke="#C2984C" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
          {/* Dark house dots */}
          <g fill="#0B1320" opacity="0.7">
            {[[170,80],[225,85],[195,125],[245,115],[155,115],[215,65],[180,135],[235,135],[150,95],[260,95],[200,55],[175,55],[225,140]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="2.4" />
            ))}
          </g>
          {/* Gold qualified dots */}
          <g fill="#C2984C">
            <circle cx="195" cy="100" r="3" />
            <circle cx="215" cy="105" r="3" />
            <circle cx="185" cy="115" r="3" />
          </g>
          {/* Center pin */}
          <g transform="translate(200,100)">
            <circle cx="0" cy="0" r="14" fill="#0B1320" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="#C2984C" strokeWidth="1.5">
              <animate attributeName="r" values="14;22;14" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="-1" r="4.5" fill="#C2984C" />
          </g>
        </svg>
      </div>

      {/* Stats row */}
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: "1fr auto 1fr auto 1fr",
          padding: "16px 20px",
          borderTop: "1px solid #F0F2F5",
          background: "linear-gradient(180deg, #fff 0%, #FAFAF7 100%)",
        }}
      >
        <div className="text-center">
          <span className="block text-[22px] font-black leading-none" style={{ color: "#0B1320", letterSpacing: "-0.8px" }}>{rayon}</span>
          <span className="block text-[10px] font-bold uppercase tracking-[1.4px] mt-1" style={{ color: "#6B7280" }}>km de rayon</span>
        </div>
        <div className="w-px h-7 mx-4" style={{ background: "#E8EAEE" }} />
        <div className="text-center">
          <span className="block text-[22px] font-black leading-none" style={{ color: "#0B1320", letterSpacing: "-0.8px" }}>~ {formatted}</span>
          <span className="block text-[10px] font-bold uppercase tracking-[1.4px] mt-1" style={{ color: "#6B7280" }}>propriétaires ciblés</span>
        </div>
        <div className="w-px h-7 mx-4" style={{ background: "#E8EAEE" }} />
        <div className="text-center">
          <span className="block text-[22px] font-black leading-none" style={{ color: "#A8852D", letterSpacing: "-0.8px" }}>100%</span>
          <span className="block text-[10px] font-bold uppercase tracking-[1.4px] mt-1" style={{ color: "#6B7280" }}>zone exclusive</span>
        </div>
      </div>
    </div>
  );
}
