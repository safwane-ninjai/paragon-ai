## ADDED Requirements

### Requirement: En-tête et structure de la page contrat
La page SHALL afficher "ÉTAPE 6/6 · Contrat", le badge "● DERNIÈRE ÉTAPE", le H1 "Signez votre contrat d'activation." avec "contrat" souligné en or, et le sous-titre.

#### Scenario: Progression étape 6
- **WHEN** l'utilisateur accède à `/onboarding/contrat`
- **THEN** "ÉTAPE 6 / 6" et "Contrat" sont affichés dans la barre de progression

#### Scenario: Guard données manquantes
- **WHEN** `compte.email` est vide dans le store Zustand
- **THEN** l'utilisateur est redirigé vers `/onboarding/ciblage`

---

### Requirement: 3 cartes de valeur
La page SHALL afficher 3 cartes horizontales décrivant le service : "On génère les prospects", "On les qualifie", "On vous les livre".

#### Scenario: Cartes visibles
- **WHEN** la page est chargée
- **THEN** les 3 cartes sont affichées avec numéro 01/02/03, titre, sous-titre, et icône ambre

---

### Requirement: Récapitulatif du pack souscrit
La page SHALL afficher le pack sélectionné à l'étape 3 avec le nombre de demandes, le prix unitaire, le total TTC, et la mention "Vous ne payez rien d'avance".

#### Scenario: Affichage Starter
- **WHEN** `selectedPlan` est "starter"
- **THEN** "Starter — 20 demandes qualifiées", "85 € TTC / demande livrée", "1 700 € TTC" sont affichés

#### Scenario: Affichage Booster
- **WHEN** `selectedPlan` est "booster"
- **THEN** "Booster — 30 demandes qualifiées", "85 € TTC / demande livrée", "2 550 € TTC" sont affichés

#### Scenario: Affichage Croissance
- **WHEN** `selectedPlan` est "croissance"
- **THEN** "Croissance — 40 demandes qualifiées", "75 € TTC / demande livrée", "3 000 € TTC" sont affichés

---

### Requirement: Widget DocuSeal de signature embarqué
La page SHALL intégrer le widget DocuSeal (`@docuseal/react`) avec les données du client pré-remplies, via un slug de soumission obtenu depuis le Route Handler.

#### Scenario: Création soumission DocuSeal
- **WHEN** la page est chargée et `compte.email` est non vide
- **THEN** le front appelle `POST /api/contrat/signer` avec les données du compte et le plan
- **AND** le Route Handler appelle DocuSeal API et retourne `{ slug }`
- **AND** le widget DocuSeal est rendu avec ce slug

#### Scenario: Données pré-remplies
- **WHEN** le widget DocuSeal est affiché
- **THEN** les champs (société, nom dirigeant, email, téléphone) sont pré-remplis avec les données de `compte`

#### Scenario: Redirection après signature
- **WHEN** le client valide sa signature dans le widget DocuSeal
- **THEN** il est redirigé vers `/onboarding/confirmation`

#### Scenario: Erreur DocuSeal
- **WHEN** le Route Handler échoue (API down, template manquant)
- **THEN** un message d'erreur est affiché avec un lien pour contacter le support

---

### Requirement: Route Handler POST /api/contrat/signer
Le Route Handler SHALL appeler l'API DocuSeal pour créer une soumission pré-remplie et retourner le slug de signature.

#### Scenario: Création réussie
- **WHEN** `POST /api/contrat/signer` est appelé avec `{ compte, selectedPlan }`
- **THEN** le handler appelle `POST {DOCUSEAL_API_URL}/api/submissions` avec `DOCUSEAL_API_KEY`
- **AND** retourne `{ slug: "..." }` avec HTTP 200

#### Scenario: Template non configuré
- **WHEN** `DOCUSEAL_TEMPLATE_ID` est vide
- **THEN** le handler retourne HTTP 503 avec `{ error: "Template non configuré" }`
