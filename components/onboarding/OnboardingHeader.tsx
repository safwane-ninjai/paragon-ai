import Image from "next/image";
import Link from "next/link";

interface OnboardingHeaderProps {
  backHref?: string;
}

export default function OnboardingHeader({ backHref }: OnboardingHeaderProps) {
  return (
    <header className="relative w-full max-w-[600px] mx-auto flex items-center justify-center px-5 pt-8 pb-6">
      {backHref && (
        <Link
          href={backHref}
          aria-label="Précédent"
          className="absolute left-5 flex items-center justify-center rounded-full transition-all duration-150 hover:-translate-x-0.5"
          style={{
            width: 38, height: 38,
            background: "#fff",
            border: "1px solid #E8EAEE",
            color: "#0B1320",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
      )}
      <Link href="/" aria-label="Retour à l'accueil">
        <Image
          src="/logo-paragon.png"
          alt="Paragon IA"
          width={140}
          height={36}
          priority
          className="h-8 w-auto object-contain"
        />
      </Link>
    </header>
  );
}
