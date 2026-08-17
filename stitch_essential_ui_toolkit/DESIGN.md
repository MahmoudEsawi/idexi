---
name: Idexi Intelligent Core
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76767f'
  outline-variant: '#c6c6cf'
  surface-tint: '#515d84'
  primary: '#00020e'
  on-primary: '#ffffff'
  primary-container: '#0d1b3e'
  on-primary-container: '#7784ad'
  inverse-primary: '#b9c5f2'
  secondary: '#0058bc'
  on-secondary: '#ffffff'
  secondary-container: '#0070eb'
  on-secondary-container: '#fefcff'
  tertiary: '#000303'
  on-tertiary: '#ffffff'
  tertiary-container: '#002123'
  on-tertiary-container: '#00939b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b9c5f2'
  on-primary-fixed: '#0b1a3d'
  on-primary-fixed-variant: '#39456b'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#004493'
  tertiary-fixed: '#74f5ff'
  tertiary-fixed-dim: '#00dbe7'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered to project a brand personality of **Intelligent Reliability**. It balances the precision of data-driven event logistics with the innovative spirit of modern technology. The target audience includes corporate event planners, high-stakes logistics managers, and tech-forward stakeholders who value efficiency and professional polish.

The visual style is **Corporate / Modern** with subtle **Glassmorphic** accents. It utilizes high-contrast typography and deep depth layers to create an environment that feels secure yet forward-thinking. The interface focuses on clarity, utilizing generous negative space to reduce cognitive load in complex data environments.

## Colors

This color palette is anchored in trust and clarity. 

- **Primary (Deep Navy):** Used for primary navigation, headings, and high-impact containers to establish authority.
- **Secondary (Azure):** The main action color, used for primary buttons, active states, and focus indicators.
- **Tertiary (Cyan):** Used sparingly for "innovation" accents, data visualization peaks, and subtle gradients that echo the logo's energy.
- **Neutrals:** A slate-leaning grayscale ensures that text remains legible and UI borders feel integrated rather than harsh.

Backgrounds primarily utilize clean whites and very light grays to keep the workspace feeling open, while the Deep Navy is used as a "Surface-Inverse" for dark-mode-like sidebars or footers within the light theme.

## Typography

The system uses **Plus Jakarta Sans** for its friendly yet geometric and professional appearance. It provides the "tech-focused" warmth required for a modern SaaS brand. **Inter** is used for smaller labels and UI-specific elements (like tooltips or button text) due to its exceptional legibility and neutral character in dense layouts.

Headlines should always use tighter letter spacing to maintain a "locked-in" professional look. For data-heavy tables, use `label-md` for headers to ensure structural clarity.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Desktop (1440px+):** 40px margins with 24px gutters.
- **Tablet (768px - 1439px):** 24px margins with 20px gutters.
- **Mobile (Up to 767px):** 16px margins with 16px gutters.

Spacing is based on an 8px root system. Consistent vertical rhythm should be maintained by using `md` (24px) for component grouping and `lg` (48px) for section separation. Large dashboard views should favor "comfortable" density over "compact" density to ensure the "Intelligent" brand pillar is reflected in a non-cluttered UX.

## Elevation & Depth

Visual hierarchy is managed through **Tonal Layers** and **Ambient Shadows**. 

1.  **Level 0 (Base):** The canvas, usually `#F8FAFC`.
2.  **Level 1 (Cards/Surface):** Pure white `#FFFFFF` with a very soft, diffused shadow (0px 4px 20px rgba(13, 27, 62, 0.05)).
3.  **Level 2 (Popovers/Modals):** Pure white with a more defined shadow (0px 12px 32px rgba(13, 27, 62, 0.12)).

To nod to the logo's fluidity, use subtle background blurs (12px) on fixed navigation headers to create a sense of layering. Borders should be used sparingly, primarily in a low-contrast slate (`#E2E8F0`) to define input fields and table rows without adding visual noise.

## Shapes

The design system adopts a **Rounded** shape language to feel approachable and modern. 

- **Standard Elements:** Buttons, inputs, and small cards use a 0.5rem (8px) radius.
- **Large Containers:** Main content cards and feature sections use a 1rem (16px) radius to create a distinct, friendly frame.
- **Interactive Accents:** Floating Action Buttons (FABs) or search bars can utilize a `rounded-xl` (24px) or full pill-shape to distinguish them from structural UI elements.

## Components

### Buttons
- **Solid (Primary):** Azure background, white text. No border. On hover, darken slightly.
- **Outlined (Secondary):** 1.5px Azure border, Azure text, transparent background.
- **Ghost:** No border or background. Azure or Navy text. Used for low-emphasis actions.

### Form Inputs & Search
- **Fields:** 8px rounded corners, 1.5px border (`#E2E8F0`). On focus, the border changes to Azure with a 3px soft outer glow.
- **Search Bars:** Often pill-shaped with a subtle Navy-tinted glass effect when placed over imagery, or standard white when in-content.

### Navigation
- **Top Bar:** Fixed, semi-transparent white with backdrop-blur. 
- **Active State:** A bottom indicator or a subtle tonal shift to Azure.

### Cards
- Standard cards use the Level 1 shadow. 
- Cards should have a "Secondary" variant with a 1px border and no shadow for use in dashboard grids to avoid "shadow stacking" fatigue.