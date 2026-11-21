import { fetchCityWeather } from '../data/openMeteo';
import type { WeatherReport } from '../types/weatherReport';

export class WeatherServiceError extends Error {
  constructor(readonly statusCode: number, message: string) {
    super(message);
    this.name = 'WeatherServiceError';
  }
}

export async function getWeatherForCity(city: string): Promise<WeatherReport> {
  const normalizedCity = city.trim();
  if (!normalizedCity || normalizedCity.length > 100) {
    throw new WeatherServiceError(400, 'Enter a valid city name.');
  }
  try {
    const report = await fetchCityWeather(normalizedCity);
    if (!report) throw new WeatherServiceError(404, 'City not found. Check the name and try again.');
    return report;
  } catch (error) {
    if (error instanceof WeatherServiceError) throw error;
    throw new WeatherServiceError(502, 'The weather service is unavailable. Please try again shortly.');
  }
}
