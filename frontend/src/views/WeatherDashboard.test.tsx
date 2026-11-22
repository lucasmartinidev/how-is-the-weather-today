import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkApiHealth, fetchWeather } from '../services/weatherApi';
import type { WeatherReport } from '../types/weatherReport';
import { WeatherDashboard } from './WeatherDashboard';

vi.mock('../services/weatherApi', () => ({ checkApiHealth: vi.fn(), fetchWeather: vi.fn() }));

const report: WeatherReport = {
  location: { name: 'London', region: 'England', country: 'United Kingdom', latitude: 51.5, longitude: -0.12, timezone: 'Europe/London' },
  current: { time: '2026-05-12T10:00', temperature: 18.2, humidity: 62, apparentTemperature: 17.4, isDay: true, precipitation: 0, weatherCode: 2, windSpeed: 9.5 },
  units: { temperature: '°C', humidity: '%', apparentTemperature: '°C', precipitation: 'mm', windSpeed: 'km/h' },
};

const mockFetchWeather = vi.mocked(fetchWeather);
const mockCheckHealth = vi.mocked(checkApiHealth);

afterEach(() => cleanup());
beforeEach(() => {
  mockFetchWeather.mockReset();
  mockCheckHealth.mockReset().mockResolvedValue(true);
});

describe('weather dashboard', () => {
  it('shows an English search prompt and backend status', async () => {
    render(<WeatherDashboard />);
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    expect(screen.getByRole('searchbox', { name: 'Find your city' })).toBeTruthy();
    expect(await screen.findByText('Service online')).toBeTruthy();
  });

  it('searches through the backend and displays current city conditions', async () => {
    mockFetchWeather.mockResolvedValue(report);
    render(<WeatherDashboard />);
    fireEvent.change(screen.getByRole('searchbox', { name: 'Find your city' }), { target: { value: 'London' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search weather' }));
    expect(await screen.findByRole('heading', { name: 'London' })).toBeTruthy();
    expect(screen.getByText('Partly cloudy')).toBeTruthy();
    expect(screen.getByText('FEELS LIKE')).toBeTruthy();
    expect(mockFetchWeather).toHaveBeenCalledWith('London', expect.any(AbortSignal));
  });

  it('changes the scene attributes with the returned condition, temperature, and day phase', async () => {
    mockFetchWeather.mockResolvedValueOnce(report).mockResolvedValueOnce({
      ...report,
      current: { ...report.current, time: '2026-05-12T22:00', temperature: 33, isDay: false, weatherCode: 95 },
    });
    render(<WeatherDashboard />);
    const search = screen.getByRole('searchbox', { name: 'Find your city' });
    const world = document.querySelector('.weather-world');
    fireEvent.change(search, { target: { value: 'London' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search weather' }));
    await screen.findByRole('heading', { name: 'London' });
    expect(world?.getAttribute('data-weather')).toBe('cloud');
    expect(world?.getAttribute('data-temperature')).toBe('mild');
    expect(world?.getAttribute('data-light')).toBe('day');
    fireEvent.change(search, { target: { value: 'Tokyo' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search weather' }));
    await waitFor(() => expect(world?.getAttribute('data-weather')).toBe('storm'));
    expect(world?.getAttribute('data-temperature')).toBe('hot');
    expect(world?.getAttribute('data-light')).toBe('night');
  });

  it('announces a failed search and supports suggested city buttons', async () => {
    mockFetchWeather.mockRejectedValueOnce(new Error('City not found.'));
    render(<WeatherDashboard />);
    const search = screen.getByRole('searchbox', { name: 'Find your city' });
    fireEvent.click(screen.getByRole('button', { name: 'Tokyo' }));
    expect((await screen.findByRole('alert')).textContent).toContain('City not found.');
    expect(search.getAttribute('aria-invalid')).toBe('true');
    expect(search.getAttribute('aria-describedby')).toBe('city-search-error');
    await waitFor(() => expect(mockFetchWeather).toHaveBeenCalledWith('Tokyo', expect.any(AbortSignal)));
  });
});
