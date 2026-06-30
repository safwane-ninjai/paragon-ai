import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main
      className="flex flex-col min-h-screen items-center"
      style={{ background: "linear-gradient(135deg, #fdfaf2 0%, #ffffff 100%)", backgroundAttachment: "fixed" }}
    >
      <div className="w-full flex flex-col items-center px-5 pb-14">
        <Header />
        <HeroSection />
        <StatsBar />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}
