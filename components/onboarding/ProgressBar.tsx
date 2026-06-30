interface ProgressBarProps {
  step: number;
  stepName: string;
}

export default function ProgressBar({ step, stepName }: ProgressBarProps) {
  const percent = Math.round((step / 6) * 100);

  return (
    <div className="w-full max-w-[600px] mx-auto px-5 flex flex-col items-center mb-8">
      {/* Track */}
      <div className="w-full h-1 rounded-full overflow-hidden mb-2.5" style={{ background: "rgba(194,152,76,0.12)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #C2984C 0%, #D9B770 100%)",
            boxShadow: "0 0 8px rgba(194,152,76,0.4)",
          }}
        />
      </div>
      {/* Labels */}
      <div className="inline-flex items-center gap-2 text-[11px] font-bold" style={{ color: "#6B7280", letterSpacing: "0.4px" }}>
        <span style={{ color: "#A8852D", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase" }}>
          Étape {step} / 6
        </span>
        <span style={{ color: "#9CA3AF", fontWeight: 400 }}>·</span>
        <span style={{ color: "#0B1320", fontWeight: 700 }}>{stepName}</span>
      </div>
    </div>
  );
}
