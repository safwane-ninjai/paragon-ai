## Why

Le tunnel d'onboarding est bloqué à l'étape 5 (paiement CB). Il manque l'étape 6 : la signature électronique du contrat d'activation, qui officialise l'engagement du client et déclenche la livraison des premières demandes de RDV.

## What Changes

- Nouvelle page `/onboarding/contrat` : étape 6/6 "Contrat"
- Affichage du contrat pré-rempli avec les données client (société, dirigeant, email, téléphone) issues du store Zustand
- Récapitulatif du pack souscrit (plan, nb de demandes, prix unitaire, total TTC) calculé depuis `selectedPlan`
- Checkbox d'acceptation CGV + champ "Votre nom complet" + canvas de signature (souris/doigt)
- API Route `POST /api/contrat/signer` : appelle DocuSeal API pour créer une soumission pré-remplie, retourne le token de signature embarquée
- Intégration du widget de signature DocuSeal (`@docuseal/react`) en mode embed sur la page
- Après signature : redirection vers `/onboarding/confirmation`
- Webhook n8n déclenché : PDF signé envoyé au client ET à `PARAGON_EMAIL_CONTRATS`

## Capabilities

### New Capabilities
- `etape-contrat`: Page de signature du contrat d'activation avec embed DocuSeal, récapitulatif pack, acceptation CGV

### Modified Capabilities
<!-- aucune -->

## Impact

- Nouveau fichier : `app/onboarding/contrat/page.tsx` (server + client components)
- Nouvelle API Route : `app/api/contrat/signer/route.ts`
- Dépendance npm : `@docuseal/react`
- Variables `.env.local` : `DOCUSEAL_API_URL`, `DOCUSEAL_API_KEY`, `DOCUSEAL_TEMPLATE_ID`, `N8N_WEBHOOK_CONTRAT`
- Zustand store : lecture de `compte` (nomEntreprise, prenom, nom, email, telephone) et `selectedPlan`
- Pas de modification du store ni des étapes précédentes
