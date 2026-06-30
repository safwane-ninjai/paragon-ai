interface Feature {
  prefix?: string;
  bold?: string;
  suffix?: string;
  gold?: boolean;
}

interface PlanCardProps {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  packPrice: string;
  features: Feature[];
  badge?: string;
  selected: boolean;
  onSelect: () => void;
}

export default function PlanCard({
  name,
  subtitle,
  price,
  packPrice,
  features,
  badge,
  selected,
  onSelect,
}: PlanCardProps) {
  return (
    <button
      onClick={onSelect}
      className="relative w-full text-left flex flex-col transition-all duration-[220ms]"
      style={{
        background: selected ? "linear-gradient(180deg, #FFFCF6 0%, #fff 100%)" : "#fff",
        border: `1.5px solid ${selected ? "#C2984C" : "#E8EAEE"}`,
        borderRadius: 20,
        padding: "28px 24px",
        boxShadow: selected
          ? "0 16px 40px rgba(194,152,76,0.22), 0 0 0 4px rgba(194,152,76,0.10), inset 0 1px 0 rgba(255,255,255,0.6)"
          : "0 1px 3px rgba(0,0,0,0.03)",
        transform: selected ? "translateY(-2px)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Radio top-right */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: 22, right: 22,
          width: 24, height: 24,
          borderRadius: "50%",
          border: `2px solid ${selected ? "#16A34A" : "#E8EAEE"}`,
          background: selected ? "#16A34A" : "#fff",
          transition: "all 0.18s",
        }}
      >
        {selected && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {/* Badge */}
      {badge && (
        <span
          className="inline-flex items-center self-start mb-3.5"
          style={{
            background: "#FAEDD6",
            color: "#A8852D",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            padding: "5px 11px",
            borderRadius: 50,
          }}
        >
          {badge}
        </span>
      )}

      {/* Name */}
      <p style={{ fontSize: 22, fontWeight: 800, color: "#0B1320", letterSpacing: "-0.5px", marginBottom: 4 }}>{name}</p>
      <p style={{ fontSize: 12.5, color: "#6B7280", fontWeight: 500, marginBottom: 18, lineHeight: 1.5 }}>{subtitle}</p>

      {/* Price */}
      <div className="flex items-start gap-[7px] mb-1.5">
        <span style={{ fontSize: 36, fontWeight: 900, color: "#0B1320", letterSpacing: "-1.4px", lineHeight: 1 }}>{price} €</span>
        <span style={{ fontSize: 11.5, color: "#6B7280", fontWeight: 600, lineHeight: 1.3, paddingTop: 5 }}>TTC<br />/ demande</span>
      </div>
      <p style={{ fontSize: 13, color: "#4A5468", fontWeight: 500, marginBottom: 18 }}>
        Pack mensuel : <strong style={{ color: "#0B1320", fontWeight: 700 }}>{packPrice} € TTC</strong>
      </p>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #F0F2F5", marginTop: "auto", paddingTop: 16 }}>
        <ul className="flex flex-col gap-[9px]">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2" style={{ fontSize: 12.5, color: f.gold ? "#A8852D" : "#4A5468", fontWeight: f.gold ? 700 : 500, lineHeight: 1.4 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C2984C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                {f.prefix}
                {f.bold && <strong style={{ color: "#0B1320", fontWeight: 700 }}>{f.bold}</strong>}
                {f.suffix}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
