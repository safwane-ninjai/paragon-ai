# Rapport Tech Stack — Paragon IA Onboarding Funnel

> **Produit :** Tunnel d'onboarding 6 étapes pour inscrire des artisans français sur une plateforme de génération de leads qualifiés ("payé au résultat").
>
> **Contraintes :** Mobile first · France / RGPD · Équipe petite → vitesse de livraison critique · Budget startup

---

## 1. Framework Frontend

| Critère | **Next.js 15 (App Router)** | Remix 2 | SvelteKit | HTML/CSS pur |
|---------|----------------------------|---------|-----------|--------------|
| Performance SSR/SSG | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| Écosystème TypeScript | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★☆☆ |
| Facilité déploiement | ★★★★★ (Vercel natif) | ★★★★☆ | ★★★★☆ | ★★★★★ |
| Intégration Whop/n8n | ★★★★★ (API Routes) | ★★★★★ | ★★★★☆ | ★★☆☆☆ |
| DX / vitesse de dev | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| Communauté / libs | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★★ |
| État partagé entre étapes | Context/Zustand natif | Remix sessions | Svelte stores | localStorage |

**✅ Verdict : Next.js 15 (App Router) + TypeScript + Tailwind CSS**

- Server Actions natifs → appels Airtable/DocuSeal/Whop sans proxy séparé
- Route Handlers → webhooks n8n entrants simples
- `next/image` → assets optimisés mobile
- Vercel déploie en 0 config ; Coolify supporte aussi Next.js standalone si besoin
- Le SDK `@whop-apps/sdk` cible Next.js en premier

---

## 2. Base de données / Backend

| Critère | **Airtable** | Supabase (PostgreSQL) | PlanetScale (MySQL) | Firebase |
|---------|--------------|-----------------------|---------------------|---------|
| Vitesse de setup | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★☆ |
| Interface no-code | ★★★★★ | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ |
| Scalabilité | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★★★☆ |
| Coût à l'usage | ★★★☆☆ | ★★★★★ (free tier) | ★★★★☆ | ★★★☆☆ |
| Auth intégrée | ✗ | ✓ | ✗ | ✓ |
| Realtime | ✗ | ✓ | ✗ | ✓ |
| Intégration n8n | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ |
| Visualisation données | ★★★★★ | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ |

**✅ Verdict : Airtable (MVP) → Supabase à 1 000+ artisans**

- Airtable : l'équipe voit les leads en temps réel, n8n a un nœud natif excellent, limite 50 000 enregistrements (aucun risque à court terme)
- Supabase : meilleur long terme (auth, RLS, realtime), mais complexité inutile sur un funnel simple au départ

---

## 3. Paiement

| Critère | **Whop** | Stripe + Stripe Billing | Paddle |
|---------|---------|------------------------|--------|
| Setup | ★★★★★ | ★★★☆☆ | ★★★★☆ |
| Gestion abonnements | ★★★★★ | ★★★★★ | ★★★★★ |
| Portail client intégré | ★★★★★ | ★★★★☆ | ★★★★☆ |
| TVA Europe | ★★★☆☆ | ★★★☆☆ (manuel) | ★★★★★ (MoR) |
| Intégration n8n | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| SDK Next.js | ★★★★★ | ★★★★★ | ★★★☆☆ |
| Webhook fiabilité | ★★★★☆ | ★★★★★ | ★★★★☆ |
| Frais | ~3% + 0.30$ | 1.4% + 0.25€ (EU) | Merchant of Record |

**✅ Verdict : Whop**

Le modèle "0 € débité maintenant, CB enregistrée, prélèvement par livraison" est le cœur de métier de Whop. Pas besoin de coder la logique de facturation conditionnelle. Portail artisan inclus gratuitement.

---

## 4. E-signature

| Critère | **DocuSeal (self-hosted)** | Yousign | HelloSign | DocuSign |
|---------|--------------------------|---------|-----------|---------|
| Conformité eIDAS / France | ★★★★☆ | ★★★★★ | ★★★★☆ | ★★★★★ |
| Valeur légale FR | ✓ (simple) | ✓ (avancée) | ✓ (simple) | ✓ |
| Coût | Gratuit (self-hosted) | ~49€/mois | ~15$/mois | ~$$$ |
| API REST | ★★★★☆ | ★★★★★ | ★★★★☆ | ★★★★★ |
| Intégration n8n | ✓ communauté | ✓ officiel | ✓ | ✓ |
| Maintenance | ★★★☆☆ (self-hosted) | ★★★★★ | ★★★★★ | ★★★★★ |
| White-label | ★★★★★ | ★★★★☆ (payant) | ★★★★☆ | ★★★★☆ |

**✅ Verdict : DocuSeal self-hosted (fallback : Yousign)**

Déjà déployé sur `docuseal.paragon-ia.tech`, coût 0, 100 % personnalisable. La signature simple suffit légalement pour un contrat commercial B2B artisan. Si problèmes de fiabilité en prod → basculer sur Yousign (provider français, RGPD natif, 49€/mois).

---

## 5. Orchestration / Webhooks

| Critère | **n8n (self-hosted)** | Make | Zapier | Custom Next.js |
|---------|-----------------------|------|--------|----------------|
| Nœud Airtable | ★★★★★ | ★★★★★ | ★★★★☆ | Manuel |
| Nœud Whop | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | Manuel |
| Nœud DocuSeal | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | Manuel |
| Coût | Gratuit (self-hosted) | ~9€/mois | ~20$/mois | Dev time |
| Logique complexe | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★★★ |

**✅ Verdict : n8n self-hosted (Coolify)**

Déjà dans l'écosystème Paragon IA. Gratuit, intégrations natives Airtable + Whop, debugging visuel. Coolify simplifie les mises à jour des containers.

---

## 6. Hébergement

| Critère | **Vercel** | **Coolify** | Railway | Render |
|---------|-----------|------------|---------|--------|
| Next.js optimisé | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★☆ |
| Coût | Free → ~20$/mois | Serveur fixe (déjà payé) | ~5$/mois+ | ~7$/mois+ |
| Edge / CDN | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ |
| Preview deployments | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ |
| Simplicité | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |

**✅ Verdict : Vercel (Next.js) + Coolify (DocuSeal + n8n)**

Vercel = push-to-deploy, edge functions, previews par PR. Free tier suffisant jusqu'à ~100k req/mois. Coolify reste pour les services backend déjà en place — séparation propre des responsabilités.

---

## Stack Recommandé — Verdict Final

```
┌─────────────────────────────────────────────────────────┐
│                  STACK PARAGON IA                       │
├─────────────────┬───────────────────────────────────────┤
│ Frontend        │ Next.js 15 (App Router) + TypeScript  │
│                 │ + Tailwind CSS                        │
├─────────────────┼───────────────────────────────────────┤
│ Hébergement     │ Vercel (Next.js)                      │
│                 │ Coolify (DocuSeal + n8n)              │
├─────────────────┼───────────────────────────────────────┤
│ Base de données │ Airtable (MVP) → Supabase (scale)     │
├─────────────────┼───────────────────────────────────────┤
│ Paiement        │ Whop                                  │
├─────────────────┼───────────────────────────────────────┤
│ E-signature     │ DocuSeal self-hosted                  │
│                 │ (fallback : Yousign)                  │
├─────────────────┼───────────────────────────────────────┤
│ Orchestration   │ n8n self-hosted (Coolify)             │
├─────────────────┼───────────────────────────────────────┤
│ Auth (étape 4)  │ Whop Auth (MVP) → NextAuth si besoin  │
└─────────────────┴───────────────────────────────────────┘
```

### Pourquoi ce stack gagne

1. **Coût quasi-nul au démarrage** : Vercel free · Airtable free · Whop 0% tant que 0 vente · DocuSeal gratuit · n8n gratuit
2. **Vitesse de livraison** : Next.js + Vercel = push-to-deploy en 2 min, zéro DevOps frontend
3. **0 duplication** : n8n orchestre tout le flux (Airtable → Whop → DocuSeal) ; le frontend déclenche des webhooks, c'est tout
4. **Visibilité opérationnelle** : Airtable comme source de vérité — l'équipe voit chaque artisan inscrit en temps réel
5. **Scalabilité claire** : Airtable → Supabase quand le volume le justifie, sans toucher au frontend

### Point d'attention : Auth à l'étape 4

Deux options :
- **Option A — Whop Auth** *(recommandé MVP)* : l'artisan crée son compte Whop dans le funnel. Simple, 0 code d'auth à écrire. Lie l'identité à Whop.
- **Option B — NextAuth.js + Airtable** : plus de contrôle, portabilité totale. ~2 jours de dev supplémentaires.

→ Partir sur **Whop Auth** et migrer vers NextAuth si besoin d'indépendance plus tard.
