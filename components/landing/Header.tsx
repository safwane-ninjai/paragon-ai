import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex justify-center pt-6 pb-4 px-4">
      <Image
        src="/logo-paragon.png"
        alt="Paragon IA"
        width={180}
        height={48}
        priority
        className="h-10 w-auto object-contain"
      />
    </header>
  );
}
