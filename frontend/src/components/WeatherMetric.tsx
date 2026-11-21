import type { LucideIcon } from 'lucide-react';

type WeatherMetricProps = {
  Icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
  caption: string;
};

export function WeatherMetric({ Icon, label, value, unit, caption }: WeatherMetricProps) {
  return (
    <article className="rounded-xl border border-emerald-950/[0.08] bg-white/75 p-4 shadow-sm shadow-emerald-950/[0.02] sm:p-5">
      <span className="mb-3 grid size-9 place-items-center rounded-lg bg-emerald-900/[0.06] text-emerald-800"><Icon size={18} /></span>
      <p className="text-[9px] font-bold tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-medium tracking-tight text-slate-800">{value}<span className="ml-1 text-sm font-normal text-slate-500">{unit}</span></p>
      <p className="mt-1 text-[10px] text-slate-400">{caption}</p>
    </article>
  );
}
