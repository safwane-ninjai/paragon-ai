import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import ProgressBar from "@/components/onboarding/ProgressBar";
import PaiementClient from "./PaiementClient";

export default function PaiementPage() {
  const planIds = {
    starter: process.env.WHOP_PLAN_STARTER_ID,
    booster: process.env.WHOP_PLAN_BOOSTER_ID,
    croissance: process.env.WHOP_PLAN_CROISSANCE_ID,
  };

  return (
    <div className="flex flex-col items-center w-full">
      <OnboardingHeader backHref="/onboarding/compte" />
      <ProgressBar step={5} stepName="Inscription" />
      <PaiementClient planIds={planIds} />
    </div>
  );
}
