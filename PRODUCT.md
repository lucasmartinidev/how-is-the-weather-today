# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People viewing the application as a developer demonstration. They use it to try a city-based current-weather lookup.

## Product Purpose

Demonstrate an English-language, full-stack weather dashboard that lets someone search for a city and view its current conditions. Success means the conditions and key measurements are understandable at a glance and the lookup works end to end.

## Positioning

At-a-glance clarity is the confirmed product value. The demonstrated mechanism is a city lookup backed by Open-Meteo data through the application's API. No competitive or uniquely differentiated market position has been established.

## Operating Context

The dashboard runs in a web browser. A user enters a city name or selects one of the suggested cities. The frontend requests weather data from the backend and checks backend availability; the backend uses Open-Meteo geocoding and forecast APIs to retrieve current conditions. The backend must be reachable for lookups to work.

## Capabilities and Constraints

- Search for current weather by city or choose a suggested city.
- Display the matched location and current temperature, apparent temperature, humidity, wind speed, precipitation, and weather conditions, with units returned by the backend.
- Show loading and lookup error states, plus backend availability.
- The frontend retrieves weather data exclusively through the backend. The backend exposes `GET /api/weather?city=<city>` and `GET /health`.
- Open-Meteo is the upstream data source and requires no API key for this application.
- The implemented product provides current conditions, not a multi-day forecast or browser-based geolocation.
- User-facing dashboard text and API errors are in English.
- The existing implementation uses React 19, TypeScript, and Vite in `frontend/`, and Node.js, Express 5, and TypeScript in `backend/`.

## Brand Commitments

The canonical dashboard name is "How Is The Weather Today?" The existing "skyward" wordmark is not canonical and should not be retained in the UI.

## Evidence on Hand

The current frontend and backend implementations and their tests are the available product evidence. Weather results come from Open-Meteo. No user research, testimonials, comparative evidence, or market claims are documented; future work must not invent them.

## Product Principles

- Make current conditions easy to understand at a glance.
- Keep the city-to-weather lookup straightforward to exercise in the demonstration.
- Present sourced weather data and make service or lookup failures clear.
- Do not imply forecast or geolocation capabilities that are not implemented.
