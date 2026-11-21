import { CloudRain, Droplets, Thermometer, Wind } from 'lucide-react';
import type { WeatherReport } from '../types/weatherReport';
import { WeatherMetric } from './WeatherMetric';

type WeatherDetailsProps = { report: WeatherReport };

export function WeatherDetails({ report }: WeatherDetailsProps) {
  const { current, units } = report;
  return (
    <section aria-labelledby="weather-details-heading" className="mt-8">
      <div className="mb-4 flex items-end justify-between">
        <div><p className="text-[9px] font-bold tracking-[0.17em] text-emerald-800/60">AT A GLANCE</p><h2 id="weather-details-heading" className="mt-1 font-serif text-2xl text-slate-800">Weather details</h2></div>
        <p className="text-[10px] tabular-nums text-slate-400">{report.location.latitude.toFixed(2)}°, {report.location.longitude.toFixed(2)}°</p>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <WeatherMetric Icon={Thermometer} label="FEELS LIKE" value={String(Math.round(current.apparentTemperature))} unit={units.apparentTemperature} caption="What it feels like" />
        <WeatherMetric Icon={Droplets} label="HUMIDITY" value={String(current.humidity)} unit={units.humidity} caption="Relative humidity" />
        <WeatherMetric Icon={Wind} label="WIND" value={String(Math.round(current.windSpeed))} unit={units.windSpeed} caption="Current wind speed" />
        <WeatherMetric Icon={CloudRain} label="PRECIPITATION" value={current.precipitation.toLocaleString('en-US')} unit={units.precipitation} caption="Current amount" />
      </div>
    </section>
  );
}
