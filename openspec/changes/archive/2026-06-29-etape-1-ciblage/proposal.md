## Why

L'étape 1 du tunnel d'onboarding est la première interaction de l'artisan avec Paragon IA après la landing page. Elle détermine la zone géographique et les types de prospects ciblés — informations fondamentales pour la génération de leads. Sans cette étape, aucun autre step du funnel ne peut être personnalisé.

## What Changes

- Création de la route `/onboarding/ciblage` (étape 1/6 du tunnel)
- Header avec logo, flèche retour (→ `/`), barre de progression étape 1/6 + label "Ciblage"
- Badge "VOTRE CIBLE" avec dot doré
- Titre H1 "Ciblez votre zone et vos prospects."
- Widget de visualisation de zone (radar SVG animé avec cercles concentriques et dots)
- 3 stats dynamiques liées aux inputs : km de rayon · ~nb propriétaires ciblés · 100% zone exclusive
- Formulaire LOCALISATION : ville (texte), pays (dropdown, défaut France), rayon km (dropdown : 10, 20, 30, 50, 100 km), codes postaux prioritaires (textarea, optionnel)
- Sélection type de prospect : 3 options radio-card (Propriétaires de maison / d'appartement / Les deux)
- Sélection type de chantier : pill-toggles multi-sélection groupés en 2 catégories (Menuiserie & Extérieur · Rénovation énergétique)
- Bouton "Continuer →" désactivé tant que ville + type de prospect + ≥1 type de chantier ne sont pas remplis
- État du formulaire persisté dans le store global (pas de perte si retour arrière)
- Footer avec liens légaux

## Non-objectifs

- Pas d'appel API réel pour calculer le nombre de propriétaires (valeur calculée heuristiquement côté client)
- Pas d'intégration Airtable ou n8n à cette étape (les données sont collectées en mémoire et envoyées à l'étape 4)
- Pas de géolocalisation automatique

## Capabilities

### New Capabilities

- `onboarding-layout` : Layout partagé pour toutes les étapes du funnel (header avec logo + retour, barre de progression X/6, footer). Utilisé par les 6 étapes.
- `etape-ciblage` : Formulaire de ciblage géographique et de sélection des types de prospects/chantiers avec widget de visualisation de zone, stats dynamiques, et validation avant progression.

### Modified Capabilities

_(aucune)_

## Impact

- **Nouveau layout** : `app/onboarding/layout.tsx` (partagé par toutes les étapes du funnel)
- **Nouvelle route** : `app/onboarding/ciblage/page.tsx`
- **Nouveaux composants** : `ZoneWidget`, `ProspectTypeSelector`, `ChantierTypeSelector`, `ProgressBar`, `OnboardingHeader`
- **Store global** : `lib/store/onboarding.ts` (Zustand ou Context) pour persister l'état inter-étapes
- **Aucune intégration tierce** à cette étape
- **Dépendance** : le bouton "Continuer" pointera vers `/onboarding/plateforme` (étape 2, à construire ensuite)
