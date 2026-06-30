## Context

Étape 1/6 du tunnel d'onboarding Paragon IA. Le projet Next.js 16 + Tailwind v4 est initialisé. La charte visuelle est établie (`#FAF7F2` crème, `#C9A84C` or, `#1A1A2E` navy, Playfair Display pour titres). La route `/onboarding/ciblage` doit être créée ainsi qu'un layout partagé pour toutes les étapes du funnel. Mobile first.

## Goals / Non-Goals

**Goals:**
- Reproduire fidèlement la maquette fournie : header + barre de progression + formulaire complet + bouton CTA désactivé
- Widget de zone : SVG animé (cercles concentriques + dots aléatoires + point central doré)
- Stats dynamiques liées aux valeurs du formulaire (rayon km → ~propriétaires calculés)
- Validation formulaire : bouton "Continuer →" activé uniquement si ville + type prospect + ≥1 chantier
- Persistance de l'état dans un store global (Zustand) pour ne pas perdre les données si retour arrière

**Non-Goals:**
- Appel API géolocalisation réelle
- Calcul du nombre de propriétaires via API externe (heuristique locale)
- Tests automatisés

## Decisions

### Layout partagé `app/onboarding/layout.tsx`

Tous les steps du funnel partagent :
- Header : flèche retour (`<`) gauche + logo PARAGON AI centré
- Barre de progression : trait doré animé sous le logo, `ÉTAPE X/6` + nom de l'étape
- Footer : liens légaux + copyright

Le layout reçoit `step` et `stepName` via props depuis chaque page enfant. Pour éviter la complexité des Server Components, on passe via un contexte client léger.

### Store global Zustand

`lib/store/onboarding.ts` — stocke tout l'état inter-étapes :

```ts
type OnboardingStore = {
  ciblage: {
    ville: string
    pays: string
    rayon: number       // km
    codesPostaux: string
    typeProspect: 'maison' | 'appartement' | 'les-deux' | null
    typesChantier: string[]
  }
  // étapes futures...
}
```

Zustand persist avec `localStorage` → survit aux rechargements de page.

### Widget de zone (ZoneWidget)

SVG 200×200px avec :
- Cercle central plein doré (point de la ville)
- 3 cercles concentriques en pointillés, couleur or atténué
- ~12 dots aléatoires positionnés à l'intérieur des cercles (positions fixes, pas random à chaque render)
- Animation : `animate-ping` discret sur le point central

Les stats sous le widget (`30 km de rayon · ~1200 · 100%`) sont calculées :
- Rayon : valeur du dropdown
- Propriétaires estimés : `rayon² × π × 0.4` (densité simplifiée) → arrondi
- Zone exclusive : toujours "100%"

### Formulaire — sections

**LOCALISATION**
- `ville` : `<input type="text">` avec placeholder "Ex : Lyon, Bordeaux, Nantes..."
- `pays` : `<select>` avec 🇫🇷 France (seul choix MVP)
- `rayon` : `<select>` avec options 10 / 20 / 30 / 50 / 100 km (défaut 30)
- `codesPostaux` : `<textarea>` optionnel, placeholder "Ex : 69001, 69002, 69003..."

**VOS PROSPECTS CIBLES**
- 3 radio-cards avec cercle radio à gauche, titre + sous-titre
- Sélectionnée : bordure or + fond or très léger + checkmark vert rempli
- Non sélectionnée : bordure gris clair, fond blanc

**TYPE DE CHANTIER**
- `<h3>` gold "— MENUISERIE & EXTÉRIEUR —" + "— RÉNOVATION ÉNERGÉTIQUE —"
- Pill-toggles : fond blanc / bordure grise → sélectionné : fond navy / texte blanc (ou fond or / texte navy selon maquette exacte)
- Multi-sélection, au moins 1 requis pour valider

### Validation et CTA

```ts
const isValid = ville.trim() !== '' && typeProspect !== null && typesChantier.length > 0
```

Bouton "Continuer →" :
- Désactivé : `bg-gray-400 cursor-not-allowed opacity-60`
- Activé : `bg-navy text-white hover:opacity-90`
- Full-width, arrondi, en bas de page (fixe sur mobile via `sticky bottom-0`)

## Risks / Trade-offs

- **ZoneWidget SVG** → Les dots sont hardcodés (positions fixes) pour éviter les hydration mismatches React. Acceptable pour MVP.
- **Zustand persist** → Si l'utilisateur vide le localStorage, l'état est perdu. Acceptable (MVP, pas de backend session).
- **Calcul propriétaires** → La formule simplifiée (`r² × π × 0.4`) ne correspond pas à la réalité démographique locale. Acceptable pour l'affichage marketing (arrondi à la centaine près).
- **Layout step indicator** → Les étapes 2-6 n'existent pas encore ; le bouton "Continuer" pointe vers `/onboarding/plateforme` qui retournera 404 jusqu'à l'implémentation de l'étape 2.

## Migration Plan

1. Créer `lib/store/onboarding.ts` (Zustand)
2. Installer Zustand : `npm install zustand`
3. Créer `app/onboarding/layout.tsx` avec `OnboardingHeader` + `ProgressBar`
4. Créer `app/onboarding/ciblage/page.tsx` et les composants enfants
5. Tester mobile 375px + desktop 1280px
6. Vérifier que la validation CTA fonctionne correctement
