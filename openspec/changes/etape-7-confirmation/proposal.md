## Why

Le tunnel d'onboarding en 6 étapes se termine actuellement sans page de confirmation. Après la signature du contrat, l'artisan est redirigé vers `/onboarding/confirmation` qui n'existe pas encore. Cette page est essentielle pour rassurer le client, lui indiquer les prochaines étapes concrètes, et présenter son agent dédié (Marie Claire, CSM).

## What Changes

- Création de la page `/onboarding/confirmation` avec le design du fichier `step-7-confirmation.html`
- Personnalisation avec le prénom (`compte.prenom`) lu depuis le store Zustand
- Barre de progression 100% verte (activation confirmée)
- Hero section avec icône ✓ animée, eyebrow vert, H1 "Bienvenue chez Paragon, [Prénom] !"
- 3 cartes "prochaines étapes" (email envoyé, agent dédié dans l'heure, premières demandes sous 24-48h)
- Card agent Marie Claire (photo fallback initiales, statut "En ligne" pulsant, message personnalisé avec le prénom)
- Note de réassurance en bas (spam, contact email)

## Capabilities

### New Capabilities

- `confirmation-page` : Page finale du tunnel d'onboarding — confirmation d'activation, personnalisation prénom, 3 next steps, card agent dédié Marie Claire avec message personnalisé

### Modified Capabilities

_(aucune)_

## Impact

- Nouveau fichier : `app/onboarding/confirmation/page.tsx`
- Lecture du store Zustand (`compte.prenom`, `compte.email`) — client component requis
- Aucune intégration tierce supplémentaire (Whop, Airtable, DocuSeal, n8n non impactés)
- La redirection depuis `ContratClient.tsx` vers `/onboarding/confirmation` est déjà en place
