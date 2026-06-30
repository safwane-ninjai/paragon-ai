## Context

Étape 5/6. `OnboardingHeader`, `ProgressBar`, `Footer` (layout) existants. Package `@whop/checkout` à installer. Plan IDs en `.env.local`.

## Goals / Non-Goals

**Goals:**
- Reproduire le wrapper de la maquette : badges sécurité, info box, embed Whop, 3 reassurance cards
- Pré-remplir l'email depuis le store Zustand
- Mapper `selectedPlan` → plan ID Whop via env vars

**Non-Goals:**
- Personnaliser le styling interne du widget Whop (impossible sans leur API branding)
- Gestion webhook (côté n8n, pas Next.js)

## Decisions

### Structure de la page

```
app/onboarding/paiement/page.tsx  (client)
  ├── OnboardingHeader (retour → /onboarding/compte)
  ├── ProgressBar step=5 stepName="Inscription"
  ├── [Badge + H1 + sous-titre]
  ├── [Carte principale blanche]
  │    ├── Bande sécurité (SSL 256 / PCI-DSS / Sécurisé Whop)
  │    ├── Info box "Pourquoi votre carte maintenant ?"
  │    └── WhopCheckoutEmbed
  └── [3 reassurance cards]
```

### Installation

```bash
npm install @whop/checkout
```

### Plan ID mapping

```typescript
const PLAN_IDS: Record<string, string | undefined> = {
  starter: process.env.NEXT_PUBLIC_WHOP_PLAN_ID_STARTER,
  booster: process.env.NEXT_PUBLIC_WHOP_PLAN_ID_BOOSTER,
  croissance: process.env.NEXT_PUBLIC_WHOP_PLAN_ID_CROISSANCE,
};
const planId = PLAN_IDS[selectedPlan];
```

Si `planId` undefined → afficher message "Configuration manquante. Contactez le support."

### WhopCheckoutEmbed

```tsx
import { WhopCheckoutEmbed } from "@whop/checkout/react";

<WhopCheckoutEmbed
  planId={planId}
  prefill={{ email: compte.email }}
  returnUrl={`${window.location.origin}/onboarding/contrat`}
  theme="light"
/>
```

Le widget rend nativement le formulaire carte (numéro, expiry, CVC, billing). On ne reconstruit pas les inputs carte en JSX — ce serait une fausse sécurité et une violation PCI potentielle.

### Bande sécurité (3 badges inline)

```
🔒 SSL 256 bits  |  🔒 PCI-DSS niveau 1  |  ✓ Sécurisé par Whop
```
Background `bg-gray-50 rounded-xl`, texte `text-xs text-gray-500`, séparés par `border-r border-gray-200`.

### Info box "Pourquoi votre carte maintenant ?"

Fond `bg-amber-50 border border-amber-100 rounded-xl`, icône ℹ️ ambre.
Texte : "Pour prélever automatiquement chaque demande de rendez-vous qualifiée livrée, sans rien ressaisir. **0 € de débit aujourd'hui**, on enregistre juste votre carte."

### H1 "inscription" souligné

```tsx
<h1>Validez votre{" "}
  <span className="relative inline-block">
    inscription
    <span className="absolute left-0 right-0 h-[3px] bg-gold rounded-full" style={{ bottom: "-2px" }} />
  </span>.
</h1>
```

### 3 reassurance cards (bas de page)

| Icône | Titre | Sous-titre |
|-------|-------|-----------|
| 💰 (ambre) | 0 € aujourd'hui | Prélevé uniquement par demande livrée. |
| 🔒 (ambre) | Sécurisé par Whop | Whop chiffre votre carte. Jamais stockée chez Paragon. |
| 🔄 (ambre) | Remplacement gratuit | Non conforme = remplacée sans frais. |

Style identique aux feature badges de l'étape compte.

### .env.local à créer

```env
NEXT_PUBLIC_WHOP_PLAN_ID_STARTER=plan_XXXXXXXXX
NEXT_PUBLIC_WHOP_PLAN_ID_BOOSTER=plan_XXXXXXXXX
NEXT_PUBLIC_WHOP_PLAN_ID_CROISSANCE=plan_XXXXXXXXX
```

## Risks / Trade-offs

- **Widget Whop hors contrôle visuel** : le formulaire carte est rendu par Whop. Le `theme="light"` s'approche du design crème mais une personnalisation fine nécessite le Checkout Branding de Whop (dans leur dashboard).
- **NEXT_PUBLIC_ plan IDs** : exposés côté client, intentionnel et sécurisé (identifiants publics comme Stripe publishable key).
- **returnUrl avec `window.location.origin`** : utiliser `useEffect` pour éviter le SSR mismatch.
