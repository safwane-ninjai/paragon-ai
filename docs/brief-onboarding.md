# Brief fonctionnel — Onboarding Paragon IA

Tunnel d'onboarding en 6 étapes pour inscrire des artisans (menuisiers, installateurs PAC,
etc.) sur une plateforme de génération de leads qualifiés.

## Stack

- **Frontend** : Next.js
- **Paiement** : Whop
- **BDD** : Airtable
- **Signature contrat** : DocuSeal (self-hosted, https://docuseal.paragon-ia.tech)
- **Orchestration** : n8n
- **Hébergement** : Coolify

## Les 6 étapes

### Étape 1 — Ciblage
- Ville principale (input texte)
- Pays (dropdown, défaut France)
- Rayon en km (dropdown)
- Codes postaux prioritaires (optionnel)
- Type de prospect : Propriétaires de maison / Propriétaires d'appartement / Les deux
- Type de chantier :
  - **Menuiserie & Extérieur** : Menuiserie, Pergola, Porte-fenêtre, Véranda, Portail,
    Store/Volet, Autres
  - **Rénovation énergétique** : Pompe à chaleur, Panneaux photovoltaïques, Autres
- Affichage dynamique : km de rayon + nb de propriétaires ciblés + « 100 % zone exclusive »

### Étape 2 — Plateforme (social proof)
- Preview du dashboard client
- Témoignages clients
- Stats : 56 000+ RDV générés, 5+ ans, 17 secteurs, 4.9/5
- CTA : « Oui, je veux développer mon activité »

### Étape 3 — Volume
3 plans :
- **Starter** : 20 RDV, 95 €/demande, 1 900 €/mois
- **Booster** : 30 RDV, 85 €/demande, 2 550 €/mois
- **Croissance** : 40 RDV, 75 €/demande, 3 000 €/mois — *recommandé*

Sélection du plan, CTA dynamique selon le plan choisi.

### Étape 4 — Compte
- Nom de l'entreprise, Prénom, Nom, Email pro, Téléphone
- Mot de passe (8 caractères min)
- Création du compte → stockage dans Airtable

### Étape 5 — Paiement
- Intégration Whop (0 € débité maintenant, CB enregistrée pour prélèvement par livraison)
- Badges sécurité : SSL 256 bits, PCI-DSS niveau 1, « Sécurisé par Whop »

### Étape 6 — Contrat
- Affichage du contrat pré-rempli avec les données client (nom, société, email, téléphone,
  plan choisi, prix)
- Checkbox d'acceptation CGU
- Champ nom complet
- Canvas de signature (dessin à la souris/doigt)
- Bouton « Signer mon engagement »
- Envoi via DocuSeal → PDF généré et envoyé par email au client ET à Paragon IA

### Page de confirmation
- « Bienvenue chez Paragon, cher client ! »
- 3 étapes annoncées : email d'activation envoyé + contrat PDF joint / agent dédié dans
  l'heure / premières demandes sous 24-48 h
- Card agent dédié (Marie Claire, Customer Success Manager)

## Flux de données (n8n)

- Étape 4 → création fiche Airtable (nom, société, email, tel, plan, ciblage)
- Étape 5 → Whop enregistre la CB, webhook n8n confirme
- Étape 6 → n8n appelle l'API DocuSeal avec les données client → génère le PDF → envoie par
  email client + Paragon IA
- Confirmation → Airtable mis à jour (statut = signé)

## Design

- **Couleurs** : fond beige/crème (#FAF7F2), texte noir, accent or/doré (#C9A84C ou similaire),
  boutons noirs ou verts selon le contexte
- **Police** : serif bold pour les titres, sans-serif pour le corps
- **Progression** : barre en haut avec étape X/6 + nom de l'étape
- **Mobile first**
