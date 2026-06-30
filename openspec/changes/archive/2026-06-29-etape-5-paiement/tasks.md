## 1. Installation

- [x] 1.1 Installer `@whop/checkout` : `npm install @whop/checkout`
- [x] 1.2 Créer `.env.local` avec les 3 variables `NEXT_PUBLIC_WHOP_PLAN_ID_STARTER`, `NEXT_PUBLIC_WHOP_PLAN_ID_BOOSTER`, `NEXT_PUBLIC_WHOP_PLAN_ID_CROISSANCE` (valeurs placeholder à remplir par le client dans le dashboard Whop)

## 2. Page assemblage

- [x] 2.1 Créer `app/onboarding/paiement/page.tsx` (client) : `OnboardingHeader` (retour → `/onboarding/compte`), `ProgressBar` step=5 stepName="Inscription"
- [x] 2.2 Badge "● ÉTAPE FINALE · INSCRIPTION" + H1 "Validez votre inscription." avec "inscription" souligné or + sous-titre "0 € aujourd'hui. Recevez vos demandes..."
- [x] 2.3 Carte blanche principale : bande sécurité (SSL 256 / PCI-DSS / Sécurisé Whop) + info box ambre "Pourquoi votre carte maintenant ?"
- [x] 2.4 Intégrer `WhopCheckoutEmbed` : `planId` depuis env selon `selectedPlan`, `prefill.email` depuis `compte.email`, `returnUrl` vers `/onboarding/contrat`, `theme="light"`
- [x] 2.5 Afficher un message d'erreur si `planId` est undefined (env non configuré)
- [x] 2.6 3 reassurance cards sous la carte principale : "0 € aujourd'hui" / "Sécurisé par Whop" / "Remplacement gratuit"

## 3. Vérification

- [x] 3.1 Build sans erreur TypeScript (`next build`)
- [x] 3.2 Vérifier que l'email est bien passé en `prefill` au widget
- [x] 3.3 Vérifier que le bon plan ID est chargé selon `selectedPlan` dans le store
- [x] 3.4 Vérifier l'affichage du message d'erreur si `.env.local` non rempli
