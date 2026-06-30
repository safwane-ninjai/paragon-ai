const stats = [
  { value: "56 000+", label: "RDV générés" },
  { value: "5+ ans", label: "d'expérience" },
  { value: "17 secteurs", label: "d'activité" },
  { value: "4,9 / 5", label: "★★★★★ Satisfaction", stars: true },
];

export default function PlatformeStatsBar() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4"
      style={{
        background: "#fff",
        border: "1px solid #E8EAEE",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 4px 14px rgba(11,19,32,0.04)",
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center text-center"
          style={{
            padding: "22px 16px",
            borderRight: i < stats.length - 1 ? "1px solid #F0F2F5" : "none",
          }}
        >
          <p
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: stat.stars ? "#C2984C" : "#0B1320",
              letterSpacing: "-0.8px",
              lineHeight: 1,
            }}
          >
            {stat.value}
          </p>
          <p style={{ fontSize: 11, color: "#6B7280", fontWeight: 600, marginTop: 6, letterSpacing: "0.2px" }}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
