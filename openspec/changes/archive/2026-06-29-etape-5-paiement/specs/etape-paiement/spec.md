## ADDED Requirements

### Requirement: En-tête et wrapper de l'étape 5
La page SHALL afficher "ÉTAPE 5/6 · Inscription", le badge "● ÉTAPE FINALE · INSCRIPTION", le H1 avec "inscription" souligné en or, le sous-titre "0 € aujourd'hui", et la bande de badges sécurité.

#### Scenario: Progression étape 5
- **WHEN** l'utilisateur accède à `/onboarding/paiement`
- **THEN** "ÉTAPE 5 / 6" et "Inscription" sont affichés, le trait doré couvre ~83% de la largeur

#### Scenario: Badges sécurité visibles
- **WHEN** la page est chargée
- **THEN** "SSL 256 bits", "PCI-DSS niveau 1" et "Sécurisé par Whop" sont affichés

---

### Requirement: Info box "Pourquoi votre carte maintenant ?"
La page SHALL afficher une info box expliquant le prélèvement automatique et la garantie 0 € aujourd'hui.

#### Scenario: Info box visible
- **WHEN** le visiteur voit la page
- **THEN** l'info box avec fond ambre clair et l'explication "0 € de débit aujourd'hui" est visible au-dessus du widget Whop

---

### Requirement: Widget Whop Checkout intégré
La page SHALL intégrer `WhopCheckoutEmbed` avec le bon `planId` selon le plan choisi à l'étape 3, l'email pré-rempli depuis le store, et le `returnUrl` vers `/onboarding/contrat`.

#### Scenario: Email pré-rempli
- **WHEN** l'utilisateur arrive sur la page après avoir saisi son email à l'étape 4
- **THEN** le champ email du widget Whop est pré-rempli avec `compte.email`

#### Scenario: Plan ID correct selon sélection
- **WHEN** l'utilisateur a sélectionné "Croissance" à l'étape 3
- **THEN** le widget Whop charge le plan `NEXT_PUBLIC_WHOP_PLAN_ID_CROISSANCE`

#### Scenario: Erreur si plan ID manquant
- **WHEN** les variables d'environnement Whop ne sont pas configurées
- **THEN** un message d'erreur s'affiche à la place du widget

#### Scenario: Redirection post-paiement
- **WHEN** l'utilisateur complète le paiement sur le widget Whop
- **THEN** il est redirigé vers `/onboarding/contrat`

---

### Requirement: 3 reassurance cards
La page SHALL afficher 3 cards de réassurance sous le formulaire : "0 € aujourd'hui", "Sécurisé par Whop", "Remplacement gratuit".

#### Scenario: 3 cards visibles
- **WHEN** le visiteur fait défiler la page
- **THEN** les 3 cards sont affichées avec icône ambre, titre et sous-titre
