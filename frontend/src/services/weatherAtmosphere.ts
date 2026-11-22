import type { WeatherReport } from '../types/weatherReport';

export type WeatherConditionTone = 'clear' | 'cloud' | 'fog' | 'rain' | 'snow' | 'storm' | 'variable';
export type TemperatureTone = 'freezing' | 'cold' | 'mild' | 'warm' | 'hot';
export type DayPhase = 'day' | 'night';
export type WeatherAppearance = { condition: WeatherConditionTone; temperature: TemperatureTone; light: DayPhase };

const WEATHER_TONES = new Map<number, WeatherConditionTone>([
  [0, 'clear'], [1, 'clear'], [2, 'cloud'], [3, 'cloud'], [45, 'fog'], [48, 'fog'],
  [51, 'rain'], [53, 'rain'], [55, 'rain'], [56, 'rain'], [57, 'rain'],
  [61, 'rain'], [63, 'rain'], [65, 'rain'], [66, 'rain'], [67, 'rain'],
  [71, 'snow'], [73, 'snow'], [75, 'snow'], [77, 'snow'], [80, 'rain'],
  [81, 'rain'], [82, 'rain'], [85, 'snow'], [86, 'snow'], [95, 'storm'],
  [96, 'storm'], [99, 'storm'],
]);
const FREEZING_CELSIUS = 0;
const COLD_CELSIUS = 10;
const MILD_CELSIUS = 20;
const WARM_CELSIUS = 28;

function getTemperatureCelsius(temperature: number, unit: string): number {
  return unit === '°F' ? (temperature - 32) * 5 / 9 : temperature;
}

function getTemperatureTone(temperatureCelsius: number): TemperatureTone {
  if (temperatureCelsius <= FREEZING_CELSIUS) return 'freezing';
  if (temperatureCelsius <= COLD_CELSIUS) return 'cold';
  if (temperatureCelsius <= MILD_CELSIUS) return 'mild';
  if (temperatureCelsius <= WARM_CELSIUS) return 'warm';
  return 'hot';
}

export function getWeatherAppearance(report: WeatherReport): WeatherAppearance {
  const { current, units } = report;
  const temperatureCelsius = getTemperatureCelsius(current.temperature, units.temperature);
  return {
    condition: WEATHER_TONES.get(current.weatherCode) ?? 'variable',
    temperature: getTemperatureTone(temperatureCelsius),
    light: current.isDay ? 'day' : 'night',
  };
}
