## ADDED Requirements

### Requirement: Badge et titre de l'étape
La page SHALL afficher un badge pill "● VOTRE CIBLE" (dot doré) et le titre H1 "Ciblez votre zone et vos prospects." en Playfair Display bold, ainsi qu'un sous-titre descriptif.

#### Scenario: Badge et titre visibles au chargement
- **WHEN** l'utilisateur accède à `/onboarding/ciblage`
- **THEN** le badge "VOTRE CIBLE" avec dot doré et le titre H1 sont affichés avant tout formulaire

---

### Requirement: Widget de visualisation de zone
La page SHALL afficher un widget SVG représentant une zone radar avec cercles concentriques, dots de prospects, et point central doré, ainsi que 3 stats dynamiques : km de rayon · ~nb propriétaires ciblés · 100% zone exclusive.

#### Scenario: Affichage initial du widget avec valeurs par défaut
- **WHEN** l'utilisateur arrive sur la page (rayon par défaut 30 km)
- **THEN** le widget affiche "30 KM DE RAYON", "~1200 PROPRIÉTAIRES CIBLÉS", "100% ZONE EXCLUSIVE" (en or)

#### Scenario: Mise à jour dynamique lors du changement de rayon
- **WHEN** l'utilisateur change le rayon de 30 à 50 km
- **THEN** les stats "KM DE RAYON" et "~PROPRIÉTAIRES CIBLÉS" se mettent à jour immédiatement sans rechargement de page

#### Scenario: "100% ZONE EXCLUSIVE" toujours affiché en or
- **WHEN** quelle que soit la valeur du rayon
- **THEN** "100% ZONE EXCLUSIVE" reste affiché en doré `#C9A84C`

---

### Requirement: Section LOCALISATION
La page SHALL afficher un formulaire de localisation avec : champ ville (texte libre), dropdown pays (France par défaut), dropdown rayon en km (10/20/30/50/100, défaut 30), et textarea optionnelle pour codes postaux prioritaires.

#### Scenario: Champ ville vide → bouton Continuer désactivé
- **WHEN** l'utilisateur n'a pas renseigné la ville
- **THEN** le bouton "Continuer →" reste désactivé (grisé, cursor-not-allowed)

#### Scenario: Changement du rayon met à jour le widget
- **WHEN** l'utilisateur sélectionne "50 km" dans le dropdown rayon
- **THEN** le widget et les stats se mettent à jour instantanément

#### Scenario: Codes postaux sont optionnels
- **WHEN** l'utilisateur laisse le textarea codes postaux vide
- **THEN** ce champ n'est pas un critère de validation du bouton "Continuer"

---

### Requirement: Section VOS PROSPECTS CIBLES
La page SHALL afficher 3 radio-cards exclusives : "Propriétaires de maison" (sélectionné par défaut, sous-titre "Maison individuelle — meilleur taux de conversion"), "Propriétaires d'appartement" (sous-titre "Appartement en copropriété"), "Les deux" (sous-titre "Maison + appartement").

#### Scenario: Sélection d'une radio-card
- **WHEN** l'utilisateur clique sur une radio-card
- **THEN** la card sélectionnée prend une bordure dorée + fond or très léger + checkmark vert rempli, les autres reviennent à l'état non-sélectionné

#### Scenario: État initial avec "Propriétaires de maison" sélectionné
- **WHEN** l'utilisateur arrive sur la page pour la première fois
- **THEN** "Propriétaires de maison" est pré-sélectionné (bordure or + checkmark vert)

#### Scenario: Aucun type prospect → bouton désactivé
- **WHEN** l'utilisateur désélectionne tous les types (si possible)
- **THEN** le bouton "Continuer →" est désactivé

---

### Requirement: Section TYPE DE CHANTIER
La page SHALL afficher deux groupes de pill-toggles multi-sélection : "MENUISERIE & EXTÉRIEUR" (Menuiserie, Pergola, Porte-fenêtre, Véranda, Portail, Store/Volet, Autres) et "RÉNOVATION ÉNERGÉTIQUE" (Pompe à chaleur, Panneaux photovoltaïques, Autres). Au moins 1 pill doit être sélectionné pour valider.

#### Scenario: Sélection d'un pill-toggle
- **WHEN** l'utilisateur clique sur "Pergola"
- **THEN** le pill passe en état actif (fond navy + texte blanc) et reste sélectionné si l'utilisateur clique ailleurs

#### Scenario: Multi-sélection entre catégories
- **WHEN** l'utilisateur sélectionne "Pergola" ET "Pompe à chaleur"
- **THEN** les deux pills restent actifs simultanément (multi-sélection cross-catégories autorisée)

#### Scenario: Aucun type de chantier sélectionné → bouton désactivé
- **WHEN** aucun pill n'est sélectionné
- **THEN** le bouton "Continuer →" est désactivé

---

### Requirement: Validation et bouton Continuer
Le bouton "Continuer →" SHALL être désactivé tant que les 3 conditions suivantes ne sont pas toutes remplies : (1) ville non vide, (2) type de prospect sélectionné, (3) au moins 1 type de chantier sélectionné.

#### Scenario: Formulaire complet → bouton activé
- **WHEN** ville renseignée + type prospect sélectionné + ≥1 chantier sélectionné
- **THEN** le bouton "Continuer →" devient cliquable (fond navy, texte blanc, hover opacity)

#### Scenario: Navigation vers étape 2
- **WHEN** l'utilisateur clique sur "Continuer →" avec le formulaire valide
- **THEN** il est redirigé vers `/onboarding/plateforme` et les données de ciblage sont persistées dans le store Zustand

---

### Requirement: Persistance de l'état dans le store Zustand
Les données saisies à l'étape 1 SHALL être stockées dans le store Zustand avec persist (localStorage) pour survivre aux rechargements et navigations inter-étapes.

#### Scenario: Retour à l'étape 1 après navigation
- **WHEN** l'utilisateur va à l'étape 2 puis revient en arrière
- **THEN** tous les champs de l'étape 1 sont pré-remplis avec les valeurs précédemment saisies

#### Scenario: Rechargement de page
- **WHEN** l'utilisateur recharge la page sur `/onboarding/ciblage`
- **THEN** les valeurs précédemment saisies sont restaurées depuis le localStorage

---

### Requirement: Responsive mobile first
La page SHALL être entièrement fonctionnelle et lisible sur mobile 375px : formulaire pleine largeur, pills en flex-wrap, radio-cards empilées, bouton "Continuer →" sticky en bas sur mobile.

#### Scenario: Bouton sticky sur mobile
- **WHEN** la page est affichée sur 375px
- **THEN** le bouton "Continuer →" est collé en bas de l'écran (sticky bottom) pour rester accessible sans scroll

#### Scenario: Pills flex-wrap sur mobile
- **WHEN** la liste de pills est affichée sur 375px
- **THEN** les pills s'enroulent sur plusieurs lignes sans débordement horizontal
