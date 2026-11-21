import type { WeatherReport } from '../types/weatherReport';
import { getWeatherCondition } from '../services/weatherPresentation';

type WeatherIllustrationProps = { report: WeatherReport };

export function WeatherIllustration({ report }: WeatherIllustrationProps) {
  const { Icon } = getWeatherCondition(report.current.weatherCode, report.current.isDay);
  return (
    <div className="absolute right-[4%] top-1/2 hidden size-56 -translate-y-1/2 place-items-center text-amber-100/90 sm:grid" aria-hidden="true">
      <span className="absolute size-36 rounded-full border border-amber-100/20 bg-amber-100/[0.04] shadow-[0_0_0_18px_rgba(245,240,215,0.025),0_0_0_46px_rgba(245,240,215,0.02)]" />
      <Icon size={104} strokeWidth={1} className="relative drop-shadow-lg" />
    </div>
  );
}
