## 1. Store Zustand

- [x] 1.1 Étendre `lib/store/onboarding.ts` : ajouter `CompteState` (nomEntreprise, prenom, nom, email, telephone, motDePasse) + `setCompte`

## 2. Page assemblage

- [x] 2.1 Créer `app/onboarding/compte/page.tsx` (client) : `OnboardingHeader` (retour → `/onboarding/volume`), `ProgressBar` step=4 stepName="Compte"
- [x] 2.2 Badge "● DERNIÈRE LIGNE DROITE · 30 SECONDES" + H1 "Activez votre compte." avec "compte" souligné or + sous-titre avec "demandes de rendez-vous qualifiés" en gras
- [x] 2.3 Bande 3 feature badges : Plateforme dédiée / Email & plateforme / Agent dédié (icône ambre + titre + sous-titre)
- [x] 2.4 Carte blanche `rounded-2xl shadow-sm p-6` : section 01 "Vos coordonnées" avec badge doré "01", champs nom entreprise / prénom+nom (2 cols) / email / téléphone
- [x] 2.5 Section 02 "Sécurisez votre accès" avec badge "02", champ mot de passe + toggle eye (state local `showPassword`)
- [x] 2.6 CTA vert `bg-green-600` "Créer mon compte →" : disabled + `bg-gray-300` si invalide, actif si tous champs remplis et motDePasse ≥ 8 car. → navigate `/onboarding/paiement`
- [x] 2.7 Mention CGU : "En créant votre compte, vous acceptez les **CGU**. Notifications email pour chaque demande (jamais de pub)."

## 3. Vérification

- [x] 3.1 CTA gris au chargement, devient vert quand tous les champs valides
- [x] 3.2 Toggle eye affiche/masque le mot de passe
- [x] 3.3 Données persistées dans Zustand (rechargement page = champs préremplis)
- [x] 3.4 Mobile 375px : prénom/nom empilés, tous les champs full-width
