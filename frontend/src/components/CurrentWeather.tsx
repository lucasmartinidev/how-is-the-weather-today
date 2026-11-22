import { MapPin } from 'lucide-react';
import type { WeatherReport } from '../types/weatherReport';
import { getWeatherCondition } from '../services/weatherPresentation';

type CurrentWeatherProps = { report: WeatherReport };

export function CurrentWeather({ report }: CurrentWeatherProps) {
  const condition = getWeatherCondition(report.current.weatherCode, report.current.isDay);
  const ConditionIcon = condition.Icon;
  return (
    <div className="current-weather">
      <h2>{report.location.name}</h2>
      <p className="current-weather__location"><MapPin size={14} aria-hidden="true" />{[report.location.region, report.location.country].filter(Boolean).join(', ')}</p>
      <div className="current-weather__temperature">
        <span>{Math.round(report.current.temperature)}</span>
        <span>{report.units.temperature}</span>
      </div>
      <p className="current-weather__condition"><ConditionIcon size={18} aria-hidden="true" />{condition.label}</p>
    </div>
  );
}
