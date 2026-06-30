## Context

Étape 2/6 du tunnel. Le layout onboarding (`app/onboarding/layout.tsx`), `OnboardingHeader`, `ProgressBar` et `Footer` sont déjà créés. La charte visuelle Paragon IA est établie. Page statique, aucun appel API.

## Goals / Non-Goals

**Goals:**
- Reproduire fidèlement la maquette : dashboard mockup navigateur, 4 fiches leads, CTA, 3 témoignages, stats
- Réutiliser au maximum les composants existants
- Mobile first (mockup scrollable horizontalement sur mobile si nécessaire)

**Non-Goals:**
- Données dynamiques, API, animations complexes
- Tests automatisés

## Decisions

### Structure de la page

```
app/onboarding/plateforme/page.tsx
  ├── OnboardingHeader (retour → /onboarding/ciblage)
  ├── ProgressBar step=2 stepName="Votre plateforme"
  ├── [Badge + H1 + sous-titre]
  ├── DashboardMockup (composant dédié)
  ├── [CTA button + mention 0 €]
  ├── [3 TestimonialCard]
  ├── PlatformeStatsBar
  └── Footer (via layout)
```

### DashboardMockup

Simuler une fenêtre de navigateur :
- Barre de navigateur : 3 dots couleur (rouge/orange/vert) + URL "app.paragon-ia.com"
- Header dark navy : logo "PARAGON IA" à gauche + "Mon espace · Patrick Martin" + badge vert "+12 demandes cette semaine" à droite
- Barre de recherche + bouton "Filtrer" + badge "Vichy · 40km"
- Onglets : "Nouvelles demandes **4**" (actif, souligné or) · "À rappeler **2**" · "Devis en cours **3**" · "Signés **7**"
- 4 fiches leads (voir données ci-dessous)
- Footer de la carte : "4 nouvelles demandes à traiter aujourd'hui" + "⚡ TOUS EXCLUSIFS · TOUS QUALIFIÉS" en or

**4 fiches leads (hardcodées) :**
| Avatar | Nom | Badge | Email | Adresse | Projet | Délai |
|--------|-----|-------|-------|---------|--------|-------|
| PD (violet) | Patrick Durand | NOUVEAU | patrick.durand@gmail.com | 12 rue de la Paix · Montluçon (03) | Pergola bioclimatique 18 m² | il y a 12 min |
| ML (vert) | Marie Lambert | NOUVEAU | m.lambert@orange.fr | 8 av. Victor Hugo · Vichy (03) | Fenêtres alu · 12 ouvertures | il y a 47 min |
| JR (orange) | Jean-Pierre Roux | NOUVEAU | jp.roux@wanadoo.fr | 25 chemin du Lac · Moulins (03) | Porte-fenêtre coulissante alu | il y a 2h |
| SM (bleu) | Sophie Mercier | NOUVEAU | sophie.mercier@gmail.com | 4 rue des Fleurs · Cusset (03) | Pergola toit fixe + véranda | il y a 4h |

Chaque fiche : avatar coloré initiales, badge vert "NOUVEAU", email (📧 icon), adresse (📍 icon), projet (label "PROJET"), délai à droite, bouton "Appeler" noir arrondi.

### Témoignages

3 cards `TestimonialCard` côte à côte (desktop) / empilées (mobile) :

1. **Olivier Chevalier** — Menuiserie Chevalier · Lyon (69)
   "Avec **Paragon IA**, j'ai signé **15 chantiers en 2 semaines**. Pergolas à 8-12 k€ chacune. Mes commerciaux n'ont jamais autant closé."
   Badge : `+15 chantiers / 2 sem`

2. **Thomas Roussel** — Solar Energie Pro · Bordeaux (33)
   "En 1 mois avec **Paragon IA**, j'ai installé **22 systèmes photovoltaïques**. Mon meilleur trimestre depuis 5 ans, sans budget pub."
   Badge : `+22 installs / mois`

3. **Caroline Vasseur** — Vasseur Climat · Nantes (44)
   "**Paragon IA** m'a permis de signer **18 pompes à chaleur en 3 semaines**. ROI immédiat, plus jamais sans."
   Badge : `+18 PAC / 3 sem`

Structure : ★★★★★ + citation (avec mots clés en or/gras) + avatar rond initiales + nom + entreprise + badge résultat vert.

### CTA

Bouton noir pleine largeur `max-w-2xl` centré, `py-5 rounded-2xl` : "Oui, je veux développer mon activité →"
Mention dessous : "0 € aujourd'hui. Vous payez uniquement quand une demande qualifiée vous est livrée."
`<Link href="/onboarding/volume">`

### Stats bar

Réutiliser le style de `StatsBar` landing (grid 4 colonnes, chiffres dorés) :
56 000+ RDV GÉNÉRÉS · 5+ ans D'EXPÉRIENCE · 17 secteurs D'ACTIVITÉ · 4,9/5 ★★★★★ SATISFACTION

## Risks / Trade-offs

- **DashboardMockup scroll mobile** : sur 375px le mockup sera scrollable horizontalement (overflow-x-auto) — acceptable, c'est une démo visuelle
- **Témoignages avec HTML partiel** : les mots en gras/doré dans les citations seront du JSX inline — acceptable pour du hardcodé
