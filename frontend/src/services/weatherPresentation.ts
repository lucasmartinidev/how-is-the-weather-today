import {
  Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow,
  CloudSun, Moon, Sun, type LucideIcon,
} from 'lucide-react';

export type WeatherCondition = { label: string; Icon: LucideIcon };

const WEATHER_CONDITIONS: Record<number, WeatherCondition> = {
  2: { label: 'Partly cloudy', Icon: CloudSun },
  3: { label: 'Overcast', Icon: Cloud },
  45: { label: 'Fog', Icon: CloudFog },
  48: { label: 'Rime fog', Icon: CloudFog },
  51: { label: 'Light drizzle', Icon: CloudDrizzle },
  53: { label: 'Drizzle', Icon: CloudDrizzle },
  55: { label: 'Heavy drizzle', Icon: CloudDrizzle },
  56: { label: 'Freezing drizzle', Icon: CloudDrizzle },
  57: { label: 'Heavy freezing drizzle', Icon: CloudDrizzle },
  61: { label: 'Light rain', Icon: CloudRain },
  63: { label: 'Rain', Icon: CloudRain },
  65: { label: 'Heavy rain', Icon: CloudRain },
  66: { label: 'Freezing rain', Icon: CloudRain },
  67: { label: 'Heavy freezing rain', Icon: CloudRain },
  71: { label: 'Light snow', Icon: CloudSnow },
  73: { label: 'Snow', Icon: CloudSnow },
  75: { label: 'Heavy snow', Icon: CloudSnow },
  77: { label: 'Snow grains', Icon: CloudSnow },
  80: { label: 'Rain showers', Icon: CloudRain },
  81: { label: 'Rain showers', Icon: CloudRain },
  82: { label: 'Heavy rain showers', Icon: CloudRain },
  85: { label: 'Snow showers', Icon: CloudSnow },
  86: { label: 'Heavy snow showers', Icon: CloudSnow },
  95: { label: 'Thunderstorm', Icon: CloudLightning },
  96: { label: 'Thunderstorm with hail', Icon: CloudLightning },
  99: { label: 'Thunderstorm with heavy hail', Icon: CloudLightning },
};

export function getWeatherCondition(code: number, isDay: boolean): WeatherCondition {
  if (code === 0) return { label: 'Clear sky', Icon: isDay ? Sun : Moon };
  if (code === 1) return { label: 'Mainly clear', Icon: isDay ? Sun : Moon };
  return WEATHER_CONDITIONS[code] ?? { label: 'Variable conditions', Icon: isDay ? CloudSun : Cloud };
}

export function formatWeatherDate(time: string): string {
  const [year, month, day] = time.split('T')[0].split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    .format(new Date(year, month - 1, day, 12));
}
