import { CloudSun, Sun } from 'lucide-react';

type EmptyWeatherProps = { city: string; isLoading: boolean };

export function EmptyWeather({ city, isLoading }: EmptyWeatherProps) {
  return (
    <section className="mt-8 flex min-h-56 items-center gap-5 overflow-hidden rounded-2xl border border-emerald-950/[0.08] bg-white/60 p-6 sm:gap-10 sm:p-9" aria-live="polite" aria-busy={isLoading}>
      <div className="relative hidden size-36 shrink-0 place-items-center text-emerald-800/70 sm:grid" aria-hidden="true">
        <span className="absolute right-3 top-2 grid size-14 place-items-center rounded-full bg-amber-100 text-amber-600"><Sun size={31} /></span><CloudSun size={74} strokeWidth={1.2} className="relative mt-8 rounded-full bg-[#f5f6f0] p-2" />
      </div>
      <div>
        <p className="text-[9px] font-bold tracking-[0.17em] text-emerald-800/60">{isLoading ? 'ONE MOMENT' : 'YOUR NEXT DESTINATION'}</p>
        <h2 className="mt-3 font-serif text-2xl leading-tight text-slate-800 sm:text-3xl">{isLoading ? 'Taking a look outside.' : <>Your city's weather,<br />just a search away.</>}</h2>
        <p className="mt-2 text-xs leading-5 text-slate-500">{isLoading ? `Loading current conditions for ${city}.` : 'Search for a place above to see its current conditions.'}</p>
      </div>
    </section>
  );
}
