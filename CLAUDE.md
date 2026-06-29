# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

**Paragon IA — Tunnel d'onboarding.** Funnel d'inscription en 6 étapes pour enrôler des
artisans (menuisiers, installateurs PAC, etc.) sur une plateforme de génération de leads
qualifiés. Mobile first.

Brief fonctionnel complet (les 6 étapes, plans, flux de données) : @docs/brief-onboarding.md

> ⚠️ **Marque = Paragon IA, PAS Ninjai.** N'applique jamais le skill `ninjai-visual-identity`
> ici. La charte visuelle Paragon vit dans le skill `paragon-ia-design` (`/paragon-ia-design`).

## Stack

- **Frontend** : Next.js (App Router) + TypeScript + Tailwind CSS
- **Paiement** : Whop (CB enregistrée, 0 € débité à l'inscription, prélèvement par livraison)
- **BDD** : Airtable
- **Signature contrat** : DocuSeal self-hosted → https://docuseal.paragon-ia.tech
- **Orchestration / webhooks** : n8n
- **Hébergement** : Coolify

Le repo est neuf : il n'y a pas encore de code. Initialise le frontend avec
`create-next-app` (TypeScript + Tailwind + App Router) avant de coder les étapes.

## Flux de données (orchestré par n8n)

- **Étape 4 (Compte)** → création d'une fiche Airtable (nom, société, email, tél, plan, ciblage)
- **Étape 5 (Paiement)** → Whop enregistre la CB → webhook n8n confirme
- **Étape 6 (Contrat)** → n8n appelle l'API DocuSeal avec les données client → génère le PDF →
  l'envoie par email au client **et** à Paragon IA
- **Confirmation** → Airtable mis à jour (`statut = signé`)

Le front ne parle jamais directement à DocuSeal/Whop pour les actions sensibles : il passe par
des routes serveur Next.js qui déclenchent les webhooks n8n. Ne jamais exposer de clé API
(Airtable, Whop, DocuSeal, n8n) côté client.

## Conventions

- **Mobile first** : conçois et teste d'abord le rendu mobile, puis élargis.
- **Design** : respecte le skill `paragon-ia-design` pour tout composant UI (couleurs, typo,
  barre de progression X/6). Invoque-le avec `/paragon-ia-design`.
- **Nouvelle étape du funnel** : utilise le skill `/funnel-step` pour rester cohérent avec le
  pattern des autres étapes (page + formulaire + validation + barre de progression).
- **Secrets** : toute clé/URL de service va dans `.env.local` (jamais commitée). Voir
  variables attendues ci-dessous.

## Variables d'environnement attendues

À renseigner dans `.env.local` au fur et à mesure des intégrations :

- `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`
- `WHOP_API_KEY` (+ secret de vérification du webhook)
- `N8N_WEBHOOK_URL` (URL de base des webhooks n8n)
- `DOCUSEAL_API_URL` (https://docuseal.paragon-ia.tech), `DOCUSEAL_API_KEY`
