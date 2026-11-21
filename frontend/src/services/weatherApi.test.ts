import { afterEach, describe, expect, it, vi } from 'vitest';
import { checkApiHealth, fetchWeather } from './weatherApi';

const weatherReport = {
  location: { name: 'London', region: 'England', country: 'United Kingdom', latitude: 51.5, longitude: -0.12, timezone: 'Europe/London' },
  current: { time: '2026-05-12T10:00', temperature: 18.2, humidity: 62, apparentTemperature: 17.4, isDay: true, precipitation: 0, weatherCode: 2, windSpeed: 9.5 },
  units: { temperature: '°C', humidity: '%', apparentTemperature: '°C', precipitation: 'mm', windSpeed: 'km/h' },
};

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), { status, headers: { 'Content-Type': 'application/json' } });
}

afterEach(() => vi.unstubAllGlobals());

describe('weather API client', () => {
  it('requests the city through the backend and returns validated weather', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(weatherReport));
    vi.stubGlobal('fetch', fetchMock);
    await expect(fetchWeather('New York')).resolves.toEqual(weatherReport);
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain('city=New%20York');
  });

  it('shows the backend error when a city cannot be found', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ error: 'City not found.' }, 404)));
    await expect(fetchWeather('Atlantis')).rejects.toThrow('City not found.');
  });

  it('rejects malformed weather responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ current: {} })));
    await expect(fetchWeather('London')).rejects.toThrow('returned invalid data');
  });

  it('reports whether the backend health endpoint responds successfully', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ status: 'healthy' })));
    await expect(checkApiHealth()).resolves.toBe(true);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, 503)));
    await expect(checkApiHealth()).resolves.toBe(false);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    await expect(checkApiHealth()).resolves.toBe(false);
  });
});
