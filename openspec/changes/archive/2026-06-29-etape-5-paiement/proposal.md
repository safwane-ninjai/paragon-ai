## What

Créer la page `/onboarding/paiement` — Étape 5/6 "Inscription". L'artisan enregistre sa carte bancaire via le widget Whop Checkout Embed. Aucune donnée carte ne transite par les serveurs Paragon : Whop est PCI-DSS niveau 1 et gère l'intégralité du flux de paiement. L'email est pré-rempli depuis le store Zustand (étape 4).

## Why

C'est l'étape de monétisation : l'artisan enregistre sa CB (0 € débité aujourd'hui) pour que Whop puisse prélever automatiquement chaque demande de rendez-vous qualifiée livrée. Le widget Whop natif garantit la conformité PCI sans effort côté Paragon.

## User Story

En tant qu'artisan qui a créé son compte, je veux enregistrer ma carte pour que les demandes soient prélevées automatiquement à la livraison, sans saisir mes infos à chaque fois.

## Integration Whop

- Package : `@whop/checkout` (npm)
- Composant : `WhopCheckoutEmbed` (React/Next.js)
- `planId` : variable d'environnement selon le plan choisi à l'étape 3
  - `NEXT_PUBLIC_WHOP_PLAN_ID_STARTER`
  - `NEXT_PUBLIC_WHOP_PLAN_ID_BOOSTER`
  - `NEXT_PUBLIC_WHOP_PLAN_ID_CROISSANCE`
- `prefill.email` : `compte.email` depuis le store Zustand
- `returnUrl` : `https://[domaine]/onboarding/contrat` (étape 6)
- `theme` : `"light"` pour correspondre au design crème

## Routes / Pages

- Nouvelle page : `app/onboarding/paiement/page.tsx` (client component)
- Back : `/onboarding/compte`
- Next (via returnUrl Whop) : `/onboarding/contrat`

## Sécurité

- **Aucune clé secrète côté client.** Les plan IDs Whop (`NEXT_PUBLIC_WHOP_PLAN_ID_*`) sont des identifiants publics non-sensibles, équivalents à une Stripe publishable key.
- Les données carte sont chiffrées et stockées exclusivement chez Whop (jamais chez Paragon).
- Le prélèvement réel n'a lieu qu'à la livraison d'une demande qualifiée, pas à l'inscription.

## Scope

- Pas de logique de paiement côté serveur à cette étape
- Le succès du paiement est géré par le `returnUrl` Whop → étape 6
- Si Whop plan IDs non configurés en `.env.local`, afficher un message d'erreur clair
