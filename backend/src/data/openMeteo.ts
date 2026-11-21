import type { OpenMeteoForecast } from '../types/openMeteoForecast';
import type { OpenMeteoLocation } from '../types/openMeteoLocation';
import type { WeatherReport } from '../types/weatherReport';
import { buildWeatherReport } from './weatherMapper';

type GeocodingPayload = { results?: OpenMeteoLocation[] };

const REQUEST_TIMEOUT_MS = 10_000;

export async function fetchCityWeather(city: string): Promise<WeatherReport | null> {
  const location = await geocodeCity(city);
  if (!location) return null;
  return buildWeatherReport(location, await fetchForecast(location));
}

async function geocodeCity(city: string): Promise<OpenMeteoLocation | null> {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.search = new URLSearchParams({ name: city, count: '1', language: 'en', format: 'json' }).toString();
  const payload = await fetchOpenMeteo<GeocodingPayload>(url);
  return payload.results?.[0] ?? null;
}

async function fetchForecast(location: OpenMeteoLocation): Promise<OpenMeteoForecast> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    timezone: 'auto',
  }).toString();
  return fetchOpenMeteo<OpenMeteoForecast>(url);
}

async function fetchOpenMeteo<T>(url: URL): Promise<T> {
  const response = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!response.ok) throw new Error('Open-Meteo request failed');
  return response.json() as Promise<T>;
}
