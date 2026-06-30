## Context

Étape 4/6. `OnboardingHeader`, `ProgressBar`, `Footer` (layout) déjà existants. Zustand store à étendre avec les champs du compte.

## Goals / Non-Goals

**Goals:**
- Reproduire fidèlement la maquette : 3 feature badges, carte blanche avec 2 sections numérotées, CTA vert
- Validation locale, CTA disabled si invalide

**Non-Goals:**
- Appel API, vérification serveur, gestion d'erreur réseau

## Decisions

### Structure de la page

```
app/onboarding/compte/page.tsx  (client)
  ├── OnboardingHeader (retour → /onboarding/volume)
  ├── ProgressBar step=4 stepName="Compte"
  ├── [Badge + H1 + sous-titre + 3 feature badges]
  └── [Carte formulaire blanche]
       ├── Section 01 — Vos coordonnées
       │    ├── Nom de l'entreprise (full width)
       │    ├── Prénom + Nom (2 colonnes)
       │    ├── Email professionnel (full width)
       │    └── Téléphone (full width)
       ├── Section 02 — Sécurisez votre accès
       │    └── Mot de passe (full width + eye toggle)
       ├── CTA vert "Créer mon compte →" (disabled si invalide)
       └── Mention CGU
```

### Extension du store Zustand

Ajouter dans `lib/store/onboarding.ts` :
```typescript
compte: {
  nomEntreprise: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  motDePasse: string;
};
setCompte: (partial: Partial<CompteState>) => void;
```

### 3 feature badges (ligne horizontale)

Bande crème/beige claire (`bg-white border border-gray-100 rounded-xl`) contenant 3 items :
| Icône | Titre | Sous-titre |
|-------|-------|-----------|
| 💬 (carré ambre) | Plateforme dédiée | Suivi en temps réel |
| 💬 (carré ambre) | Email & plateforme | Notif chaque demande |
| ✓ (carré ambre) | Agent dédié | Contact sous 1h |

Chaque item : icône SVG/emoji dans carré `bg-amber-100 text-amber-700 rounded-lg w-8 h-8` + titre `text-xs font-semibold text-navy` + sous-titre `text-[10px] text-gray-400`.
Les 3 items sont séparés par des `border-r border-gray-100`.

### Sections numérotées

Badge numéro : carré `bg-gold text-white text-xs font-bold rounded-lg w-6 h-6` avec "01" / "02" dedans.
Section header : badge + titre bold + sous-titre gris, sur une ligne.

### Inputs

Style unifié : `w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-navy placeholder:text-gray-300 focus:outline-none focus:border-gold transition-colors`

Champs Prénom + Nom : `grid grid-cols-2 gap-3`.

Mot de passe : `relative` wrapper, input + bouton eye SVG `absolute right-3 top-1/2 -translate-y-1/2 text-gray-400`.

### CTA

```tsx
// isValid = nomEntreprise && prenom && nom && email && telephone && motDePasse.length >= 8
<button
  disabled={!isValid}
  className={`w-full py-4 rounded-2xl font-semibold text-white transition-all ${
    isValid ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"
  }`}
>
  Créer mon compte →
</button>
```

### H1 "compte" souligné

```tsx
<h1>Activez votre{" "}
  <span className="relative inline-block">
    compte
    <span className="absolute left-0 right-0 h-[3px] bg-gold rounded-full" style={{ bottom: "-2px" }} />
  </span>.
</h1>
```

## Risks / Trade-offs

- **Mot de passe en Zustand** : stocké en clair localement — acceptable car temporaire (jusqu'à soumission Airtable étape 5). Aucune donnée ne transite côté serveur à cette étape.
- **Pas de vérification email format** : simplification volontaire pour réduire la friction
