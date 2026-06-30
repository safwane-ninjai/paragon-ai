import Link from "next/link";
import Image from "next/image";

const AGENDA_ITEMS = [
  { time: "09:30", name: "Patrick Durand", project: "Pergola bioclimatique · Vichy", badge: "confirmed", label: "✓ Confirmé" },
  { time: "10:45", name: "Marie Lambert", project: "Fenêtres alu · 12 ouvertures", badge: "confirmed", label: "✓ Confirmé" },
  { time: "14:00", name: "Sophie Mercier", project: "Pergola toit fixe · 18 m²", badge: "new", label: "✨ Nouveau", isNew: true },
  { time: "15:30", name: "Jean-Pierre Roux", project: "Véranda 22 m²", badge: "pending", label: "⏱ À rappeler" },
  { time: "16:45", name: "Thomas Bernard", project: "Porte d'entrée + 2 fenêtres", badge: "confirmed", label: "✓ Confirmé" },
];

const BADGE_STYLES: Record<string, string> = {
  confirmed: "bg-green-50 text-green-700 border border-green-200",
  new: "bg-amber-50 text-amber-700 border border-amber-200",
  pending: "bg-orange-50 text-orange-700 border border-orange-200",
};

export default function HeroSection() {
  return (
    <section className="w-full max-w-[1120px] mx-auto px-5 mt-14 mb-0 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
      {/* Left — text */}
      <div>
        {/* Eyebrow pill */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5 text-[11px] font-bold tracking-[2px] uppercase"
          style={{
            background: "#fff",
            border: "1px solid rgba(194,152,76,0.25)",
            color: "#0B1320",
            boxShadow: "0 1px 3px rgba(194,152,76,0.15)",
          }}
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[#C2984C]" />
          Pour artisans &amp; pros du bâtiment
        </div>

        {/* H1 */}
        <h1
          className="font-bold leading-[1.06] mb-[18px]"
          style={{ fontSize: "clamp(32px,4vw,50px)", letterSpacing: "-1.1px", color: "#0B1320" }}
        >
          Activez votre flux de{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(transparent calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 5px), rgba(194,152,76,0.55) calc(100% - 1px), transparent calc(100% - 1px))",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              paddingBottom: "2px",
            }}
          >
            demandes de rendez-vous qualifiés
          </span>
          .
        </h1>

        {/* Sub */}
        <p className="text-base leading-relaxed mb-7 max-w-[480px]" style={{ color: "#4A5468" }}>
          Chaque <strong style={{ color: "#0B1320" }}>demande</strong> arrive avec le nom du prospect, son{" "}
          <strong style={{ color: "#0B1320" }}>adresse vérifiée</strong>, son téléphone et son projet.{" "}
          <strong style={{ color: "#0B1320" }}>Zone exclusive.</strong> Vous ne payez que les demandes livrées.
        </p>

        {/* CTA */}
        <Link
          href="/onboarding/ciblage"
          className="inline-flex items-center justify-center gap-2.5 text-white font-bold text-base rounded-full transition-transform hover:-translate-y-0.5 w-full max-w-[320px]"
          style={{
            padding: "18px 28px",
            background: "linear-gradient(180deg, #0B1320 0%, #060B1A 100%)",
            boxShadow: "0 12px 28px rgba(11,19,32,0.30), 0 4px 8px rgba(11,19,32,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
            letterSpacing: "-0.2px",
          }}
        >
          <span>Démarrer maintenant</span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>

        {/* Trust */}
        <div className="flex flex-wrap gap-5 mt-7 text-[12.5px] font-semibold" style={{ color: "#6B7280" }}>
          {["Onboarding en 1 min", "Zone exclusive", "Garantie remplacement"].map((item) => (
            <div key={item} className="inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C2984C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right — agenda card */}
      <div className="relative">
        {/* Floating notification */}
        <div
          className="absolute z-10 flex items-center gap-3 rounded-2xl"
          style={{
            top: "-26px",
            left: "-16px",
            background: "#fff",
            border: "1px solid rgba(22,163,74,0.20)",
            padding: "12px 16px",
            boxShadow: "0 14px 38px rgba(11,19,32,0.10), 0 0 0 4px rgba(22,163,74,0.06)",
            animation: "notif-float 4.5s ease-in-out infinite",
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              background: "#16A34A",
              boxShadow: "0 0 0 4px rgba(22,163,74,0.18)",
              animation: "notif-pulse 1.6s ease-in-out infinite",
            }}
          />
          <div>
            <div className="text-[12.5px] font-extrabold leading-tight" style={{ color: "#0B1320" }}>Nouvelle demande qualifiée</div>
            <div className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>Pergola bioclimatique · à 4,2 km</div>
          </div>
        </div>

        {/* Agenda card */}
        <div
          className="rounded-[22px] overflow-hidden relative"
          style={{
            background: "#fff",
            border: "1px solid #E8EAEE",
            boxShadow: "0 24px 60px rgba(11,19,32,0.10), 0 6px 24px rgba(11,19,32,0.04)",
          }}
        >
          {/* Gold top bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #C2984C 0%, #D9B770 50%, #C2984C 100%)" }} />

          {/* Header */}
          <div className="flex justify-between items-center px-6 pt-7 pb-5" style={{ borderBottom: "1px solid #F0F2F5" }}>
            <div>
              <div className="inline-flex items-center gap-2 text-[13px] font-extrabold" style={{ color: "#0B1320" }}>
                <span className="w-2 h-2 rounded-full bg-[#C2984C]" />
                Mon agenda
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[1.4px] mt-1" style={{ color: "#6B7280" }}>Cette semaine</div>
            </div>
            <div className="text-right">
              <span className="block text-[30px] font-black leading-none" style={{ color: "#A8852D", letterSpacing: "-1.5px" }}>12</span>
              <span className="block text-[10px] font-bold uppercase tracking-[1.3px] mt-1" style={{ color: "#6B7280" }}>RDV qualifiés</span>
            </div>
          </div>

          {/* List */}
          <div>
            {AGENDA_ITEMS.map((item) => (
              <div
                key={item.time}
                className={`grid items-center gap-4 px-6 py-3.5 ${item.isNew ? "bg-amber-50/40" : ""}`}
                style={{ gridTemplateColumns: "50px 1fr auto", borderBottom: "1px solid #F0F2F5" }}
              >
                <span className="text-[13px] font-bold tabular-nums" style={{ color: "#6B7280" }}>{item.time}</span>
                <div>
                  <div className="text-[13px] font-bold" style={{ color: "#0B1320" }}>{item.name}</div>
                  <div className="text-[11.5px]" style={{ color: "#6B7280" }}>{item.project}</div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${BADGE_STYLES[item.badge]}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4" style={{ background: "#FDFAF2" }}>
            <span className="text-[12px] font-semibold" style={{ color: "#6B7280" }}>+ 7 demandes cette semaine</span>
            <span className="text-[12px] font-bold" style={{ color: "#A8852D" }}>Pack Croissance</span>
          </div>
        </div>

        <style>{`
          @keyframes notif-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          @keyframes notif-pulse {
            0%, 100% { box-shadow: 0 0 0 4px rgba(22,163,74,0.18); }
            50% { box-shadow: 0 0 0 7px rgba(22,163,74,0.08); }
          }
        `}</style>
      </div>
    </section>
  );
}
