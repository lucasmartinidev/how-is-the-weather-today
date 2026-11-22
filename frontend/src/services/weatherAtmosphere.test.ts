import { describe, expect, it } from 'vitest';
import type { WeatherReport } from '../types/weatherReport';
import { getWeatherAppearance, type TemperatureTone, type WeatherConditionTone } from './weatherAtmosphere';

function createReport(weatherCode: number, temperature: number, unit = '°C', isDay = true): WeatherReport {
  return {
    location: { name: 'London', region: 'England', country: 'United Kingdom', latitude: 51.5, longitude: -0.12, timezone: 'Europe/London' },
    current: { time: '2026-05-12T10:00', temperature, humidity: 62, apparentTemperature: 17.4, isDay, precipitation: 0, weatherCode, windSpeed: 9.5 },
    units: { temperature: unit, humidity: '%', apparentTemperature: unit, precipitation: 'mm', windSpeed: 'km/h' },
  };
}

describe('weather atmosphere', () => {
  it.each<[number, WeatherConditionTone]>([
    [0, 'clear'], [2, 'cloud'], [45, 'fog'], [51, 'rain'], [71, 'snow'], [95, 'storm'], [999, 'variable'],
  ])('maps weather code %i to the condition tone %s', (weatherCode, condition) => {
    expect(getWeatherAppearance(createReport(weatherCode, 18)).condition).toBe(condition);
  });

  it.each<[number, TemperatureTone]>([
    [-4, 'freezing'], [0, 'freezing'], [6, 'cold'], [10, 'cold'], [16, 'mild'],
    [20, 'mild'], [24, 'warm'], [28, 'warm'], [34, 'hot'],
  ])('maps %i degrees Celsius to the temperature tone %s', (temperature, tone) => {
    expect(getWeatherAppearance(createReport(0, temperature)).temperature).toBe(tone);
  });

  it('normalizes Fahrenheit before assigning the temperature tone', () => {
    expect(getWeatherAppearance(createReport(0, 68, '°F')).temperature).toBe('mild');
  });

  it('uses the observation day phase to set the scene light', () => {
    expect(getWeatherAppearance(createReport(0, 18, '°C', true)).light).toBe('day');
    expect(getWeatherAppearance(createReport(0, 18, '°C', false)).light).toBe('night');
  });
});
