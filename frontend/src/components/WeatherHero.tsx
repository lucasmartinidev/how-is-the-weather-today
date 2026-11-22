import type { WeatherReport } from '../types/weatherReport';
import { formatWeatherDate } from '../services/weatherPresentation';
import { getWeatherAppearance } from '../services/weatherAtmosphere';
import { CurrentWeather } from './CurrentWeather';
import { WeatherIllustration } from './WeatherIllustration';

type WeatherHeroProps = { report: WeatherReport };

export function WeatherHero({ report }: WeatherHeroProps) {
  const localTime = report.current.time.split('T')[1]?.slice(0, 5) ?? '--:--';
  const appearance = getWeatherAppearance(report);
  return (
    <section aria-label={`Current weather in ${report.location.name}`} className="weather-hero" data-weather={appearance.condition} data-temperature={appearance.temperature} data-light={appearance.light}>
      <div className="weather-hero__header">
        <span className="weather-hero__label"><span aria-hidden="true" />CURRENT CONDITIONS</span>
        <time>{formatWeatherDate(report.current.time)}</time>
      </div>
      <div className="weather-hero__body"><CurrentWeather report={report} /><WeatherIllustration report={report} /></div>
      <footer className="weather-hero__footer">
        <span>Live weather</span><span>Updated at {localTime}</span>
      </footer>
    </section>
  );
}
