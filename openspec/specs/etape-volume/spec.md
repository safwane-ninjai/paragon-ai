## ADDED Requirements

### Requirement: En-tête et titre de l'étape 3
La page SHALL afficher la barre de progression "ÉTAPE 3/6 · Volume", le badge "● SANS ENGAGEMENT DE DURÉE", le H1 avec "volume" souligné en or, et le sous-titre avec mots clés en gras.

#### Scenario: Progression étape 3
- **WHEN** l'utilisateur accède à `/onboarding/volume`
- **THEN** la barre de progression affiche "ÉTAPE 3 / 6" et "Volume", le trait doré couvre 50% de la largeur

#### Scenario: H1 avec soulignement doré
- **WHEN** la page est chargée
- **THEN** le mot "volume" dans le H1 a une barre dorée horizontale en dessous

---

### Requirement: 3 cards de plans sélectionnables
La page SHALL afficher 3 plans (Starter, Booster, Croissance) sous forme de cards radio interactives. Croissance est pré-sélectionné.

#### Scenario: Plan Croissance pré-sélectionné
- **WHEN** l'utilisateur arrive sur la page pour la première fois
- **THEN** la card "Croissance" a une bordure dorée et un checkmark vert en haut à droite

#### Scenario: Sélection d'un autre plan
- **WHEN** l'utilisateur clique sur "Starter" ou "Booster"
- **THEN** la card cliquée obtient la bordure dorée + checkmark, l'ancienne perd sa sélection, et le CTA se met à jour

#### Scenario: Badge RECOMMANDÉ sur Croissance
- **WHEN** le visiteur voit les cards
- **THEN** "★ RECOMMANDÉ · MEILLEUR TARIF" est affiché en badge beige/ambre en haut de la card Croissance

#### Scenario: Feature "Économisez" en or sur Croissance
- **WHEN** le visiteur voit la liste des features de Croissance
- **THEN** "Économisez 20 € par demande vs Starter" est affiché en couleur dorée

---

### Requirement: CTA dynamique selon plan sélectionné
La page SHALL afficher un bouton CTA pill noir dont le texte reflète le plan choisi.

#### Scenario: CTA par défaut
- **WHEN** la page est chargée (Croissance sélectionné par défaut)
- **THEN** le bouton affiche "Continuer avec Croissance →"

#### Scenario: CTA mis à jour après sélection
- **WHEN** l'utilisateur sélectionne "Starter"
- **THEN** le bouton affiche "Continuer avec Starter →"

#### Scenario: Navigation vers étape 4
- **WHEN** l'utilisateur clique le CTA
- **THEN** il est redirigé vers `/onboarding/compte`

---

### Requirement: Garantie de remplacement
La page SHALL afficher la mention de garantie entre les cards et le CTA.

#### Scenario: Garantie visible
- **WHEN** le visiteur voit la page
- **THEN** "✓ Garantie de remplacement" en or et "Non conforme = remplacée gratuitement. Vous ne payez que les demandes livrées." sont visibles sous les cards
