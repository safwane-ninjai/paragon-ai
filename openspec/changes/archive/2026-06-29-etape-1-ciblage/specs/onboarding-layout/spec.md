## ADDED Requirements

### Requirement: Header du funnel avec navigation
Le layout d'onboarding SHALL afficher un header avec : une flèche retour `<` à gauche (lien vers `/`), le logo PARAGON IA centré via `next/image`, et aucun autre élément.

#### Scenario: Flèche retour visible et fonctionnelle
- **WHEN** l'utilisateur est sur n'importe quelle étape du funnel
- **THEN** la flèche `<` est cliquable et redirige vers `/` (landing page)

#### Scenario: Logo centré dans le header
- **WHEN** le header est affiché
- **THEN** le logo PARAGON IA est centré horizontalement, même hauteur que sur la landing page

---

### Requirement: Barre de progression X/6
Le layout SHALL afficher sous le header une barre de progression indiquant l'étape courante sur 6, avec un trait doré animé de largeur proportionnelle et le label "ÉTAPE X/6 · NomÉtape".

#### Scenario: Progression étape 1 correcte
- **WHEN** l'utilisateur est à l'étape 1 (Ciblage)
- **THEN** la barre affiche "ÉTAPE 1 / 6" et "Ciblage", le trait doré couvre ~16% de la largeur totale

#### Scenario: Labels de l'étape visible
- **WHEN** la barre de progression est affichée
- **THEN** "ÉTAPE X / 6" est en petites majuscules dorées et le nom de l'étape en texte navy

---

### Requirement: Footer légal dans le funnel
Le layout SHALL inclure un footer avec les liens "Mentions Légales", "Politique de Confidentialité", "CGV" et le copyright "© 2026 Paragon IA · Tous droits réservés."

#### Scenario: Footer visible en bas de chaque étape
- **WHEN** l'utilisateur fait défiler jusqu'en bas d'une étape
- **THEN** le footer légal est affiché de manière identique à la landing page
