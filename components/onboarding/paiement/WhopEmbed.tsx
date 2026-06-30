"use client";

import { useEffect, useState } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";

interface WhopEmbedProps {
  planId: string;
  email: string;
}

export default function WhopEmbed({ planId, email }: WhopEmbedProps) {
  const [returnUrl, setReturnUrl] = useState("");

  useEffect(() => {
    setReturnUrl(`${window.location.origin}/onboarding/contrat`);
  }, []);

  if (!returnUrl) return null;

  const environment = (process.env.NEXT_PUBLIC_WHOP_ENVIRONMENT as "sandbox" | "production") ?? "production";

  return (
    <WhopCheckoutEmbed
      planId={planId}
      prefill={{ email }}
      returnUrl={returnUrl}
      theme="light"
      environment={environment}
    />
  );
}
