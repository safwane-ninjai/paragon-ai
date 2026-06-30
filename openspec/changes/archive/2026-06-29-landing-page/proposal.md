## Why

Paragon IA a besoin d'une page d'entrée (landing page) qui précède le tunnel d'onboarding. Sans elle, les artisans arriveraient directement sur l'étape 1 du funnel sans avoir compris la valeur de la plateforme. Cette page convertit un visiteur froid en prospect chaud prêt à s'inscrire.

## What Changes

- Création de la route `/` (page d'accueil) en Next.js 15 App Router
- Header avec le logo Paragon IA (fichier PNG fourni)
- Section hero 2 colonnes : accroche + CTA à gauche, preview du dashboard artisan à droite
- Ticker de social proof animé (compteur de demandes générées ce mois-ci)
- Bande de statistiques clés : 56 000+ RDV · 5+ ans · 17 secteurs · 4,9/5
- Section "Comment ça marche" : 3 étapes numérotées avec icônes
- Footer : liens légaux + copyright
- Bouton CTA "Démarrer maintenant →" redirige vers `/onboarding/ciblage` (étape 1 du funnel)

## Non-objectifs

- Pas d'intégration Whop, Airtable, DocuSeal ou n8n sur cette page (pas de formulaire)
- Pas de blog, FAQ, page de tarifs séparée ni page de contact
- Pas de SEO avancé ni d'A/B testing (MVP)
- Pas d'animation complexe (juste le ticker)

## Capabilities

### New Capabilities

- `landing-page` : Page d'accueil marketing statique avec hero, social proof, stats, "comment ça marche" et footer. Point d'entrée unique vers le tunnel d'onboarding.

### Modified Capabilities

_(aucune — c'est une nouvelle page, aucun spec existant n'est modifié)_

## Impact

- **Nouveau fichier** : `app/page.tsx` (route `/`)
- **Nouveaux composants** : `Header`, `HeroSection`, `DashboardPreview`, `SocialProofTicker`, `StatsBar`, `HowItWorks`, `Footer`
- **Asset** : logo PNG à placer dans `public/logo-paragon.png`
- **Aucune intégration tierce** sur cette page
- **Dépendance** : le CTA pointe vers `/onboarding/ciblage` (étape 1, à construire ensuite)
