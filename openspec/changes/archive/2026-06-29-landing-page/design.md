## Context

Page d'accueil marketing statique pour Paragon IA. Le repo est neuf (zéro code existant). Design imposé par maquette fournie : fond beige/crème `#FAF7F2`, accent or `#C9A84C`, typo serif bold pour les titres, sans-serif pour le corps. Logo PNG fourni (`téléchargement.png` → `public/logo-paragon.png`). Mobile first.

## Goals / Non-Goals

**Goals:**
- Reproduire fidèlement la maquette fournie (layout, couleurs, typographie, composants)
- Page entièrement statique (zéro appel API, zéro état serveur)
- Performance < 2 s (images optimisées avec `next/image`, pas de JS lourd)
- Mobile first : tester d'abord le rendu mobile, puis desktop

**Non-Goals:**
- Internationalisation, dark mode, animations complexes
- Intégrations tierces (Whop, Airtable, n8n) — pas de formulaire sur cette page
- Tests automatisés (MVP)

## Decisions

### Structure de la page (`app/page.tsx`)

Composants découpés par section, tous dans `components/landing/` :

| Composant | Rôle |
|-----------|------|
| `Header` | Logo centré en haut |
| `HeroSection` | 2 colonnes desktop (accroche + CTA gauche, DashboardPreview droite) |
| `DashboardPreview` | Carte blanche simulant le dashboard artisan (rendez-vous, statuts) |
| `SocialProofTicker` | Bandeau animé "712 demandes générées ce mois-ci" (dot vert pulsant) |
| `StatsBar` | 4 stats en or : 56 000+ RDV · 5+ ans · 17 secteurs · 4,9/5 ★ |
| `HowItWorks` | 3 cartes numérotées avec icônes (définir zone, qualifier, closer) |
| `Footer` | Liens légaux + copyright |

### Typographie

- Titres (`h1`, `h2`) : `font-serif font-bold` — Tailwind `font-serif` (Georgia / serif natif navigateur, assez proche de la maquette) ou import Google Fonts "Playfair Display" si besoin de précision
- Corps : `font-sans` (Inter ou système)
- Labels accent : `uppercase tracking-widest text-xs` en or

### Palette Tailwind (custom dans `tailwind.config.ts`)

```ts
colors: {
  cream: '#FAF7F2',
  gold:  '#C9A84C',
  navy:  '#1A1A2E',
}
```

### Logo

Fichier PNG fourni copié dans `public/logo-paragon.png`. Rendu via `next/image` avec `priority` (above the fold). Le logo est "PARAGON" en navy bold + "AI" doré avec soulignement diagonal.

### DashboardPreview

Carte blanche avec shadow, liste de 5 rendez-vous (nom, type travaux, heure, statut coloré : Confirmé vert / Nouveau orange / À rappeler gris). Données hardcodées (maquette). Notification flottante "Nouvelle demande qualifiée" en haut de la carte.

### SocialProofTicker

`<div>` avec dot vert animé (`animate-pulse`) et compteur fixe "712". Pas de fetch dynamique (MVP).

### CTA

Bouton `<Link href="/onboarding/ciblage">` noir arrondi "Démarrer maintenant →". Hover : légère opacité. La route `/onboarding/ciblage` n'existe pas encore (étape suivante).

## Risks / Trade-offs

- **Font serif** → Si `font-serif` système ne correspond pas exactement à la maquette, ajouter Playfair Display via `next/font/google` (1 ligne, pas de perf impact)
- **DashboardPreview données hardcodées** → Acceptable pour MVP ; marquées clairement comme démo dans le code
- **Logo PNG vs SVG** → PNG fourni, `next/image` optimise automatiquement en WebP ; pas de risque flou si fourni en haute résolution

## Migration Plan

1. Initialiser le projet Next.js 15 (`create-next-app`) si pas encore fait
2. Copier le logo dans `public/logo-paragon.png`
3. Configurer `tailwind.config.ts` avec la palette custom
4. Créer les composants dans l'ordre : `Header` → `HeroSection` + `DashboardPreview` → `SocialProofTicker` → `StatsBar` → `HowItWorks` → `Footer`
5. Assembler dans `app/page.tsx`
6. Tester mobile (375px) puis desktop (1280px)

Rollback : supprimer `app/page.tsx` et les composants — aucun impact sur le reste du projet.

## Open Questions

- La font serif exacte de la maquette n'est pas spécifiée — partir sur Playfair Display (proche visuellement) sauf directive contraire.
- Le compteur "712" est-il dynamique à terme ? Pour l'instant hardcodé.
