## 1. Store Zustand

- [x] 1.1 Installer Zustand : `npm install zustand`
- [x] 1.2 Créer `lib/store/onboarding.ts` : store Zustand avec persist (localStorage), slice `ciblage` (ville, pays, rayon, codesPostaux, typeProspect, typesChantier)

## 2. Layout onboarding partagé

- [x] 2.1 Créer `app/onboarding/layout.tsx` : wrapper client avec `OnboardingHeader` (logo + flèche retour) et `Footer` (réutiliser `components/landing/Footer.tsx`)
- [x] 2.2 Créer `components/onboarding/OnboardingHeader.tsx` : flèche `<` gauche (Link vers `/`) + logo PARAGON AI centré via `next/image`
- [x] 2.3 Créer `components/onboarding/ProgressBar.tsx` : props `step` (1-6) et `stepName` (string), trait doré de largeur `(step/6 * 100)%`, labels "ÉTAPE X / 6" + nom en dessous

## 3. Widget de zone

- [x] 3.1 Créer `components/onboarding/ZoneWidget.tsx` : SVG 200×200 avec 3 cercles concentriques pointillés or, ~12 dots fixes, point central doré avec `animate-ping`
- [x] 3.2 Ajouter les 3 stats sous le widget : `{rayon} KM DE RAYON` · `~{estimatedProspects} PROPRIÉTAIRES CIBLÉS` · `100% ZONE EXCLUSIVE` (en or)
- [x] 3.3 Implémenter le calcul `estimatedProspects = Math.round(rayon ** 2 * Math.PI * 0.4 / 100) * 100` (arrondi à la centaine)

## 4. Formulaire LOCALISATION

- [x] 4.1 Créer `components/onboarding/ciblage/LocalisationForm.tsx` : input ville (texte), select pays (🇫🇷 France), select rayon (10/20/30/50/100 km, défaut 30), textarea codes postaux (optionnel)
- [x] 4.2 Lier les valeurs au store Zustand (lecture + écriture en temps réel)

## 5. Sélection type de prospect

- [x] 5.1 Créer `components/onboarding/ciblage/ProspectTypeSelector.tsx` : 3 radio-cards (Propriétaires de maison / d'appartement / Les deux)
- [x] 5.2 Implémenter état sélectionné : bordure or `#C9A84C` + fond or 10% + checkmark vert rempli ; non-sélectionné : bordure gris + fond blanc
- [x] 5.3 Pré-sélectionner "Propriétaires de maison" à l'initialisation (valeur par défaut dans le store)

## 6. Sélection type de chantier

- [x] 6.1 Créer `components/onboarding/ciblage/ChantierTypeSelector.tsx` : 2 groupes de pills multi-sélection avec sous-titres dorés "— MENUISERIE & EXTÉRIEUR —" et "— RÉNOVATION ÉNERGÉTIQUE —"
- [x] 6.2 Implémenter les pills toggle : actif = `bg-navy text-white` ; inactif = `bg-white border border-gray-300 text-navy`
- [x] 6.3 Lier la liste `typesChantier` au store Zustand (ajout/retrait par clic)

## 7. Page et assemblage

- [x] 7.1 Créer `app/onboarding/ciblage/page.tsx` : assembler badge "VOTRE CIBLE", titre H1, sous-titre, `ZoneWidget`, `LocalisationForm`, `ProspectTypeSelector`, `ChantierTypeSelector`, bouton "Continuer →"
- [x] 7.2 Implémenter la logique de validation : `isValid = ville !== '' && typeProspect !== null && typesChantier.length > 0`
- [x] 7.3 Bouton "Continuer →" : désactivé (`bg-gray-400 opacity-60 cursor-not-allowed`) ou actif (`bg-navy text-white`), sticky bottom sur mobile, full-width
- [x] 7.4 Lien "Continuer →" vers `/onboarding/plateforme` (étape 2)

## 8. Vérification

- [x] 8.1 Tester la validation : bouton désactivé si ville vide OU type prospect non choisi OU aucun chantier
- [x] 8.2 Tester la persistance Zustand : remplir le formulaire, naviguer vers `/`, revenir sur `/onboarding/ciblage` → données conservées
- [x] 8.3 Tester mobile 375px : pills en flex-wrap, bouton sticky bottom visible, pas de scroll horizontal
- [x] 8.4 Tester desktop 1280px : layout centré, widget et formulaire dans une carte blanche (max-w-lg centré)
- [x] 8.5 Tester le changement de rayon → stats du widget se mettent à jour instantanément
