## ADDED Requirements

### Requirement: En-tête et titre de l'étape 2
La page SHALL afficher la barre de progression "ÉTAPE 2/6 · Votre plateforme", le badge "● VOTRE FUTURE PLATEFORME", le titre H1 et le sous-titre avec mots en gras.

#### Scenario: Progression étape 2 affichée
- **WHEN** l'utilisateur accède à `/onboarding/plateforme`
- **THEN** la barre de progression affiche "ÉTAPE 2 / 6" et "Votre plateforme", le trait doré couvre ~33% de la largeur

#### Scenario: Titre et sous-titre visibles
- **WHEN** la page est chargée
- **THEN** le H1 "Des demandes de rendez-vous qualifiés, prêtes à être traitées." est affiché en serif bold, et le sous-titre met en gras "nom du prospect", "email", "adresse", "projet"

---

### Requirement: Mockup dashboard navigateur
La page SHALL afficher une fenêtre de navigateur simulée avec l'URL "app.paragon-ia.com", un header dark, une barre de recherche avec filtres, des onglets, et 4 fiches de leads qualifiés.

#### Scenario: Barre navigateur affichée
- **WHEN** le visiteur voit le mockup
- **THEN** 3 dots colorés (rouge/orange/vert) et l'URL "app.paragon-ia.com" sont visibles en haut de la carte

#### Scenario: Header dark avec compteur
- **WHEN** le visiteur voit le header du dashboard
- **THEN** "PARAGON IA · Mon espace · Patrick Martin" est affiché en blanc sur fond navy, et "+12 demandes cette semaine" en vert à droite

#### Scenario: 4 fiches leads visibles
- **WHEN** le visiteur voit la liste
- **THEN** 4 fiches sont affichées avec avatar coloré, badge NOUVEAU vert, email, adresse, projet, délai et bouton "Appeler" noir

#### Scenario: Footer du dashboard
- **WHEN** le visiteur voit le bas du dashboard
- **THEN** "4 nouvelles demandes à traiter aujourd'hui" et "⚡ TOUS EXCLUSIFS · TOUS QUALIFIÉS" en or sont affichés

---

### Requirement: CTA "Oui, je veux développer mon activité"
La page SHALL afficher un bouton CTA noir pleine largeur avec la mention "0 € aujourd'hui" en dessous.

#### Scenario: CTA cliquable redirige vers étape 3
- **WHEN** l'utilisateur clique sur "Oui, je veux développer mon activité →"
- **THEN** il est redirigé vers `/onboarding/volume` (étape 3)

#### Scenario: Mention 0 € visible
- **WHEN** le visiteur voit le CTA
- **THEN** "0 € aujourd'hui. Vous payez uniquement quand une demande qualifiée vous est livrée." est affiché sous le bouton en texte petit centré

---

### Requirement: 3 témoignages clients
La page SHALL afficher 3 cards de témoignages avec étoiles, citation avec mots clés en gras/doré, nom, entreprise et badge résultat.

#### Scenario: 3 cards affichées côte à côte (desktop)
- **WHEN** la page est affichée sur ≥ 768px
- **THEN** les 3 témoignages sont côte à côte en grid 3 colonnes

#### Scenario: Mots clés en or dans les citations
- **WHEN** le visiteur lit une citation
- **THEN** "Paragon IA" et les résultats chiffrés (ex : "15 chantiers en 2 semaines") apparaissent en couleur dorée `#C9A84C`

#### Scenario: Badge résultat affiché
- **WHEN** le visiteur voit le bas d'une card
- **THEN** un badge vert (ex : "+15 chantiers / 2 sem") est affiché sous le nom du témoignant

---

### Requirement: Barre de statistiques
La page SHALL afficher les 4 statistiques clés : 56 000+ RDV · 5+ ans · 17 secteurs · 4,9/5 ★★★★★.

#### Scenario: 4 stats visibles
- **WHEN** le visiteur voit la section stats
- **THEN** les 4 valeurs sont affichées en chiffres dorés avec labels uppercase en dessous
