import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import ProgressBar from "@/components/onboarding/ProgressBar";
import ContratClient from "./ContratClient";

export default function ContratPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <OnboardingHeader backHref="/onboarding/paiement" />
      <ProgressBar step={6} stepName="Contrat" />
      <ContratClient />
    </div>
  );
}
