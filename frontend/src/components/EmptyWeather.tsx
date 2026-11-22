import { CloudSun, Sun } from 'lucide-react';

type EmptyWeatherProps = { city: string; isLoading: boolean };

export function EmptyWeather({ city, isLoading }: EmptyWeatherProps) {
  return (
    <section className="empty-weather" aria-live="polite" aria-busy={isLoading}>
      <div className="empty-weather__diagram" aria-hidden="true">
        <span><Sun size={23} /></span><CloudSun size={72} strokeWidth={1.1} />
      </div>
      <div className="empty-weather__copy">
        <h2>{isLoading ? 'Taking a look outside.' : <>Your city's weather,<br />just a search away.</>}</h2>
        <p>{isLoading ? `Loading current conditions for ${city}.` : 'Search for a place above to see its current conditions.'}</p>
      </div>
    </section>
  );
}
