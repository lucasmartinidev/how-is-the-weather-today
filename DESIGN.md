---
name: "How Is The Weather Today?"
description: "Condition-led weather observations on a responsive chart-navy field."
colors:
  page-ground: "#06111f"
  deep-navy: "#071629"
  scene-default-mid: "#0c2037"
  scene-day-deep: "#0b2035"
  scene-day-mid: "#112a44"
  scene-night-deep: "#040b17"
  scene-night-mid: "#081629"
  copy-main: "#f2f7fc"
  copy-muted: "#b7c8d8"
  divider: "rgb(207 226 242 / 20%)"
  condition-clear: "#ffd174"
  condition-cloud: "#c6d3ed"
  condition-fog: "#d9e3e9"
  condition-rain: "#72dcf2"
  condition-snow: "#a8ebff"
  condition-storm: "#c4a7ff"
  condition-variable: "#a8d5e8"
  condition-wash-clear: "#713c54"
  condition-wash-cloud: "#294e79"
  condition-wash-fog: "#536d7a"
  condition-wash-rain: "#006477"
  condition-wash-snow: "#3876a7"
  condition-wash-storm: "#5b2e86"
  condition-wash-variable: "#1d4d69"
  thermal-freezing: "#8de9ff"
  thermal-cold: "#85d8f4"
  thermal-mild: "#f4cd7a"
  thermal-warm: "#ffae70"
  thermal-hot: "#ff7967"
  thermal-wash-freezing: "#065f76"
  thermal-wash-cold: "#115873"
  thermal-wash-mild: "#674a16"
  thermal-wash-warm: "#773819"
  thermal-wash-hot: "#862c22"
  status-online: "#77e0b4"
  status-offline: "#ff887f"
  error-copy: "#ffc0b8"
  placeholder-copy: "#9fb1c3"
typography:
  display:
    fontFamily: '"Bodoni Moda", "Azeret Mono", serif'
    fontSize: "clamp(2.35rem, 5vw, 4.1rem)"
    fontWeight: 520
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  title:
    fontFamily: '"Bodoni Moda", "Azeret Mono", serif'
    fontSize: "clamp(1.75rem, 3.4vw, 2.55rem)"
    fontWeight: 520
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  body:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  data:
    fontFamily: '"Azeret Mono", ui-monospace, monospace'
    fontSize: "clamp(4rem, 7.4vw, 6rem)"
    fontWeight: 300
    lineHeight: 0.94
    letterSpacing: "-0.075em"
  label:
    fontFamily: '"Azeret Mono", ui-monospace, monospace'
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.025em"
rounded:
  sm: "7px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  compact-panel: "14px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  search-field:
    backgroundColor: "rgb(5 16 30 / 58%)"
    textColor: "{colors.copy-main}"
    rounded: "{rounded.lg}"
    padding: "7px 8px 7px 16px"
  search-action:
    backgroundColor: "var(--condition-color, #f2c16d)"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.md}"
    padding: "0 17px"
  city-suggestion:
    backgroundColor: "transparent"
    textColor: "{colors.copy-main}"
    rounded: "{rounded.sm}"
    padding: "4px 11px"
---

# Design System: How Is The Weather Today?

## Overview

**Creative North Star: "Atlas de Órbita"**

The dashboard is a condition-led celestial observation interface: a vivid, climate-responsive instrument set against chart navy. Weather condition is the leading signal; temperature modulates warmth, while day or night sets scene luminance. Chalk text, restrained rules, and precise orbital geometry keep attention on measured conditions rather than decorative spectacle.

The display pairing puts locally bundled Bodoni Moda italic on the dashboard heading and city name, locally bundled Azeret Mono on measured data, and native system UI on controls and supporting copy. The orbit illustration is abstract visual language, not a plot of astronomical or geographic data. The standard dashboard retains search, suggestions, service status, current conditions, detail metrics, loading and error states, and attribution; its interface copy remains English.

**Key Characteristics:**
- Weather condition leads; temperature provides warm/cool modulation; day/night controls scene luminance.
- Bodoni Moda italic frames the heading and city; Azeret Mono marks measured data.
- Fine orbital geometry sits on a layered navy field without implying astronomical data.
- A standard responsive dashboard keeps search, status, conditions, details, and attribution in view.

## Colors

The palette pairs a deep chart-navy foundation with chalk and blue-gray text, then lets condition and thermal state supply the vivid color.

### Primary
- **Condition accents and washes:** `condition-*` and `condition-wash-*` cover clear, cloud, fog, rain, snow, storm, and variable states. Accents mark the current condition; matching washes tint the atmospheric field.

**The Condition-First Rule.** Weather condition leads the visual signal; temperature supplies warm/cool modulation, and day/night controls scene luminance.

### Secondary
- **Thermal accents and washes:** `thermal-*` and `thermal-wash-*` cover freezing, cold, mild, warm, and hot states. They tune the temperature emphasis and secondary background wash without replacing the condition signal.

### Neutral
- **Chart foundation:** `page-ground`, `deep-navy`, `scene-default-mid`, `scene-day-*`, and `scene-night-*` build the chart-navy scene and its day/night luminance shift.
- **Reading hierarchy:** `copy-main`, `copy-muted`, and `divider` separate primary readings, supporting copy, and fine structure.

### Tertiary
- **Status and recovery:** `status-online`, `status-offline`, `error-copy`, and `placeholder-copy` distinguish service feedback, search errors, and empty-field guidance. The checking indicator reuses the clear-condition accent.

## Typography

**Display Font:** Bodoni Moda italic (with Azeret Mono and serif fallbacks)
**Body Font:** Native system UI sans-serif
**Label/Mono Font:** Azeret Mono (with system monospace fallback)

**Character:** Bodoni's high-contrast italic gives the heading and city name an editorial, sky-observer character. Azeret Mono makes temperatures, coordinates, timestamps, and compact labels feel measured; native system text keeps controls familiar.

### Hierarchy
- **Display** (Bodoni Moda italic, responsive): the dashboard's lead heading.
- **Title** (Bodoni Moda italic): the current city name and empty-state heading.
- **Data** (Azeret Mono, tabular numerals): the large temperature and metric values.
- **Body** (native system UI): instructions, place details, conditions, and supporting copy.
- **Label** (Azeret Mono, compact and often uppercase): search labels, section metadata, and metric labels.

## Layout

The dashboard is a centered, single-column instrument panel with a restrained header, a wide search row, and a dominant current-conditions panel above the metric grid. On desktop the content caps at 1216px with 64px outer gutters; the populated first view was reviewed at 1440x900. At 680px and below the layout tightens to 36px gutters, the weather illustration moves beside the city reading, and four metric columns become a two-by-two grid. At 365px and below the gutter narrows again to 28px; the search action becomes icon-only while retaining its accessible name, and suggestions may wrap. The 390px mobile view and 320px width were checked without horizontal overflow. The footer stacks on mobile.

## Elevation & Depth

Depth comes from layered radial and linear navy gradients, translucent panel fills, and fine borders rather than box shadows. Condition and thermal washes spread softly behind content; the outlined hero panel stays readable over them. State transitions are restrained, and reduced-motion preferences shorten animation and transition durations.

## Shapes

Controls and panels use gently rounded corners, while status marks and the atlas use precise circles and thin ellipses. Borders are light, low-contrast rules; the orbit is clipped within the weather panel and remains abstract rather than charting a celestial body or coordinate system.

## Components

### Buttons
- **Character:** A clear, compact search action whose fill follows the active condition accent.
- **Shape:** Gently rounded (`rounded.md`); it has a 44px minimum target height and becomes icon-only on narrow screens.
- **Hover / Focus:** Hover brightens and lifts slightly. Keyboard focus uses the global 3px thermal-color outline with a 3px offset; disabled search is visibly subdued.

### Chips
- **Style:** Suggested cities are transparent, lightly bordered buttons with compact labels and `rounded.sm` corners.
- **State:** Hover shifts border and text to the condition accent and adds a faint white tint; they wrap as needed on mobile.

### Cards / Containers
- **Corner Style:** The current-weather and empty/loading panels use `rounded.xl`, tightening to `rounded.compact-panel` on mobile.
- **Background:** Translucent deep surfaces layer over the condition and thermal washes; no shadow is added.
- **Border:** A fine divider line frames the panels and metric grid.
- **Internal Padding:** The weather hero has a compact header/footer and a generous central reading area; the metric grid is separated by rules rather than individual raised cards.

### Inputs / Fields
- **Style:** The search form is a dark translucent, gently rounded field with a location mark and a familiar text input.
- **Focus:** Focus within changes the border and deepens the field fill using the thermal accent.
- **Error / Disabled:** Search errors sit directly below the field in a warm light-red tone; the action button dims while unavailable or loading.

### Navigation
- The only navigation is the compact suggested-city row below search. It remains a labeled group of ordinary buttons rather than a separate menu system.

### Condition Atlas
- The signature weather hero pairs the city, location, temperature, condition, timestamp, and live-update labels with an abstract orbital illustration. The orbit and markers are decorative geometry, not astronomical data.

**The Abstract Atlas Rule.** Orbital geometry is an abstract observation mark, never a plot of astronomical data.

## Do's and Don'ts

### Do:
- **Do** keep condition as the leading visual signal, temperature as warm/cool modulation, and day/night as the scene-luminance control.
- **Do** use Bodoni Moda italic for the heading and city name, Azeret Mono for measured values, and native system UI for controls.
- **Do** keep condition meaning explicit in text and weather iconography; color is an accent, not the only signal.
- **Do** preserve the orbit as abstract geometry and keep search, status, details, and attribution in the standard dashboard flow.

### Don't:
- **Don't** imply astronomical, orbital, or geographic data in the abstract atlas illustration.
- **Don't** let a vivid background wash compete with readable chalk text or measured values.
- **Don't** add box shadows to create depth; the implemented system uses tonal layering and fine borders.
