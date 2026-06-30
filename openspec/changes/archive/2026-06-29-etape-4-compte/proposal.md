## What

Créer la page `/onboarding/compte` — Étape 4/6. L'artisan saisit ses coordonnées (nom entreprise, prénom, nom, email, téléphone) et choisit un mot de passe. Formulaire client-side, données persistées dans le store Zustand. Aucun appel API à ce stade (l'envoi vers Airtable se fait à l'étape suivante via n8n).

## Why

C'est l'étape d'identification : on collecte les infos nécessaires au contrat (étape 6 DocuSeal) et à la création du compte plateforme. Le badge "DERNIÈRE LIGNE DROITE · 30 SECONDES" réduit la friction. Le CTA vert renforce la connotation positive de "création" (vs noir pour les étapes neutres).

## User Story

En tant qu'artisan qui a choisi son forfait, je veux renseigner mes coordonnées et créer mon mot de passe pour que je puisse accéder à ma plateforme de demandes.

## Routes / Pages

- Nouvelle page : `app/onboarding/compte/page.tsx` (client component)
- Back : `/onboarding/volume`
- Next : `/onboarding/paiement` (étape 5)

## Data

**Formulaire (Zustand store) :**
- `nomEntreprise: string`
- `prenom: string`
- `nom: string`
- `email: string`
- `telephone: string`
- `motDePasse: string`

**Validation :**
- Tous les champs obligatoires
- `motDePasse.length >= 8`
- CTA "Créer mon compte →" disabled tant que invalide

## Scope

- Front uniquement, pas d'appel API
- Pas de vérification d'email en double
- Mot de passe stocké temporairement en Zustand (sera envoyé à Airtable via n8n à l'étape 5)
