export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 mt-auto py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-navy transition-colors">Mentions Légales</a>
          <span>·</span>
          <a href="#" className="hover:text-navy transition-colors">Politique de Confidentialité</a>
          <span>·</span>
          <a href="#" className="hover:text-navy transition-colors">CGV</a>
        </div>
        <p>© 2026 Paragon IA · Tous droits réservés.</p>
      </div>
    </footer>
  );
}
