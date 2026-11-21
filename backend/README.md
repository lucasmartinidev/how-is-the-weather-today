# Weather Backend

The backend is a Node.js and Express API that provides health status and current weather by city. It uses Open-Meteo's free Geocoding and Forecast APIs; no API key is required.

## Requirements

- Node.js
- npm

## Install and Run

Install dependencies and start the development server:

```bash
cd backend
npm install
npm run dev
```

The server listens on port `3000` by default. Set `PORT` to use another port:

```bash
PORT=3001 npm run dev
```

For a production build and start:

```bash
npm run build
npm start
```

## API

### `GET /health`

Returns the backend health status and the time of the check.

```json
{
  "status": "healthy",
  "timestamp": "2026-11-21T12:00:00.000Z"
}
```

### `GET /api/weather?city=<city>`

Looks up the city with Open-Meteo Geocoding, then returns its current conditions from the Forecast API. The `city` query parameter is required, must contain no more than 100 characters, and should be URL-encoded.

Example:

```bash
curl "http://localhost:3000/api/weather?city=London"
```

The response contains the matched location, current measurements, and their units:

```json
{
  "location": {
    "name": "London",
    "region": "England",
    "country": "United Kingdom",
    "latitude": 51.5,
    "longitude": -0.12,
    "timezone": "Europe/London"
  },
  "current": {
    "time": "2026-11-21T12:00",
    "temperature": 12.4,
    "humidity": 72,
    "apparentTemperature": 11.8,
    "isDay": true,
    "precipitation": 0,
    "weatherCode": 2,
    "windSpeed": 8.1
  },
  "units": {
    "temperature": "°C",
    "humidity": "%",
    "apparentTemperature": "°C",
    "precipitation": "mm",
    "windSpeed": "km/h"
  }
}
```

The sample values are illustrative; actual measurements depend on the city and request time.

Errors use an `{ "error": "..." }` JSON body. The endpoint returns `400` for a missing or invalid city, `404` when no city matches, and `502` when Open-Meteo is unavailable or returns incomplete data.

## Configuration

- `PORT`: HTTP port; defaults to `3000`.
- No Open-Meteo API key or other weather credentials are needed.

## Tests and Build

```bash
npm test
npm run build
```

`npm test` runs Vitest with coverage checks. The suite uses mocked Open-Meteo responses and enforces the configured minimum coverage threshold.

## Source Layout

- `src/routes/`: HTTP route handlers.
- `src/services/`: city validation and weather lookup behavior.
- `src/data/`: Open-Meteo requests and response mapping.
- `src/types/`: backend response and provider types.
- `src/app.ts`: Express application setup, exported for tests.
- `src/index.ts`: server startup and shutdown signal handling.
