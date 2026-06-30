## 1. Initialisation du projet Next.js

- [x] 1.1 Initialiser le projet avec `create-next-app` (TypeScript + Tailwind CSS + App Router, no src directory)
- [x] 1.2 Configurer `tailwind.config.ts` : ajouter les couleurs custom `cream: '#FAF7F2'`, `gold: '#C9A84C'`, `navy: '#1A1A2E'`
- [x] 1.3 Copier le logo dans `public/logo-paragon.png`
- [x] 1.4 Configurer `app/globals.css` : fond par défaut `#FAF7F2`, import police Playfair Display (Google Fonts via `next/font/google`)
- [x] 1.5 Créer le dossier `components/landing/` pour les composants de la page d'accueil

## 2. Composant Header

- [x] 2.1 Créer `components/landing/Header.tsx` : logo centré via `next/image` avec `priority` et `alt="Paragon IA"`
- [x] 2.2 Intégrer `<Header />` dans `app/page.tsx`

## 3. Section Hero

- [x] 3.1 Créer `components/landing/DashboardPreview.tsx` : carte blanche avec notification flottante "Nouvelle demande qualifiée" (dot vert, type travaux, distance)
- [x] 3.2 Ajouter l'en-tête "Mon agenda / CETTE SEMAINE" + compteur "12 RDV QUALIFIÉS" en or dans `DashboardPreview`
- [x] 3.3 Ajouter la liste de 5 rendez-vous hardcodés avec heure, nom, type, badge statut (Confirmé vert / Nouveau orange / À rappeler gris)
- [x] 3.4 Ajouter le pied de carte "+ 7 demandes cette semaine · Pack Croissance" en or dans `DashboardPreview`
- [x] 3.5 Créer `components/landing/HeroSection.tsx` : layout 2 colonnes desktop (mono-colonne mobile)
- [x] 3.6 Ajouter le badge pill "POUR ARTISANS & PROS DU BÂTIMENT" (dot doré + texte) dans `HeroSection`
- [x] 3.7 Ajouter le titre H1 en Playfair Display bold noir et la description avec mots en gras sélectifs
- [x] 3.8 Ajouter le bouton CTA `<Link href="/onboarding/ciblage">` noir arrondi "Démarrer maintenant →"
- [x] 3.9 Ajouter les 3 badges de réassurance checkmark sous le CTA (Onboarding en 1 min · Zone exclusive · Garantie remplacement)
- [x] 3.10 Intégrer `<HeroSection />` dans `app/page.tsx`

## 4. Ticker de social proof

- [x] 4.1 Créer `components/landing/SocialProofTicker.tsx` : bandeau pill avec dot vert `animate-pulse` et texte "712 demandes de rendez-vous qualifiés générées ce mois-ci"
- [x] 4.2 Intégrer `<SocialProofTicker />` dans `app/page.tsx` entre `HeroSection` et `StatsBar`

## 5. Bande de statistiques

- [x] 5.1 Créer `components/landing/StatsBar.tsx` : 4 stats en chiffres dorés (56 000+ · 5+ · 17 · 4,9/5 ★★★★★) avec labels en petites majuscules noires
- [x] 5.2 Intégrer `<StatsBar />` dans `app/page.tsx`

## 6. Section "Comment ça marche"

- [x] 6.1 Créer `components/landing/HowItWorks.tsx` : label centré "— COMMENT ÇA MARCHE —" en or, titre H2, 3 cartes côte à côte (desktop) / empilées (mobile)
- [x] 6.2 Implémenter les 3 cartes : numéro 01/02/03 en or, icône SVG (pin / check / cible), titre et description
- [x] 6.3 Intégrer `<HowItWorks />` dans `app/page.tsx`

## 7. Footer

- [x] 7.1 Créer `components/landing/Footer.tsx` : liens "Mentions Légales · Politique de Confidentialité · CGV" + copyright "© 2026 Paragon IA · Tous droits réservés."
- [x] 7.2 Intégrer `<Footer />` dans `app/page.tsx`

## 8. Vérification responsive et perf

- [x] 8.1 Tester le rendu mobile 375px (mono-colonne, pas de scroll horizontal, bouton full-width)
- [x] 8.2 Tester le rendu desktop 1280px (hero 2 colonnes, 3 cartes côte à côte)
- [x] 8.3 Vérifier que `next/image` optimise bien le logo (pas de CLS, chargement prioritaire)
- [x] 8.4 Ajouter `<meta name="robots" content="noindex" />` dans `app/layout.tsx` (pages onboarding non indexées)
