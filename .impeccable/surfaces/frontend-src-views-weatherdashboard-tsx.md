---
version: 1
slug: "frontend-src-views-weatherdashboard-tsx"
primary_target: "frontend/src/views/WeatherDashboard.tsx"
related_targets: []
---

## Scope

`frontend/src/views/WeatherDashboard.tsx`, the primary web dashboard. Mode: Operate.

## Audience and Job

People evaluating the developer demonstration search for a city and scan its current weather. Keep the English UI, city search, suggested cities, service health, current measurements, loading and error states, and Open-Meteo attribution. The confirmed product name is "How Is The Weather Today?" The first read is city, temperature, and condition.

## Direction contract

THESIS: Make the current atmosphere legible as a condition-led celestial observation, not a generic forecast-card layout. Keep the ordinary dashboard task and familiar web controls in charge.

OWN-WORLD: Use a deep chart-navy ground, chalk-white text, Bodoni Moda italic for the display heading and city name, Azeret Mono for measured values, and restrained orbital geometry. Weather condition selects the dominant field color; temperature shifts a separate thermal light from cold to warm; day/night changes the field's luminance. Keep chart marks precise and data-tied, never imply astronomy data.

STORY: The visitor sees the canonical name and API status, searches or picks a city, then reads its current condition and temperature before the supporting measurements. The signature move is the condition-driven sky field and focused orbital mark changing with each real weather result.

FIRST VIEWPORT: At 1440x900, place a compact product/status header above the existing title and subcopy, then a full-width city search and suggested cities. The two-column current-condition plate follows: actual location, temperature, condition and time beside a small orbital chart mark. Put feels-like, humidity, wind and precipitation in one aligned four-column reading row, with Open-Meteo attribution at the bottom. Search remains the primary action.

FORM: Atlas de Órbita, assigned candidate 5 of 7. seed:6ce43f3e58f793fa.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
