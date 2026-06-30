interface TestimonialCardProps {
  initials: string;
  gradient: string;
  name: string;
  company: string;
  badge: string;
  children: React.ReactNode;
}

export default function TestimonialCard({ initials, gradient, name, company, badge, children }: TestimonialCardProps) {
  return (
    <div
      className="flex flex-col gap-4 relative overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid #E8EAEE",
        borderRadius: 18,
        padding: "24px 22px",
        boxShadow: "0 4px 14px rgba(11,19,32,0.05)",
      }}
    >
      {/* Gold top bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #C2984C 0%, #D9B770 100%)" }} />

      {/* Stars */}
      <p style={{ color: "#C2984C", fontSize: 13, letterSpacing: "3px" }}>★★★★★</p>

      {/* Quote */}
      <p className="flex-1 leading-relaxed" style={{ fontSize: 13.5, color: "#4A5468" }}>{children}</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center text-white shrink-0"
          style={{ width: 40, height: 40, borderRadius: "50%", background: gradient, fontSize: 13, fontWeight: 700 }}
        >
          {initials}
        </div>
        <div>
          <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0B1320" }}>{name}</p>
          <p style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 1 }}>{company}</p>
        </div>
      </div>

      {/* Badge */}
      <span
        style={{
          display: "inline-block",
          fontSize: 11.5,
          fontWeight: 700,
          color: "#A8852D",
          background: "#FAEDD6",
          border: "1px solid rgba(194,152,76,0.25)",
          padding: "6px 14px",
          borderRadius: 50,
          width: "fit-content",
        }}
      >
        {badge}
      </span>
    </div>
  );
}
