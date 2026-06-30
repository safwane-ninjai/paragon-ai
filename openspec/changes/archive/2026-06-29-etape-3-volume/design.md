## Context

Étape 3/6. `OnboardingHeader`, `ProgressBar`, `Footer` (via layout) déjà existants. Zustand store à étendre avec `selectedPlan`. Page client interactive (radio sélection).

## Goals / Non-Goals

**Goals:**
- Reproduire fidèlement la maquette : 3 cards radio, card Croissance pré-sélectionnée avec bordure or + checkmark vert, CTA dynamique
- Persister le plan choisi dans le store Zustand

**Non-Goals:**
- Appel API, paiement, validation côté serveur

## Decisions

### Structure de la page

```
app/onboarding/volume/page.tsx  (client)
  ├── OnboardingHeader (retour → /onboarding/plateforme)
  ├── ProgressBar step=3 stepName="Volume"
  ├── [Badge + H1 avec "volume" souligné or + sous-titre]
  ├── [Grid 3 PlanCard]
  ├── [Garantie de remplacement]
  └── [CTA pill dynamique → /onboarding/compte]
```

### Extension du store Zustand

Ajouter dans `lib/store/onboarding.ts` :
```typescript
selectedPlan: "starter" | "booster" | "croissance";
setSelectedPlan: (plan: "starter" | "booster" | "croissance") => void;
```
Valeur par défaut : `"croissance"`.

### PlanCard

Composant `components/onboarding/volume/PlanCard.tsx` :

**Props :** `id`, `name`, `subtitle` (Xdemandes/mois), `price` (75), `packPrice` (3 000 €), `features: string[]`, `badge?`, `recommended?`, `selected`, `onSelect`

**Styles état sélectionné :**
- Border : `border-2 border-gold`
- Checkmark top-right : cercle vert avec ✓ blanc (SVG ou emoji)
- 4e feature en or pour Croissance : "Économisez 20 € par demande vs Starter"

**Styles état non-sélectionné :**
- Border : `border border-gray-200`
- Radio vide top-right : cercle gris outline

**Prix :**
- Chiffre `text-5xl font-black text-navy`
- "€" en `text-2xl font-bold align-top`
- "TTC / demande" en `text-xs text-gray-400`
- "Pack mensuel : X € TTC" en `text-sm font-bold text-navy`

**Features :**
- Checkmark ✓ en or `text-gold`
- Mots en gras dans les items (ex. "exclusive", "qualifiées", "remplacée gratuitement")

### Données des 3 plans

```typescript
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "20 demandes de rendez-vous qualifiés / mois",
    price: 95,
    packPrice: "1 900",
    features: [
      { text: "Zone", bold: "exclusive" },
      { text: "Demandes", bold: "qualifiées", suffix: " · adresse vérifiée" },
      { text: "Non conforme = ", bold: "remplacée gratuitement" },
      { text: "Paiement à la livraison" },
    ],
  },
  {
    id: "booster",
    name: "Booster",
    subtitle: "30 demandes de rendez-vous qualifiés / mois",
    price: 85,
    packPrice: "2 550",
    features: [ /* identiques à Starter */ ],
  },
  {
    id: "croissance",
    name: "Croissance",
    subtitle: "40 demandes de rendez-vous qualifiés / mois",
    price: 75,
    packPrice: "3 000",
    badge: "★ RECOMMANDÉ · MEILLEUR TARIF",
    features: [
      { text: "Zone", bold: "exclusive" },
      { text: "Demandes", bold: "qualifiées", suffix: " · adresse vérifiée" },
      { text: "Non conforme = ", bold: "remplacée gratuitement" },
      { text: "Économisez 20 € par demande", suffix: " vs Starter", gold: true },
    ],
  },
];
```

### H1 "volume" souligné

```tsx
<h1>Choisissez votre{" "}
  <span className="relative inline-block">
    volume
    <span className="absolute left-0 right-0 h-[3px] bg-gold rounded-full" style={{ bottom: "-2px" }} />
  </span>.
</h1>
```

### CTA dynamique

```tsx
const planLabels = { starter: "Starter", booster: "Booster", croissance: "Croissance" };
<Link href="/onboarding/compte">Continuer avec {planLabels[selectedPlan]} →</Link>
```

### Garantie de remplacement

Ligne centrée entre les cards et le CTA :
`✓ Garantie de remplacement · Non conforme = remplacée gratuitement. Vous ne payez que les demandes livrées.`
— "Garantie de remplacement" en or, "remplacée gratuitement" en bold navy.

## Risks / Trade-offs

- **Features items avec inline bold** : JSX inline dans les données — acceptable pour du hardcodé
- **Grid mobile** : 3 cards empilées sur mobile (grid-cols-1), côte à côte sur desktop (grid-cols-3)
