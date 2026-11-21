import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from './app';

const fetchMock = vi.fn<typeof fetch>();
const app = createApp();

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), { status, headers: { 'Content-Type': 'application/json' } });
}

function locationResponse(results: unknown[]): Response {
  return jsonResponse({ results });
}

function forecastResponse(current?: Record<string, unknown>): Response {
  return jsonResponse({
    current,
    current_units: {
      temperature_2m: '°C', relative_humidity_2m: '%', apparent_temperature: '°C',
      precipitation: 'mm', wind_speed_10m: 'km/h',
    },
  });
}

describe('weather API', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it('returns backend health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  it.each([
    { city: '', label: 'an empty city' },
    { city: 'x'.repeat(101), label: 'a city name over the limit' },
  ])('rejects $label without calling Open-Meteo', async ({ city }) => {
    const response = await request(app).get(`/api/weather?city=${encodeURIComponent(city)}`);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Enter a valid city name.');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns not found when geocoding has no matches', async () => {
    fetchMock.mockResolvedValueOnce(locationResponse([]));
    const response = await request(app).get('/api/weather?city=Nowhere');
    expect(response.status).toBe(404);
    expect(response.body.error).toContain('City not found');
  });

  it('returns current weather after geocoding the requested city', async () => {
    fetchMock
      .mockResolvedValueOnce(locationResponse([{
        name: 'London', latitude: 51.5, longitude: -0.12, country: 'United Kingdom', admin1: 'England', timezone: 'Europe/London',
      }]))
      .mockResolvedValueOnce(forecastResponse({
        time: '2026-05-12T10:00', temperature_2m: 18.2, relative_humidity_2m: 62,
        apparent_temperature: 17.4, is_day: 1, precipitation: 0, weather_code: 2, wind_speed_10m: 9.5,
      }));
    const response = await request(app).get('/api/weather?city=London');
    expect(response.status).toBe(200);
    expect(response.body.location.name).toBe('London');
    expect(response.body.current).toMatchObject({ temperature: 18.2, humidity: 62, isDay: true, windSpeed: 9.5 });
    expect(new URL(String(fetchMock.mock.calls[0]?.[0])).searchParams.get('language')).toBe('en');
    expect(new URL(String(fetchMock.mock.calls[1]?.[0])).searchParams.get('latitude')).toBe('51.5');
  });

  it('returns a gateway error when an Open-Meteo request fails', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 503));
    const response = await request(app).get('/api/weather?city=London');
    expect(response.status).toBe(502);
    expect(response.body.error).toContain('weather service is unavailable');
  });

  it('returns a gateway error when weather data is incomplete', async () => {
    fetchMock
      .mockResolvedValueOnce(locationResponse([{ name: 'London', latitude: 51.5, longitude: -0.12, country: 'United Kingdom' }]))
      .mockResolvedValueOnce(forecastResponse());
    const response = await request(app).get('/api/weather?city=London');
    expect(response.status).toBe(502);
  });
});
