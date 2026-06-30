## Why

L'étape 2 est la page de social proof du tunnel. Après avoir défini sa zone, l'artisan doit être convaincu de la valeur de Paragon IA avant de choisir un plan. Cette page lui montre concrètement ce qu'il recevra : un dashboard de demandes qualifiées, avec des témoignages réels et des statistiques clés.

## What Changes

- Création de la route `/onboarding/plateforme` (étape 2/6)
- Header + barre de progression "ÉTAPE 2/6 · Votre plateforme" (layout onboarding existant)
- Badge "● VOTRE FUTURE PLATEFORME"
- Titre H1 : "Des demandes de rendez-vous qualifiés, prêtes à être traitées."
- Sous-titre avec mots en gras sélectifs (nom, email, adresse, projet)
- Mockup dashboard : fenêtre navigateur simulée (app.paragon-ia.com) avec 4 fiches de leads, onglets, barre de recherche, compteur de demandes
- CTA noir arrondi : "Oui, je veux développer mon activité →"
- Mention sous le CTA : "0 € aujourd'hui. Vous payez uniquement quand une demande qualifiée vous est livrée."
- 3 témoignages clients (cards avec étoiles, citation avec mots en gras/doré, nom, entreprise, badge résultat)
- Barre de statistiques : 56 000+ RDV · 5+ ans · 17 secteurs · 4,9/5 ★★★★★
- Footer légal (layout partagé)
- Le CTA redirige vers `/onboarding/volume` (étape 3)

## Non-objectifs

- Pas d'intégration API (page 100% statique, données hardcodées)
- Pas de vrais témoignages dynamiques depuis Airtable
- Pas de compteur animé en temps réel

## Capabilities

### New Capabilities

- `etape-plateforme` : Page de social proof (étape 2/6) avec dashboard mockup, CTA, témoignages et stats. Données hardcodées.

### Modified Capabilities

_(aucune — le layout `onboarding-layout` et `ProgressBar` sont réutilisés sans modification)_

## Impact

- **Nouvelle route** : `app/onboarding/plateforme/page.tsx`
- **Nouveaux composants** : `DashboardMockup`, `TestimonialCard`, `PlatformeStatsBar`
- **Réutilise** : `OnboardingHeader`, `ProgressBar`, `Footer` (déjà existants)
- **Dépendance** : CTA pointe vers `/onboarding/volume` (étape 3, à construire ensuite)
