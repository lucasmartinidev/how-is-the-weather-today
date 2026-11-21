import { Sun } from 'lucide-react';

export function DashboardHeading() {
  return (
    <section className="relative flex min-h-56 items-center justify-between overflow-hidden py-10">
      <div className="relative z-10">
        <p className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-emerald-800/70"><span className="h-px w-6 bg-amber-500" /> WEATHER, IN THE MOMENT</p>
        <h1 className="font-serif text-5xl leading-[1.02] tracking-tight text-slate-800 sm:text-6xl">A clearer view<br />of <em className="text-emerald-700">today.</em></h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">Current conditions, wherever the day takes you.</p>
      </div>
      <div className="relative mr-8 hidden size-40 place-items-center text-amber-500 md:grid" aria-hidden="true">
        <span className="absolute size-36 rounded-full border border-amber-900/15" />
        <span className="absolute size-48 rotate-45 rounded-[50%] border border-emerald-900/10" />
        <span className="grid size-20 place-items-center rounded-full bg-amber-100/70"><Sun size={42} strokeWidth={1.2} /></span>
      </div>
    </section>
  );
}
