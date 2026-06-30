## 1. Composant DashboardMockup

- [x] 1.1 Créer `components/onboarding/plateforme/DashboardMockup.tsx` : wrapper avec barre navigateur (3 dots + URL "app.paragon-ia.com"), ombre, border-radius
- [x] 1.2 Ajouter le header dark navy : "PARAGON IA · Mon espace · Patrick Martin" à gauche, "+12 demandes cette semaine" (dot vert) à droite
- [x] 1.3 Ajouter la barre de recherche + bouton "Filtrer" + badge "Vichy · 40km"
- [x] 1.4 Ajouter les onglets : "Nouvelles demandes 4" (actif, souligné or) · "À rappeler 2" · "Devis en cours 3" · "Signés 7"
- [x] 1.5 Implémenter les 4 fiches leads : avatar coloré initiales, badge NOUVEAU vert, email (📧), adresse (📍), label PROJET, délai, bouton "Appeler" noir
- [x] 1.6 Ajouter le footer du dashboard : "4 nouvelles demandes à traiter aujourd'hui" + "⚡ TOUS EXCLUSIFS · TOUS QUALIFIÉS" en or

## 2. Composant TestimonialCard

- [x] 2.1 Créer `components/onboarding/plateforme/TestimonialCard.tsx` : ★★★★★, citation JSX avec mots clés en or, avatar rond initiales coloré, nom, entreprise, badge résultat vert
- [x] 2.2 Hardcoder les 3 témoignages : Olivier Chevalier (Lyon 69), Thomas Roussel (Bordeaux 33), Caroline Vasseur (Nantes 44)

## 3. Barre de stats

- [x] 3.1 Créer `components/onboarding/plateforme/PlatformeStatsBar.tsx` : 4 stats (56 000+ · 5+ · 17 · 4,9/5 ★★★★★) en chiffres dorés, style identique à `StatsBar` de la landing

## 4. Page assemblage

- [x] 4.1 Créer `app/onboarding/plateforme/page.tsx` : assembler `OnboardingHeader` (retour → `/onboarding/ciblage`), `ProgressBar` step=2 stepName="Votre plateforme", badge, H1, sous-titre, `DashboardMockup`, CTA, témoignages, `PlatformeStatsBar`
- [x] 4.2 CTA : bouton noir `rounded-2xl py-5 w-full max-w-2xl mx-auto` "Oui, je veux développer mon activité →" → `Link href="/onboarding/volume"`
- [x] 4.3 Mention sous CTA : "0 € aujourd'hui. Vous payez uniquement quand une demande qualifiée vous est livrée."

## 5. Vérification

- [x] 5.1 Tester mobile 375px : mockup scrollable horizontalement, témoignages empilés, CTA full-width
- [x] 5.2 Tester desktop 1280px : mockup centré max-w-2xl, 3 témoignages côte à côte, stats en 4 colonnes
- [x] 5.3 Vérifier que le bouton CTA redirige bien vers `/onboarding/volume` (affichera 404 jusqu'à l'étape 3)
