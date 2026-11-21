import type { WeatherReport } from '../types/weatherReport';
import { formatWeatherDate } from '../services/weatherPresentation';
import { CurrentWeather } from './CurrentWeather';
import { WeatherIllustration } from './WeatherIllustration';

type WeatherHeroProps = { report: WeatherReport };

export function WeatherHero({ report }: WeatherHeroProps) {
  const localTime = report.current.time.split('T')[1]?.slice(0, 5) ?? '--:--';
  return (
    <section aria-label={`Current weather in ${report.location.name}`} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#203b40] via-[#233f45] to-[#263c48] p-6 text-emerald-50 shadow-xl shadow-emerald-950/10 sm:p-8">
      <div className="relative z-10 flex items-center justify-between text-[10px] font-bold tracking-[0.16em] text-emerald-50/60">
        <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-300" />CURRENT CONDITIONS</span>
        <time className="font-medium tracking-normal capitalize">{formatWeatherDate(report.current.time)}</time>
      </div>
      <div className="relative flex min-h-52 items-center py-5"><CurrentWeather report={report} /><WeatherIllustration report={report} /></div>
      <footer className="relative z-10 flex justify-between border-t border-white/10 pt-3 text-[11px] text-emerald-50/65">
        <span>Live weather</span><span>Updated at {localTime}</span>
      </footer>
    </section>
  );
}
