## ADDED Requirements

### Requirement: En-tête de l'étape 4
La page SHALL afficher la barre de progression "ÉTAPE 4/6 · Compte", le badge "● DERNIÈRE LIGNE DROITE · 30 SECONDES", le H1 avec "compte" souligné en or, le sous-titre et les 3 feature badges.

#### Scenario: Progression étape 4
- **WHEN** l'utilisateur accède à `/onboarding/compte`
- **THEN** "ÉTAPE 4 / 6" et "Compte" sont affichés, le trait doré couvre ~67% de la largeur

#### Scenario: 3 feature badges visibles
- **WHEN** la page est chargée
- **THEN** "Plateforme dédiée", "Email & plateforme" et "Agent dédié" sont affichés avec icône et sous-titre

---

### Requirement: Formulaire coordonnées (section 01)
La page SHALL afficher une section "Vos coordonnées" avec 5 champs : nom entreprise, prénom, nom, email, téléphone.

#### Scenario: Badge numéroté "01"
- **WHEN** le visiteur voit le formulaire
- **THEN** un badge carré doré avec "01" est visible à gauche du titre "Vos coordonnées"

#### Scenario: Champs Prénom + Nom côte à côte
- **WHEN** la page est affichée sur ≥ 640px
- **THEN** les champs Prénom et Nom sont en 2 colonnes

---

### Requirement: Formulaire mot de passe (section 02)
La page SHALL afficher une section "Sécurisez votre accès" avec un champ mot de passe et un toggle pour afficher/masquer.

#### Scenario: Toggle visibilité mot de passe
- **WHEN** l'utilisateur clique sur l'icône œil
- **THEN** le type du champ bascule entre "password" et "text"

---

### Requirement: CTA conditionnel et navigation
La page SHALL afficher un bouton vert "Créer mon compte →" désactivé tant que tous les champs ne sont pas remplis et le mot de passe < 8 caractères.

#### Scenario: CTA désactivé par défaut
- **WHEN** la page est chargée (champs vides)
- **THEN** le bouton "Créer mon compte →" est gris et non cliquable

#### Scenario: CTA activé quand formulaire complet
- **WHEN** tous les champs sont remplis et le mot de passe ≥ 8 caractères
- **THEN** le bouton devient vert et cliquable

#### Scenario: Navigation vers étape 5
- **WHEN** l'utilisateur clique "Créer mon compte →" (formulaire valide)
- **THEN** il est redirigé vers `/onboarding/paiement`
