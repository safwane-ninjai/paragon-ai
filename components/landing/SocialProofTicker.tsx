export default function SocialProofTicker() {
  return (
    <div className="w-full flex justify-center py-8 px-4">
      <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <p className="text-sm font-medium text-navy">
          <strong>712</strong> demandes de rendez-vous qualifiés générées{" "}
          <span className="text-gray-500">ce mois-ci</span>
        </p>
      </div>
    </div>
  );
}
