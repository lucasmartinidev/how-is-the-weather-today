import type { WeatherReport } from '../types/weatherReport';
import { WeatherMetric } from './WeatherMetric';

type WeatherDetailsProps = { report: WeatherReport };

export function WeatherDetails({ report }: WeatherDetailsProps) {
  const { current, units } = report;
  return (
    <section aria-labelledby="weather-details-heading" className="weather-details">
      <div className="weather-details__header">
        <h2 id="weather-details-heading">Weather details</h2>
        <p>{report.location.latitude.toFixed(2)}°, {report.location.longitude.toFixed(2)}°</p>
      </div>
      <div className="weather-details__grid">
        <WeatherMetric label="FEELS LIKE" value={String(Math.round(current.apparentTemperature))} unit={units.apparentTemperature} caption="What it feels like" />
        <WeatherMetric label="HUMIDITY" value={String(current.humidity)} unit={units.humidity} caption="Relative humidity" />
        <WeatherMetric label="WIND" value={String(Math.round(current.windSpeed))} unit={units.windSpeed} caption="Current wind speed" />
        <WeatherMetric label="PRECIPITATION" value={current.precipitation.toLocaleString('en-US')} unit={units.precipitation} caption="Current amount" />
      </div>
    </section>
  );
}
