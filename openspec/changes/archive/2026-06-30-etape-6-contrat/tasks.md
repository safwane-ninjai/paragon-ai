## 1. Installation

- [x] 1.1 Installer `@docuseal/react` : `npm install @docuseal/react`

## 2. Route Handler POST /api/contrat/signer

- [x] 2.1 Créer `app/api/contrat/signer/route.ts` : valide `DOCUSEAL_TEMPLATE_ID` et `DOCUSEAL_API_KEY`, appelle `POST {DOCUSEAL_API_URL}/api/submissions` avec les `prefilled_fields` (société, dirigeant, email, téléphone, volume, prix_unitaire, total_ttc), retourne `{ slug }` du submitter
- [x] 2.2 Mapping plan → valeurs : starter (20 RDV, 85€, 1700€), booster (30 RDV, 85€, 2550€), croissance (40 RDV, 75€, 3000€)

## 3. Page /onboarding/contrat

- [x] 3.1 Créer `app/onboarding/contrat/page.tsx` (server) avec `OnboardingHeader backHref="/onboarding/paiement"` + `ProgressBar step=6 stepName="Contrat"` + `<ContratClient />`
- [x] 3.2 Créer `app/onboarding/contrat/ContratClient.tsx` (client) : lire `compte` + `selectedPlan` du store, guard redirect vers `/onboarding/ciblage` si `compte.email` vide

## 4. UI — En-tête et cartes de valeur

- [x] 4.1 Badge "● DERNIÈRE ÉTAPE" + H1 "Signez votre **contrat** d'activation." avec "contrat" souligné or + sous-titre
- [x] 4.2 3 cartes de valeur horizontal (01 On génère les prospects / 02 On les qualifie / 03 On vous les livre + icônes ambre)

## 5. UI — Contrat et pack souscrit

- [x] 5.1 Carte "Contrat d'activation" avec preview scrollable du texte du contrat (fond blanc, bordure grise, hauteur fixe ~200px, overflow-y scroll), pré-remplie avec les données du client en place des [à compléter]
- [x] 5.2 Section "VOTRE PACK SOUSCRIT" (bordure gauche or) : nom du plan, nb demandes, prix unitaire, total TTC en or grand, mention "Vous ne payez rien d'avance"

## 6. UI — Signature via DocuSeal embed

- [x] 6.1 Checkbox CGV + texte légal complet (plan, volume, montant, engagement, absence de garantie)
- [x] 6.2 Au chargement de la page (useEffect), appeler `POST /api/contrat/signer` avec les données du store → récupérer le `slug`
- [x] 6.3 Afficher `<DocusealForm>` de `@docuseal/react` avec `src={DOCUSEAL_API_URL}/s/{slug}` et `onComplete={() => router.push('/onboarding/confirmation')}`, visible seulement si checkbox cochée et slug disponible
- [x] 6.4 Lien "Me déconnecter" en bas de page

## 7. Vérification

- [x] 7.1 Build sans erreur TypeScript (`next build`)
- [x] 7.2 Vérifier que le contrat preview affiche bien les données pré-remplies du client
- [x] 7.3 Vérifier que le récapitulatif pack correspond au plan sélectionné
