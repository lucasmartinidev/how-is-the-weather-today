# How Is The Weather Today?

A full-stack weather dashboard that lets users search for a city and view its current weather. The React frontend sends requests to the Express backend, which retrieves location and weather data from Open-Meteo. No API key is required.

## Application Guides

- [Frontend README](frontend/README.md): dashboard features, setup, backend configuration, and frontend commands.
- [Backend README](backend/README.md): server setup, API endpoints, response format, and backend commands.

## Project Structure

```text
.
├── backend/   Express API and Open-Meteo integration
├── frontend/  React weather dashboard
└── README.md  Project overview and quick start
```

The frontend and backend are independent applications. Each has its own `package.json` and lock file, so install dependencies and run scripts from each application directory. There is no root `package.json`.

## Requirements

- Node.js
- npm

## Quick Start

Install dependencies in each application:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

Start the backend and frontend in separate terminals:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

The backend runs at `http://localhost:3000` and the Vite frontend at `http://localhost:5173`. In development, Vite proxies `/api` and `/health` requests to the backend.

## Weather Request Flow

1. The user enters a city in the frontend or chooses a suggested city.
2. The frontend requests `GET /api/weather?city=<city>` from the backend.
3. The backend uses Open-Meteo Geocoding to find coordinates, then requests current conditions from the Open-Meteo Forecast API.
4. The backend returns the matched location, current measurements, and units for the dashboard to display.

The frontend does not call Open-Meteo directly. The backend also exposes `GET /health` for the frontend's service status indicator.

## Tests and Validation

Run the frontend checks from `frontend/`:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Run backend tests and build from `backend/`:

```bash
npm test
npm run build
```

Both test scripts run Vitest with coverage thresholds.

## Configuration

- Backend `PORT` sets the server port and defaults to `3000`.
- Frontend `VITE_API_URL` sets the backend base URL for deployments where frontend and backend use different origins. It can also point local development to a backend on a non-default port.
- Open-Meteo is free to use for this application and does not require an API key.
