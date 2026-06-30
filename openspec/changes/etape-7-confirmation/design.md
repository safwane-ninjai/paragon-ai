## Context

La page `/onboarding/confirmation` est le dernier écran du tunnel. Elle est atteinte après la signature du contrat DocuSeal. Le `ContratClient.tsx` redirige déjà vers cette URL via `router.push("/onboarding/confirmation")`. Le store Zustand (`useOnboardingStore`) contient `compte.prenom` et `compte.email` disponibles côté client.

## Goals / Non-Goals

**Goals:**
- Afficher une confirmation d'activation personnalisée avec le prénom de l'artisan
- Montrer 3 prochaines étapes claires (email, agent, premières demandes)
- Présenter l'agent dédié Marie Claire avec statut "En ligne"
- Barre de progression 100% verte

**Non-Goals:**
- Aucun appel API supplémentaire (Airtable/n8n déjà appelés à l'étape 6)
- Pas de redirection post-confirmation
- Pas d'authentification requise

## Decisions

**Client Component** — La page lit le store Zustand (état client uniquement), donc `"use client"` est requis. Le prénom est lu depuis `useOnboardingStore().compte.prenom`.

**Fallback prénom** — Si le store est vide (accès direct à la page), afficher "cher artisan" pour éviter un blanc.

**Animation** — L'icône ✓ utilise une animation CSS `@keyframes success-pop` inline via `<style>` tag (même approche que `HeroSection.tsx`).

**Pas de `OnboardingHeader`** — La page de confirmation n'a pas de bouton retour. Seul le logo centré est affiché, fidèle au HTML client.

**Barre de progression custom** — La progress bar est 100% avec fond vert (`#16A34A`) et non la barre dorée standard.

## Risks / Trade-offs

- [Store vidé si refresh] → Le prénom affiche le fallback. Acceptable car la confirmation est un écran terminal.
- [Image agent] → Pas de vraie photo ; fallback initiales "MC" sur fond navy/gold. Peut être remplacé par une `<img>` plus tard.
