import { describe, expect, it } from 'vitest';
import { formatWeatherDate, getWeatherCondition } from './weatherPresentation';

describe('weather presentation', () => {
  it('uses day and night icons for clear weather', () => {
    expect(getWeatherCondition(0, true).label).toBe('Clear sky');
    expect(getWeatherCondition(0, false).label).toBe('Clear sky');
    expect(getWeatherCondition(1, true).label).toBe('Mainly clear');
  });

  it('describes common cloudy, rainy, snowy, and storm conditions', () => {
    expect(getWeatherCondition(3, true).label).toBe('Overcast');
    expect(getWeatherCondition(61, true).label).toBe('Light rain');
    expect(getWeatherCondition(75, true).label).toBe('Heavy snow');
    expect(getWeatherCondition(95, true).label).toBe('Thunderstorm');
    expect(getWeatherCondition(999, true).label).toBe('Variable conditions');
  });

  it('formats the local observation date in English', () => {
    expect(formatWeatherDate('2026-05-12T10:00')).toBe('Tuesday, May 12');
  });
});
