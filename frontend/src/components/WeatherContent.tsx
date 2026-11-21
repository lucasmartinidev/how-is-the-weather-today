import type { WeatherReport } from '../types/weatherReport';
import { EmptyWeather } from './EmptyWeather';
import { WeatherDetails } from './WeatherDetails';
import { WeatherHero } from './WeatherHero';

type WeatherContentProps = { city: string; isLoading: boolean; weather: WeatherReport | null };

export function WeatherContent({ city, isLoading, weather }: WeatherContentProps) {
  if (!weather) return <EmptyWeather city={city} isLoading={isLoading} />;
  return <><WeatherHero report={weather} /><WeatherDetails report={weather} /></>;
}
