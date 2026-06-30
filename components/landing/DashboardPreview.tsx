const appointments = [
  { time: "09:30", name: "Patrick Durand", type: "Pergola bioclimatique · Vichy", status: "Confirmé", statusColor: "text-green-600 bg-green-50" },
  { time: "10:45", name: "Marie Lambert", type: "Fenêtres alu · 12 ouvertures", status: "Confirmé", statusColor: "text-green-600 bg-green-50" },
  { time: "14:00", name: "Sophie Mercier", type: "Pergola toit fixe · 18 m²", status: "Nouveau", statusColor: "text-amber-600 bg-amber-50" },
  { time: "15:30", name: "Jean-Pierre Roux", type: "Véranda 22 m²", status: "À rappeler", statusColor: "text-gray-500 bg-gray-100" },
  { time: "16:45", name: "Thomas Bernard", type: "Porte d'entrée + 2 fenêtres", status: "Confirmé", statusColor: "text-green-600 bg-green-50" },
];

export default function DashboardPreview() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Floating notification */}
      <div className="absolute -top-4 left-4 right-8 z-10 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-navy leading-tight">Nouvelle demande qualifiée</p>
          <p className="text-xs text-gray-500">Pergola bioclimatique · à 4,2 km</p>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 pt-10 pb-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-gray-100">
          <div>
            <p className="text-xs font-semibold text-navy uppercase tracking-widest">Mon agenda</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Cette semaine</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gold leading-none">12</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest">RDV qualifiés</p>
          </div>
        </div>

        {/* Appointment list */}
        <ul className="divide-y divide-gray-50">
          {appointments.map((appt) => (
            <li key={appt.name} className="flex items-center gap-3 px-5 py-3">
              <span className="text-sm text-gray-400 w-11 shrink-0">{appt.time}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy truncate">{appt.name}</p>
                <p className="text-xs text-gray-400 truncate">{appt.type}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${appt.statusColor}`}>
                {appt.status === "Confirmé" && <span className="mr-1">✓</span>}
                {appt.status === "À rappeler" && <span className="mr-1">◎</span>}
                {appt.status}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">+ 7 demandes cette semaine</p>
          <p className="text-xs font-semibold text-gold">Pack Croissance</p>
        </div>
      </div>
    </div>
  );
}
