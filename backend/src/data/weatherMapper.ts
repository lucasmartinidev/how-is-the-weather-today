import type { OpenMeteoForecast } from '../types/openMeteoForecast';
import type { OpenMeteoLocation } from '../types/openMeteoLocation';
import type { WeatherReport } from '../types/weatherReport';

export function buildWeatherReport(location: OpenMeteoLocation, forecast: OpenMeteoForecast): WeatherReport {
  const current = forecast.current;
  const units = forecast.current_units;
  if (!current || !units) throw new Error('Open-Meteo returned incomplete weather data');
  return { location: mapLocation(location), current: mapCurrentWeather(current), units: mapWeatherUnits(units) };
}

function mapLocation(location: OpenMeteoLocation): WeatherReport['location'] {
  return {
    name: location.name,
    region: location.admin1 ?? null,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone ?? null,
  };
}

function mapCurrentWeather(current: NonNullable<OpenMeteoForecast['current']>): WeatherReport['current'] {
  return {
    time: current.time,
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    apparentTemperature: current.apparent_temperature,
    isDay: current.is_day === 1,
    precipitation: current.precipitation,
    weatherCode: current.weather_code,
    windSpeed: current.wind_speed_10m,
  };
}

function mapWeatherUnits(units: NonNullable<OpenMeteoForecast['current_units']>): WeatherReport['units'] {
  return {
    temperature: units.temperature_2m,
    humidity: units.relative_humidity_2m,
    apparentTemperature: units.apparent_temperature,
    precipitation: units.precipitation,
    windSpeed: units.wind_speed_10m,
  };
}
