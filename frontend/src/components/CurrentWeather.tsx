import { MapPin } from 'lucide-react';
import type { WeatherReport } from '../types/weatherReport';
import { getWeatherCondition } from '../services/weatherPresentation';

type CurrentWeatherProps = { report: WeatherReport };

export function CurrentWeather({ report }: CurrentWeatherProps) {
  const condition = getWeatherCondition(report.current.weatherCode, report.current.isDay);
  const ConditionIcon = condition.Icon;
  return (
    <div className="relative z-10">
      <h2 className="font-serif text-3xl text-white sm:text-4xl">{report.location.name}</h2>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-50/65"><MapPin size={13} />{[report.location.region, report.location.country].filter(Boolean).join(', ')}</p>
      <div className="mt-3 flex h-[82px] items-start">
        <span className="text-[76px] font-light leading-none tracking-[-0.08em]">{Math.round(report.current.temperature)}</span>
        <span className="mt-2 ml-2 text-xl text-emerald-50/70">{report.units.temperature}</span>
      </div>
      <p className="mt-1 flex items-center gap-2 text-sm text-emerald-50/85"><ConditionIcon size={17} className="text-amber-200" />{condition.label}</p>
    </div>
  );
}
