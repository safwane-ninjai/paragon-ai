import Footer from "@/components/landing/Footer";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "linear-gradient(135deg, #fdfaf2 0%, #ffffff 100%)", backgroundAttachment: "fixed" }}>
      {children}
      <Footer />
    </div>
  );
}
