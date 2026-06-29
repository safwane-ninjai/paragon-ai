---
name: paragon-ia-design
description: Paragon IA brand design system — encodes colors, typography, components, copy rules, and technical conventions for the qualified-lead service for French construction/renovation artisans (menuiserie, pergola, fenêtres, véranda, vérandas, panneaux solaires, pompe à chaleur, etc.). Use this skill whenever the user mentions Paragon IA, paragon-ia.com, builds funnels or landing pages or platforms or emails or ads or slides for Paragon IA, writes French sales copy for the brand, designs onboarding flows for artisans, or works on assets for menuiserie/pergola/véranda/fenêtre lead-gen businesses with the Paragon IA brand. Apply automatically when these contexts appear — the skill encodes hard constraints (no black, no blue, no photos, no "Appeler" buttons, no "CRM" terminology) that are very easy to get wrong without this skill. Also use when iterating on existing Paragon IA work (platform preview, onboarding funnel, contract page, etc.) to maintain visual coherence.
---

# Paragon IA — Design System Skill

This skill encodes the brand identity, design tokens, component patterns, copy rules, and technical conventions for **Paragon IA** — a qualified-appointment-delivery service for French exterior carpentry and renovation professionals.

When working on any Paragon IA asset, load this skill, follow the hard constraints, and use the design tokens verbatim.

---

## Brand identity

**Product**: Paragon IA delivers qualified rendez-vous (booked appointments with pre-verified prospects) to French artisans. The artisan only pays per delivered qualified appointment ("payé au résultat"). The qualification is done by a human agent (Marie Claire is the placeholder name) via a phone call, producing a written compte rendu.

**Audience**: French artisans, typically 35-65 years old, in trades like menuiserie alu, pergola bioclimatique, fenêtres double vitrage, vérandas, porte-fenêtres coulissantes, volets roulants, panneaux solaires, pompe à chaleur. They are pragmatic, sometimes skeptical, value local trust, and dislike corporate jargon.

**Voice**: French only. Vouvoiement (always "vous", never "tu"). Direct entrepreneurial tone — like a sharp business owner talking peer-to-peer to another business owner. No corporate filler, no vague superlatives, no transition words like "maintenant" or "alors écoutez ça" in written copy. Premium but never chic-vintage.

**Aesthetic target**: Modern 2026 SaaS premium (Linear, Attio, Stripe Dashboard references). Cream + white + gold + navy text. Editorial feel with brushstroke gold accents. Never musty, never outdated, never too "chic" or "vieillette".

---

## Hard constraints — NEVER violate

These mistakes are easy to make and the user will reject the work immediately:

1. **NO black** anywhere as a background, block, sidebar, or panel. The closest acceptable dark color is navy `#0B1320`, used only as **text color** — never as a background block.
2. **NO blue** anywhere — not as accents, buttons, icons, status colors, or avatar gradients. Replace any blue tendency with gold, sage green, rust, or stone warm tones.
3. **NO photos of people** — not in cards, not as avatars, not in testimonials. Use either initials in neutral squares or no avatar at all. The exception: real-photo client logos in trust banners are OK if they exist.
4. **NO colored gradient avatars per prospect** in CRM cards. Cards must look clean and minimal — no purple/pink/sage circles attached to each name. Big colored avatar circles read as outdated/playful, not premium.
5. **NO "Appeler [Name]" buttons** on prospect cards or detail panels. The artisan cannot call from their computer. Replace with status-change actions: "Marquer comme contacté", "Marquer à rappeler", "Passer en devis", "Marquer comme signé", "Marquer comme non qualifié".
6. **NO "CRM" terminology** in user-facing copy. Use "plateforme", "espace artisan", "vos demandes de rendez-vous". The user perceives "CRM" as enterprise/cold language.
7. **NO "Paragon" alone** — always "Paragon IA".
8. **NO heavy navy or dark sidebars** in the platform UI. They make the product feel like "vieux logiciel" outdated software.
9. **NO unsolicited design changes** when the user asks for a copy edit. If they ask to change wording, only change wording — don't redesign the surrounding component.

---

## Design tokens

Use these exact values. They match the onboarding funnel and the platform preview, so consistency is automatic when copied verbatim.

### Colors (CSS variables, copy verbatim)

```css
:root {
    /* Navy — TEXT ONLY, never block backgrounds */
    --navy: #0B1320;
    --navy-soft: #18223A;
    --navy-deep: #060A14;

    /* Gold — the brand accent */
    --gold: #C2984C;
    --gold-light: #D9B770;
    --gold-dark: #A8852D;
    --gold-cream: #FAEDD6;
    --gold-pale: #FBF6E9;

    /* Backgrounds — always cream-warm or white */
    --bg: #FAF8F3;          /* warm cream — page background */
    --bg-soft: #F4F1E8;     /* slightly darker cream */
    --bg-warm: #F9F5EC;     /* between cream and gold-pale */
    --bg-col: #F5F2E9;      /* kanban column background */
    --white: #FFFFFF;       /* card background */

    /* Borders — always soft cream-tinted, never gray */
    --border: #E8E4DA;
    --border-soft: #F0EDE4;

    /* Text scale */
    --text: #0F1724;        /* primary text */
    --text-mid: #4A5468;    /* secondary text */
    --text-soft: #8A8D8A;   /* meta text */
    --text-light: #B5B5B0;  /* tertiary / disabled */

    /* Status colors — used sparingly, only on small pills and dots */
    --green: #16A34A;
    --green-bg: #DCFCE7;
    --amber: #D97706;
    --amber-bg: #FEF3C7;
    --red: #DC2626;
    --red-bg: #FEE2E2;

    /* Shadows — always subtle, never harsh */
    --shadow-sm: 0 1px 2px rgba(11,19,32,0.05);
    --shadow: 0 4px 12px rgba(11,19,32,0.06), 0 2px 4px rgba(11,19,32,0.03);
    --shadow-lg: 0 16px 40px rgba(11,19,32,0.10);
}
```

### Typography

Always load this font stack — both on web pages, in ClickFunnels, and in HTML emails (where supported):

```html
<style>
@font-face {
    font-family: 'ParagonInter';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2') format('woff2-variations'),
         url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50ojIZjclGo7TgI58.woff2') format('woff2');
}

body {
    font-family: 'ParagonInter', 'Inter', system-ui, -apple-system, sans-serif;
}
</style>
```

**Font weights**: 400 (body), 500 (emphasized body), 600 (UI buttons), 700 (eyebrow, meta), 800 (headings, card names), 900 (page titles, big numbers).

**Type scale** (typical):
- Page title: 26-30px, weight 900, letter-spacing -0.8 to -1px, line-height 1.1
- Section title: 18-20px, weight 800, letter-spacing -0.4px
- Card name: 13-14.5px, weight 800, letter-spacing -0.1px
- Body: 13-14px, weight 400-500, line-height 1.45-1.55
- Meta: 11-12.5px, weight 500-600, color text-soft
- Eyebrow: 10-11px, weight 800, letter-spacing 1.4-1.6px, color gold-dark, UPPERCASE

---

## Signature design devices

These are the visual "tells" that make a Paragon IA page recognizable.

### 1. Brushstroke gold underline on accent word in titles

The page title always has one accent word underlined with a soft gold brushstroke. Pattern:

```html
<h1 class="page-title">Vos demandes de rendez-vous <span class="accent">qualifiés</span>.</h1>
```

```css
.page-title .accent {
    position: relative;
    display: inline-block;
}
.page-title .accent::after {
    content: '';
    position: absolute;
    bottom: 2px; left: -2px; right: -2px;
    height: 10px;
    background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
    opacity: 0.28;
    border-radius: 50%;
    z-index: -1;
    transform: skewX(-3deg);
}
```

The brushstroke is `opacity: 0.28`, skewed -3deg, behind the text. Subtle, never overpowering.

### 2. Eyebrow labels with gold dot

Above section titles or above the main H1. Pattern:

```html
<div class="page-eyebrow">Espace artisan</div>
```

```css
.page-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 10.5px;
    font-weight: 800;
    color: var(--gold-dark);
    letter-spacing: 1.6px;
    text-transform: uppercase;
    margin-bottom: 8px;
}
.page-eyebrow::before {
    content: ''; width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--gold);
}
```

### 3. Gold gradient horizontal divider

Used under topbars, under chat headers, under detail headers. Always centered and faded at the edges:

```css
.divider::after {
    content: ''; position: absolute; bottom: -1px; left: X; right: X;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
    opacity: 0.4;
}
```

### 4. PARAGON IA wordmark logo

Text-based, no graphical mark. Pattern:

```html
<div class="brand-logo">PARAGON <span class="ai">IA</span></div>
```

```css
.brand-logo {
    display: flex;
    align-items: baseline;
    gap: 4px;
    font-size: 21px;
    font-weight: 900;
    color: var(--navy);
    letter-spacing: -0.7px;
    position: relative;
}
.brand-logo .ai {
    font-size: 10px;
    color: var(--gold);
    font-weight: 700;
    letter-spacing: 1px;
}
.brand-logo::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 88%; height: 5px;
    background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
    opacity: 0.22;
    border-radius: 50%;
    transform: skewX(-4deg);
}
```

If a raster logo file is needed (e.g., `logoparagon.png`), it ships as navy-on-dark and must be processed with Pillow before use on white pages. Recoloring pipeline: isolate navy pixels (`blue > 16, blue >= red, green < 95, max_channel < 120`), isolate gold pixels (`red > 120, green > 85, blue < 150, red >= green`), recolor to `[11,18,32]` navy and `[201,162,75]` gold, apply Gaussian blur radius 0.6 on alpha for anti-aliasing. Save as PNG with transparency.

### 5. Card with gold left accent for "new" status

Cards default to plain white. The "new" variant has a gold-pale background and a 2-3px gold left bar:

```css
.card { background: var(--white); border: 1px solid var(--border); border-radius: 10px; padding: 12px 13px; }
.card-new { background: var(--gold-pale); border-color: rgba(194,152,76,0.25); position: relative; }
.card-new::before {
    content: ''; position: absolute;
    left: -1px; top: 14px; bottom: 14px;
    width: 2px;
    background: var(--gold);
    border-radius: 0 2px 2px 0;
}
```

### 6. Pulse-green new-indicator dot

A 6-8px green dot with `pulse` animation, placed next to "new" cards and on column headers. Pattern:

```css
.dot-new { width: 7px; height: 7px; border-radius: 50%; background: var(--green); animation: pulse 1.8s ease-in-out infinite; }
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
}
```

### 7. Compte rendu Paragon IA (signature block in detail panels)

Used in the platform preview detail panel and anywhere a qualification report is shown. This is the element that "sells" the product — make it premium. Pattern (warm cream background, gold accent top, agent avatar in navy with gold MC, star score, validated checkmarks, verbatim italic quote with gold left-border, agent notes with gold-emphasized strong tags).

Structure:
```
[gold top accent bar]
COMPTE RENDU PARAGON IA  (eyebrow)
─────────────────────────────
[MC avatar] Marie Claire             4,8/5
            Agent Paragon IA          ★★★★
─────────────────────────────
DATE       HEURE     DURÉE
28 juin    14h32     8 min 42 s
─────────────────────────────
INFORMATIONS VALIDÉES
✓ Propriétaire vérifié
✓ Projet réel et défini
✓ Budget disponible (8-12 k€)
✓ Décideur final
✓ Timeline 2 mois confirmée
─────────────────────────────
VERBATIM DU PROSPECT
"Je veux faire poser une pergola..."
─────────────────────────────
NOTES DE L'AGENT
Prospect très intéressé. À rappeler rapidement.
```

The agent avatar is **always navy background with gold text initials** ("MC", "LB"), never a colored gradient. This avatar is the team — not a prospect avatar.

---

## Layout patterns

- Background `var(--bg)` cream warm everywhere
- White cards on cream — never the reverse
- Topbar white with soft border-bottom + gold gradient line
- Page content padded 24-36px depending on viewport
- Generous whitespace, never cramped
- Subtle shadows only — never harsh
- Border-radius: 8-12px on cards/buttons, 50px on pills, 16-18px on chat panel
- Subtle hover lifts: `transform: translateY(-1px)` + slight shadow increase + gold border tint

---

## Copy and content rules

### Terminology (locked)

- "demandes de rendez-vous qualifiés" — never "leads", "RDV", "rendez-vous" alone
- "Prospect qualifié" — in contracts (Article 1 definition)
- "plateforme" / "espace artisan" — never "CRM" or "logiciel" in user-facing copy
- "Email & plateforme" — when describing delivery channel (NO SMS)
- "Sécurisé par Whop" — payment trust signal (Stripe handles actual payment, legally Article 5 in contract)
- "Pour artisans & pros du bâtiment" — eyebrow / positioning tagline
- "Paragon IA" — always full name, never "Paragon" alone
- "zone exclusive" — when describing geographic exclusivity per artisan
- "compte rendu" — for the qualification report from the agent
- "verbatim" — for the prospect quote section

### Validated stats (use these exact numbers)

- 56 000+ rendez-vous qualifiés livrés
- 5+ ans d'expérience
- 17 secteurs
- Note 4,9/5
- 517 entreprises clientes (for social proof badges)

### Pricing tiers (locked)

- **Starter** — 20 demandes × 95€ = 1 900€
- **Booster** — 30 demandes × 85€ = 2 550€
- **Croissance** — 40 demandes × 75€ = 3 000€ ★ (default recommended)

Display the pack as a card with badge "Recommandé" on Croissance.

### Voice examples

| ❌ Don't | ✅ Do |
|---|---|
| "Notre solution innovante vous accompagne..." | "On vous livre 40 demandes qualifiées par mois." |
| "Maximisez votre ROI" | "Vous payez uniquement au résultat." |
| "Tu vas adorer notre plateforme" | "Vous allez recevoir vos premières demandes sous 48h." |
| "Cher artisan" | (no salutation needed — go direct) |
| "N'hésitez pas à nous contacter" | "Une question ? Marie Claire vous répond en chat." |

### Status colors (in copy and UI)

- **Nouvelle demande** — green pulse dot, "il y a X min" timestamp
- **Contacté** — gold dot, "contacté il y a X j" timestamp
- **À rappeler** — amber dot, "rappel prévu [date]" timestamp
- **Devis en cours** — gold-dark dot, amount in gold pill, "devis envoyé il y a X j"
- **Signé** — green dot, amount in gold pill, "signé il y a X j"
- **Pas qualifié** — gray dot, red "Écarté" pill, reason shown in detail

---

## Technical conventions

### File creation strategy

- **Single self-contained HTML files** for landing pages, platforms, slides — easier to host on Netlify/ClickFunnels.
- **Inline all CSS** in `<style>` tags, no external CSS files.
- **Inline SVG icons** — never load icon libraries. Common icons: phone (Phosphor stroke), check, search, location-pin, three-dots, sparkle.
- **Base64-encode images** under 10KB inline. Anything larger needs an external URL (ClickFunnels custom HTML blocks crash on heavy base64).

### ClickFunnels-specific constraints

- Pages must start with `<link>` or `<style>` — NEVER with `<script>` (ClickFunnels rejects it).
- Place all `<script>` tags at the END of the file.
- `font-family` declarations on `.sc *` need `!important` to override platform styles.
- Base64 images > ~10KB crash custom HTML blocks. Use text or external URLs instead.

### Bash heredoc limitation (important)

When writing HTML files over ~1000 lines via bash `cat > file << EOF`, the heredoc can truncate mid-file silently. **Use one of these instead**:
1. `create_file` tool (Anthropic built-in) — most reliable
2. Python with `open('w')` — handles long strings cleanly
3. Split into head + body + tail files, then `cat head body tail > final.html`
4. If you must use heredoc, verify completion: `grep -c "</html>" file` should return 1

### Animation library

No external libraries. Pure CSS animations only:
- `pulse` for green/gold dots
- `typing` for chat 3-dot indicator
- Smooth slide-ins via `transform` + `cubic-bezier(0.32, 0.72, 0.24, 1)` (Apple-feel easing)
- Hover lifts via `transform: translateY(-1px)` + shadow change

### Contract page specifics

The signed contract page (step 6 of the onboarding funnel) has hard rules:
- **No bold elements** anywhere in the contract text — apply `font-weight: 400 !important` to `.contract-scroll, .contract-scroll *`
- Contract scroll has `max-height: 280px`, `font-size: 12px`, color `text-mid`, line-height 1.6
- Article headers same size as body, only separated by spacing
- No yellow background, no progress bar
- Discrete gray scrollbar (4px wide)
- 13 articles preserved verbatim (don't rewrite legal copy)
- Acceptance text: "J'ai lu et j'accepte le contrat de prestation et les CGV de Paragon IA. Je commande un pack de [X] demandes de rendez-vous qualifiés (total [Y]€ prélevé au fur et à mesure, [Z]€ par demande livrée). Je m'engage à payer la totalité et je reconnais qu'il n'y a pas de garantie de résultat commercial."

---

## Trust signals

When showing media logos as social proof:
- **bfmtvlogovector.png** (BFM TV)
- **Le_Point_Logo_svg.png** (Le Point)
- **entrepreneurs_com.png** (Entrepreneurs.com)

These all have white backgrounds. On white pages, apply `mix-blend-mode: multiply` to make them blend cleanly:

```css
.media-logo { mix-blend-mode: multiply; }
```

Don't recolor them. Don't add borders. Don't crop them.

---

## Distinguishing Paragon IA from sister brand App Accelerator

Imran also runs **App Accelerator** (app-accelerator.com) — a premium mobile app development agency. Both brands share the same designer (Imran) and similar minimalist philosophy, BUT they have different visual identities. Don't mix them up:

| | Paragon IA | App Accelerator |
|---|---|---|
| Background | Cream warm `#FAF8F3` | Near-black `#050505` |
| Text | Navy `#0B1320` | White |
| Accent | Gold `#C2984C` | None (white solid buttons) |
| Headings | Brushstroke gold underline | Tight letter-spacing -2.5px |
| Font | ParagonInter | Inter (300-900) |
| Tone | Direct, warm, French entrepreneur | Premium, technical, founder-direct |

**If the conversation is about App Accelerator, this skill does not apply.** Look for context cues: mentions of mobile app development, app-accelerator.com domain, ClickFunnels VSL pages for clinics/dance studios/renovation niches.

---

## Approach when starting a new Paragon IA asset

1. **Read this skill first** before writing any code.
2. **Confirm the asset type** (landing page? funnel step? platform UI? email? slide?). The constraints vary slightly per type.
3. **Copy the design tokens** verbatim from this skill into the new file's `:root`.
4. **Set up the font** via the `@font-face` rule above.
5. **Use the signature devices** (eyebrow + brushstroke title + cards + agent compte rendu) where they fit.
6. **Apply the hard constraints** at every step. When in doubt, re-read the "Hard constraints — NEVER violate" section above.
7. **Stay in French**. Use vouvoiement. No corporate filler. No "tu".
8. **Validate visually** when possible (screenshot via Playwright if available) before delivering.
9. **Deliver as a single HTML file** unless the user specifies otherwise.

---

## Quick-reference starter scaffold

A minimal Paragon IA HTML page starter. Copy this when starting fresh:

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Paragon IA · [Page name]</title>
<style>
@font-face {
    font-family: 'ParagonInter';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2') format('woff2-variations'),
         url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50ojIZjclGo7TgI58.woff2') format('woff2');
}

:root {
    --navy: #0B1320; --navy-soft: #18223A;
    --gold: #C2984C; --gold-light: #D9B770; --gold-dark: #A8852D;
    --gold-cream: #FAEDD6; --gold-pale: #FBF6E9;
    --bg: #FAF8F3; --bg-warm: #F9F5EC; --white: #FFFFFF;
    --border: #E8E4DA; --border-soft: #F0EDE4;
    --text: #0F1724; --text-mid: #4A5468; --text-soft: #8A8D8A;
    --green: #16A34A; --green-bg: #DCFCE7;
    --amber: #D97706; --amber-bg: #FEF3C7;
    --red: #DC2626; --red-bg: #FEE2E2;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: 'ParagonInter', 'Inter', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
}

.brand-logo {
    display: inline-flex; align-items: baseline; gap: 4px;
    font-size: 21px; font-weight: 900; color: var(--navy);
    letter-spacing: -0.7px; position: relative;
}
.brand-logo .ai {
    font-size: 10px; color: var(--gold); font-weight: 700; letter-spacing: 1px;
}

.page-eyebrow {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 10.5px; font-weight: 800; color: var(--gold-dark);
    letter-spacing: 1.6px; text-transform: uppercase; margin-bottom: 8px;
}
.page-eyebrow::before {
    content: ''; width: 6px; height: 6px;
    border-radius: 50%; background: var(--gold);
}

.page-title {
    font-size: 30px; font-weight: 900; color: var(--text);
    letter-spacing: -1px; line-height: 1.1;
}
.page-title .accent { position: relative; display: inline-block; }
.page-title .accent::after {
    content: ''; position: absolute;
    bottom: 2px; left: -2px; right: -2px; height: 10px;
    background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
    opacity: 0.28; border-radius: 50%; z-index: -1; transform: skewX(-3deg);
}

.btn {
    padding: 12px 22px; border-radius: 8px;
    font-size: 13px; font-weight: 700;
    display: inline-flex; align-items: center; gap: 8px;
    transition: all 0.15s ease; cursor: pointer; border: none;
    font-family: inherit;
}
.btn-primary {
    background: linear-gradient(180deg, var(--gold) 0%, var(--gold-dark) 100%);
    color: white;
    box-shadow: 0 4px 10px rgba(194,152,76,0.25);
}
.btn-primary:hover { box-shadow: 0 6px 14px rgba(194,152,76,0.35); transform: translateY(-1px); }
</style>
</head>
<body>
    <div class="brand-logo">PARAGON <span class="ai">IA</span></div>
    <div class="page-eyebrow">Pour artisans & pros du bâtiment</div>
    <h1 class="page-title">Vos demandes de rendez-vous <span class="accent">qualifiés</span>.</h1>
    <!-- ... -->
</body>
</html>
```

---

## When the user asks for changes mid-iteration

The user (Imran) tends to give blunt, voice-transcribed feedback in French. Common patterns:

- **"C'est trop chic"** → Soften the editorial weight. Less serif feel, more modern SaaS.
- **"Ça fait vieillette / vieille tête"** → Modernize. Reduce decorative elements. Add micro-interactions.
- **"Ça fait trop logiciel"** → Simplify the UI. Remove sidebars, dashboards, stat cards. Keep just the essentials.
- **"C'est trop poussé"** → Reduce complexity. Fewer features, more whitespace.
- **"Pas de bleu / pas de noir"** → Audit every color in the file. Replace any blue gradient avatars with warm tones.
- **"Comme un Intercom"** → Floating bubble bottom-right, click to open, expandable to fullscreen.
- **"Ne mets pas de photo"** → Remove all `<img>` tags of people. Use initials in neutral squares or nothing.

When in doubt, **deliver less**, not more. Imran prefers a simple, premium, focused page over a feature-heavy "demo" that looks like a real CRM software.

---

## Files often referenced in the project

These are the asset files the user typically uploads or expects available:

- `logoparagon.png` — raw logo, navy on dark, must be recolored (see Pillow pipeline above)
- `bfmtvlogovector.png`, `Le_Point_Logo_svg.png`, `entrepreneurs_com.png` — media trust logos (white background, use `mix-blend-mode: multiply`)
- Marie Claire photo URL — placeholder, the user's dev will provide the real one. Use a navy square with "MC" gold initials as fallback.

---

End of skill.
