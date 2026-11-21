import type { WeatherReport } from '../types/weatherReport';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isWeatherLocation(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return typeof value.name === 'string' && (typeof value.region === 'string' || value.region === null)
    && typeof value.country === 'string' && typeof value.latitude === 'number'
    && typeof value.longitude === 'number' && (typeof value.timezone === 'string' || value.timezone === null);
}

function isCurrentWeather(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return typeof value.time === 'string' && typeof value.temperature === 'number'
    && typeof value.humidity === 'number' && typeof value.apparentTemperature === 'number'
    && typeof value.isDay === 'boolean' && typeof value.precipitation === 'number'
    && typeof value.weatherCode === 'number' && typeof value.windSpeed === 'number';
}

function isWeatherUnits(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return ['temperature', 'humidity', 'apparentTemperature', 'precipitation', 'windSpeed']
    .every((unit) => typeof value[unit] === 'string');
}

function isWeatherReport(value: unknown): value is WeatherReport {
  return isRecord(value) && isWeatherLocation(value.location)
    && isCurrentWeather(value.current) && isWeatherUnits(value.units);
}

function getErrorMessage(payload: unknown): string {
  if (isRecord(payload) && typeof payload.error === 'string') return payload.error;
  return 'Could not retrieve weather for this city.';
}

export async function fetchWeather(city: string, signal?: AbortSignal): Promise<WeatherReport> {
  const url = `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`;
  const response = await fetch(url, { signal });
  const payload: unknown = await response.json();
  if (!response.ok) throw new Error(getErrorMessage(payload));
  if (!isWeatherReport(payload)) throw new Error('The weather service returned invalid data.');
  return payload;
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    return (await fetch(`${API_BASE_URL}/health`)).ok;
  } catch {
    return false;
  }
}
