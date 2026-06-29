---
name: funnel-step
description: Scaffolde une nouvelle étape du tunnel d'onboarding Paragon IA (page Next.js + formulaire + validation + câblage de la barre de progression X/6 + état partagé). Utilise ce skill quand on demande d'ajouter ou de refaire une des 6 étapes du funnel, pour rester cohérent avec le pattern des autres étapes.
disable-model-invocation: true
---

# Créer une étape du funnel Paragon IA

Génère une étape du tunnel d'onboarding cohérente avec les autres. Argument attendu :
le numéro/nom de l'étape (ex. `/funnel-step 1 Ciblage`). Référence fonctionnelle complète :
@docs/brief-onboarding.md

## Étapes à suivre

1. **Lire le brief** de l'étape concernée dans `docs/brief-onboarding.md` (champs, CTA,
   contenus dynamiques).
2. **Appliquer la charte** : invoque mentalement `paragon-ia-design` (couleurs crème/or, Inter
   weight 900/800, tokens CSS verbatim, mobile first).
3. **Créer la page** sous l'App Router (ex. `app/onboarding/etape-N/page.tsx`).
4. **Barre de progression** : afficher « Étape N/6 » + nom, en réutilisant le composant de
   progression partagé (le créer une fois s'il n'existe pas).
5. **Formulaire + validation** : champs typés (TypeScript), validation côté client, messages
   d'erreur clairs. Mot de passe : 8 caractères min (étape 4).
6. **État partagé** : persister les données saisies entre les étapes (contexte/store partagé)
   pour pouvoir pré-remplir le contrat à l'étape 6.
7. **Navigation** : bouton retour + CTA « suivant » dynamique selon l'étape.
8. **Intégrations** (si l'étape en a) : passer par une route serveur Next.js qui déclenche le
   webhook n8n — jamais d'appel direct ni de clé API côté client. Voir le flux de données dans
   `CLAUDE.md`.

## Rappels par étape

- **1 Ciblage** : affichage dynamique rayon + propriétaires + « 100 % zone exclusive ».
- **2 Plateforme** : social proof, pas de formulaire.
- **3 Volume** : 3 plans (Starter/Booster/Croissance), Croissance recommandé, CTA dynamique.
- **4 Compte** : création fiche Airtable via n8n.
- **5 Paiement** : Whop (0 € débité), badges de sécurité.
- **6 Contrat** : contrat pré-rempli, canvas de signature, envoi DocuSeal via n8n.
