## ADDED Requirements

### Requirement: Page de confirmation personnalisée

La page `/onboarding/confirmation` SHALL afficher un message de bienvenue personnalisé avec le prénom de l'artisan lu depuis le store Zustand (`compte.prenom`). Si le prénom est absent, elle SHALL afficher "cher artisan" en fallback.

#### Scenario: Affichage avec prénom

- **WHEN** l'artisan arrive sur `/onboarding/confirmation` après avoir signé le contrat
- **THEN** la page affiche "Bienvenue chez Paragon, [Prénom] !" dans le H1

#### Scenario: Affichage sans prénom (refresh ou accès direct)

- **WHEN** le store Zustand est vide (accès direct à l'URL)
- **THEN** la page affiche "Bienvenue chez Paragon, cher artisan !" sans erreur

### Requirement: Barre de progression 100% verte

La barre de progression SHALL afficher 100% avec un fond vert (`#16A34A`) et le label "✓ Activation confirmée · Tout est validé" en vert.

#### Scenario: Barre complète

- **WHEN** l'artisan est sur la page confirmation
- **THEN** la barre de progression est verte à 100% (pas la barre dorée standard)

### Requirement: 3 cartes prochaines étapes

La page SHALL afficher 3 cartes en grille indiquant les prochaines étapes : (01) email d'activation envoyé avec l'adresse email de l'artisan, (02) agent dédié dans l'heure, (03) premières demandes sous 24-48h.

#### Scenario: Email personnalisé dans la carte 01

- **WHEN** `compte.email` est disponible dans le store
- **THEN** la carte 01 affiche l'adresse email exacte de l'artisan

### Requirement: Card agent Marie Claire

La page SHALL afficher une card présentant l'agent dédié Marie Claire (CSM) avec : photo fallback initiales "MC", statut "En ligne" pulsant en vert, et un message personnalisé avec le prénom de l'artisan.

#### Scenario: Message personnalisé de l'agent

- **WHEN** le prénom est disponible
- **THEN** le message de l'agent contient "Bonjour [Prénom],"
