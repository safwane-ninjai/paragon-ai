## ADDED Requirements

### Requirement: Affichage du header avec logo
La page d'accueil SHALL afficher un header centré contenant uniquement le logo Paragon IA (`public/logo-paragon.png`) via `next/image` avec l'attribut `priority`.

#### Scenario: Logo visible au chargement
- **WHEN** un visiteur accède à la route `/`
- **THEN** le logo Paragon IA est affiché centré en haut de la page, visible sans scroll

---

### Requirement: Section hero avec accroche et CTA
La section hero SHALL afficher sur desktop un layout 2 colonnes : accroche + bouton CTA à gauche, preview du dashboard artisan à droite. Sur mobile, les colonnes se superposent (accroche en haut, preview en bas).

#### Scenario: Badge "POUR ARTISANS & PROS DU BÂTIMENT" visible
- **WHEN** le visiteur voit la section hero
- **THEN** un badge pill avec un point doré et le texte "POUR ARTISANS & PROS DU BÂTIMENT" est affiché au-dessus du titre

#### Scenario: Titre principal affiché
- **WHEN** le visiteur voit la section hero
- **THEN** le titre "Activez votre flux de demandes de rendez-vous qualifiés." est affiché en police serif bold noire

#### Scenario: Description et mise en gras sélective
- **WHEN** le visiteur lit la description
- **THEN** les mots "demande", "adresse vérifiée", "Zone exclusive." sont en gras ; le reste en police normale

#### Scenario: Bouton CTA "Démarrer maintenant"
- **WHEN** le visiteur clique sur "Démarrer maintenant →"
- **THEN** il est redirigé vers `/onboarding/ciblage` (étape 1 du tunnel)

#### Scenario: Badges de réassurance sous le CTA
- **WHEN** le visiteur voit la section hero
- **THEN** trois badges checkmark sont affichés : "Onboarding en 1 min", "Zone exclusive", "Garantie remplacement"

---

### Requirement: Preview du dashboard artisan
La section hero SHALL inclure une carte blanche simulant le dashboard artisan avec une liste de rendez-vous qualifiés (données hardcodées) et une notification flottante.

#### Scenario: Notification "Nouvelle demande qualifiée" flottante
- **WHEN** le visiteur voit la preview du dashboard
- **THEN** une notification flottante est visible en haut de la carte avec un dot vert, le texte "Nouvelle demande qualifiée", le type de travaux et la distance

#### Scenario: En-tête "Mon agenda" avec compteur
- **WHEN** le visiteur voit la preview
- **THEN** l'en-tête affiche "Mon agenda / CETTE SEMAINE" et le chiffre "12 RDV QUALIFIÉS" en or à droite

#### Scenario: Liste de 5 rendez-vous avec statuts colorés
- **WHEN** le visiteur voit la liste des rendez-vous
- **THEN** 5 entrées sont affichées avec : heure · nom · type travaux · badge statut (Confirmé vert / Nouveau orange / À rappeler gris)

#### Scenario: Lien "+ 7 demandes cette semaine / Pack Croissance"
- **WHEN** le visiteur voit le bas de la carte
- **THEN** un texte "+ 7 demandes cette semaine" et le lien "Pack Croissance" en or sont affichés

---

### Requirement: Ticker de social proof
Un bandeau SHALL afficher en continu "712 demandes de rendez-vous qualifiés générées ce mois-ci" avec un dot vert animé (`animate-pulse`).

#### Scenario: Ticker visible entre le hero et les stats
- **WHEN** le visiteur fait défiler la page après le hero
- **THEN** le ticker est visible avec le dot vert pulsant et le texte de social proof

---

### Requirement: Bande de statistiques clés
La page SHALL afficher 4 statistiques en chiffres dorés sur fond crème.

#### Scenario: 4 stats affichées
- **WHEN** le visiteur voit la bande de stats
- **THEN** les 4 valeurs sont affichées : "56 000+" (RENDEZ-VOUS GÉNÉRÉS) · "5+" (ANNÉES D'EXPÉRIENCE) · "17" (SECTEURS D'ACTIVITÉ) · "4,9/5 ★★★★★" (SATISFACTION CLIENT)

#### Scenario: Mise en forme des chiffres
- **WHEN** le visiteur voit les stats
- **THEN** les chiffres sont en grande taille, couleur or `#C9A84C`, et les labels en petites majuscules noires en dessous

---

### Requirement: Section "Comment ça marche"
La page SHALL afficher une section avec le label "COMMENT ÇA MARCHE", le titre "3 étapes. 1 flux exclusif de demandes qualifiées." et 3 cartes numérotées.

#### Scenario: Label de section affiché
- **WHEN** le visiteur voit la section
- **THEN** le label "— COMMENT ÇA MARCHE —" est affiché centré en or au-dessus du titre

#### Scenario: 3 cartes d'étapes affichées
- **WHEN** le visiteur voit les 3 cartes
- **THEN** chaque carte affiche : numéro (01/02/03) en or, icône, titre et description :
  - **01** — icône pin — "Définissez votre zone" — "Ville, rayon, codes postaux, type de chantier. En 1 minute."
  - **02** — icône check — "On qualifie pour vous" — "Campagnes ciblées. Coordonnées + adresse + projet vérifiés avant livraison."
  - **03** — icône cible/check — "Closez vos ventes" — "Direct dans votre plateforme. Vous payez uniquement quand une demande est livrée."

---

### Requirement: Footer avec liens légaux
La page SHALL afficher un footer avec les liens "Mentions Légales", "Politique de Confidentialité", "CGV" et la mention "© 2026 Paragon IA · Tous droits réservés."

#### Scenario: Footer visible en bas de page
- **WHEN** le visiteur atteint le bas de la page
- **THEN** les liens légaux et le copyright sont affichés sur fond crème, texte gris discret

---

### Requirement: Design fidèle à la maquette
Tous les composants SHALL respecter la charte visuelle : fond `#FAF7F2`, accent `#C9A84C`, navy `#1A1A2E`, police serif bold pour titres, sans-serif pour corps. Mobile first (375px en priorité, puis 1280px desktop).

#### Scenario: Rendu mobile correct
- **WHEN** la page est affichée sur un écran 375px de large
- **THEN** le layout est mono-colonne, le texte est lisible sans scroll horizontal, les boutons sont full-width

#### Scenario: Rendu desktop correct
- **WHEN** la page est affichée sur un écran ≥ 1280px
- **THEN** la section hero est en 2 colonnes (accroche gauche, dashboard droite), les 3 cartes "comment ça marche" sont côte à côte
