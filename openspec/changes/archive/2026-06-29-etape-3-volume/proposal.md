## What

Créer la page `/onboarding/volume` — Étape 3/6 du tunnel d'onboarding Paragon IA. L'utilisateur choisit son forfait mensuel parmi 3 options (Starter / Booster / Croissance). La sélection est persistée dans le store Zustand. Le CTA du bas reflète dynamiquement le plan choisi.

## Why

C'est l'étape de conversion monétaire du tunnel : l'artisan s'engage sur un volume de demandes. Le plan "Croissance" est pré-sélectionné et mis en avant (recommandé + meilleur tarif) pour maximiser le panier moyen. La garantie de remplacement réduit la friction d'achat.

## User Story

En tant qu'artisan qui vient de voir la plateforme, je veux choisir mon volume de demandes mensuelles pour que je puisse calibrer mon budget avant de créer mon compte.

## Routes / Pages

- Nouvelle page : `app/onboarding/volume/page.tsx` (client component)
- Back : `/onboarding/plateforme`
- Next : `/onboarding/compte` (étape 4)

## Data

3 forfaits hardcodés (pas d'API) :

| Plan | Demandes/mois | Prix/demande | Pack mensuel | Badge |
|------|---------------|-------------|--------------|-------|
| Starter | 20 | 95 € TTC | 1 900 € TTC | — |
| Booster | 30 | 85 € TTC | 2 550 € TTC | — |
| Croissance | 40 | 75 € TTC | 3 000 € TTC | ★ RECOMMANDÉ · MEILLEUR TARIF |

Plan sélectionné par défaut : **Croissance**. Zustand store → `selectedPlan: "starter" | "booster" | "croissance"`.

## Scope

- Front uniquement, pas d'appel API
- Pas de paiement ici (Whop = étape 5)
- CTA dynamique : "Continuer avec [Nom du plan] →"
