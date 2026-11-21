# Weather Frontend

The frontend is a responsive React dashboard for looking up current weather by city. It displays the current temperature and conditions, feels-like temperature, humidity, wind speed, and precipitation. It also shows backend availability and suggested cities.

The browser sends requests only to the backend. The frontend does not call Open-Meteo directly.

## Requirements

- Node.js
- npm
- The backend running locally, unless `VITE_API_URL` points to a deployed backend

## Install and Run

Install dependencies and start the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

Vite serves the dashboard at `http://localhost:5173` by default. During development, requests to `/api` and `/health` are proxied to `http://localhost:3000`.

Run the backend in a separate terminal. See the [backend README](../backend/README.md) for setup and API details.

## Backend Configuration

When the backend is hosted at a different origin, set `VITE_API_URL` to its base URL before running or building the frontend. Leave it unset when using the default same-origin setup.

For example, when the backend is running on port `3001`:

```bash
VITE_API_URL=http://localhost:3001 npm run dev
```

For a production build with a separate backend origin:

```bash
VITE_API_URL=https://api.example.com npm run build
```

`VITE_API_URL` is a build-time setting. The backend must allow requests from the deployed frontend origin.

## Dashboard Behavior

- Enter a city name and submit the search form, or choose one of the suggested cities.
- The frontend calls the backend's `GET /api/weather?city=<city>` endpoint.
- The dashboard displays current conditions returned by the backend and shows readable loading and error states.
- The service indicator checks the backend's `GET /health` endpoint.

## Tests and Build

```bash
npm test           # Run Vitest and enforce coverage thresholds
npm run lint       # Run ESLint
npm run typecheck  # Check TypeScript types
npm run build      # Typecheck and create a production build in dist/
npm run preview    # Serve the production build locally
```

The component tests cover visible search behavior and weather results. API client tests mock backend responses so the suite does not depend on network access.

## Source Layout

- `src/views/`: dashboard screen composition.
- `src/components/`: search controls, weather summary, and detail cards.
- `src/hooks/`: weather lookup and backend status state.
- `src/services/`: backend API calls and weather presentation helpers.
- `src/types/`: frontend weather response types.
