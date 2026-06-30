## 1. Store Zustand

- [x] 1.1 Étendre `lib/store/onboarding.ts` : ajouter `selectedPlan: "starter" | "booster" | "croissance"` (default `"croissance"`) et `setSelectedPlan`

## 2. Composant PlanCard

- [x] 2.1 Créer `components/onboarding/volume/PlanCard.tsx` : card blanche, bordure or si selected, radio/checkmark top-right
- [x] 2.2 Ajouter badge "★ RECOMMANDÉ · MEILLEUR TARIF" beige/ambre (prop `badge?`)
- [x] 2.3 Afficher prix : chiffre `text-5xl font-black`, "€ TTC / demande" en small, "Pack mensuel : X € TTC" en bold
- [x] 2.4 Afficher liste features : checkmark ✓ doré, texte avec mots en gras inline, 4e item de Croissance en or
- [x] 2.5 Checkmark sélection top-right : cercle vert ✓ si selected, cercle gris vide si non-selected
- [x] 2.6 `onClick` → appelle `setSelectedPlan` du store

## 3. Page assemblage

- [x] 3.1 Créer `app/onboarding/volume/page.tsx` (client) : `OnboardingHeader` (retour → `/onboarding/plateforme`), `ProgressBar` step=3 stepName="Volume"
- [x] 3.2 Badge "● SANS ENGAGEMENT DE DURÉE" + H1 avec "volume" souligné doré + sous-titre avec mots en gras
- [x] 3.3 Grid 3 colonnes desktop / 1 colonne mobile avec les 3 `PlanCard`
- [x] 3.4 Mention garantie entre les cards et le CTA
- [x] 3.5 CTA pill `rounded-full bg-navy` plein largeur : "Continuer avec [plan] →" dynamique → `Link href="/onboarding/compte"`

## 4. Vérification

- [x] 4.1 Croissance pré-sélectionné au chargement, CTA = "Continuer avec Croissance →"
- [x] 4.2 Clic sur Starter : bordure or passe sur Starter, CTA = "Continuer avec Starter →"
- [x] 4.3 Vérifier mobile 375px : cards empilées, CTA full-width
