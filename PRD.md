PRD — Onboarding Paragon IA

1. Objectif du produit

Créer un tunnel d'onboarding en 6 étapes permettant à des artisans français (menuisiers, installateurs PAC, poseurs de panneaux solaires, etc.) de s'inscrire sur la plateforme Paragon IA, choisir un plan de génération de leads, enregistrer leur moyen de paiement, et signer électroniquement leur contrat d'activation — le tout sans intervention humaine.


2. Fonctionnalités du produit

Étape 1 — Ciblage


Saisie de la ville principale
Sélection du pays (défaut : France) et du rayon en km
Codes postaux prioritaires (optionnel)
Choix du type de prospect : Propriétaires de maison / Propriétaires d'appartement / Les deux
Choix du type de chantier :

Menuiserie & Extérieur : Menuiserie, Pergola, Porte-fenêtre, Véranda, Portail, Store/Volet, Autres
Rénovation énergétique : Pompe à chaleur, Panneaux photovoltaïques, Autres



Affichage dynamique : km de rayon, nombre estimé de propriétaires ciblés, badge "100% zone exclusive"


Étape 2 — Plateforme


Social proof : témoignages clients avec nom, entreprise, ville, résultats chiffrés
Preview du dashboard client (demandes qualifiées avec nom, email, adresse, projet)
Statistiques clés : 56 000+ RDV générés, 5+ ans d'expérience, 17 secteurs, 4,9/5
CTA : "Oui, je veux développer mon activité"


Étape 3 — Volume


3 plans tarifaires :

Starter : 20 demandes/mois — 95€/demande — 1 900€ TTC/mois
Booster : 30 demandes/mois — 85€/demande — 2 550€ TTC/mois
Croissance : 40 demandes/mois — 75€/demande — 3 000€ TTC/mois (recommandé)



Sélection du plan avec highlight du plan recommandé
CTA dynamique selon plan sélectionné
Mention : zone exclusive, paiement à la livraison, remplacement gratuit si non conforme


Étape 4 — Compte


Formulaire : Nom de l'entreprise, Prénom, Nom, Email professionnel, Téléphone
Création de mot de passe (minimum 8 caractères)
Création du compte → enregistrement dans Airtable
Mention CGU


Étape 5 — Paiement


Intégration Whop (0€ débité aujourd'hui, CB enregistrée pour prélèvement par demande livrée)
Champs : email, numéro de carte, date d'expiration, CVC, nom, adresse de facturation
Badges de sécurité : SSL 256 bits, PCI-DSS niveau 1, Sécurisé par Whop
Mention : "Jamais stockée chez Paragon"


Étape 6 — Contrat


Affichage du contrat pré-rempli avec : nom, société, email, téléphone du client + plan souscrit + prix total
Checkbox d'acceptation des CGV et contrat de prestation
Champ "Votre nom complet"
Canvas de signature électronique (dessin souris/doigt)
Bouton "Signer mon engagement"
Génération PDF via DocuSeal API
Envoi automatique par email au client et à Paragon IA
Mention : signature horodatée, valeur légale art. 1366-1367 du Code civil


Page de confirmation


Message : "Bienvenue chez Paragon, cher client !"
Timeline : email d'activation + PDF envoyés / agent dédié contacte sous 1h / premières demandes sous 24-48h
Card agent dédié (Marie Claire, Customer Success Manager)
Email de support : serviceclient@paragon-ia.com



3. Exigences fonctionnelles

#ExigenceF1L'état de chaque étape est conservé en mémoire (pas de perte si retour en arrière)F2La barre de progression affiche l'étape courante (X/6) et son nomF3Le bouton "Continuer" est désactivé tant que les champs obligatoires ne sont pas remplisF4Les données du formulaire (étape 4) sont envoyées à Airtable via n8n à la validationF5Le paiement Whop est validé avant d'accéder à l'étape 6F6DocuSeal reçoit les données client via API et retourne un PDF signéF7Le PDF signé est envoyé par email au client ET à l'équipe Paragon IAF8Airtable est mis à jour avec le statut "signé" après la signatureF9Le canvas de signature est effaçable et obligatoire pour validerF10Tout le tunnel est responsive mobile first


4. Exigences non fonctionnelles

#ExigenceNF1Performance : chaque étape se charge en moins de 2 secondesNF2Sécurité : aucune donnée de carte bancaire ne transite par les serveurs Paragon (géré par Whop/PCI-DSS)NF3Disponibilité : hébergé sur Coolify avec uptime cible > 99%NF4Conformité : signature électronique conforme au Code civil français (art. 1366-1367)NF5SEO/Indexation : les pages d'onboarding ne sont pas indexées (noindex)NF6Accessibilité : contrastes suffisants, labels sur tous les champsNF7Emails : envoi fiable via n8n avec confirmation de délivrance