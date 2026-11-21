const SUGGESTED_CITIES = ['New York', 'London', 'Tokyo', 'Sydney'];

type CitySuggestionsProps = { onSelect: (city: string) => void };

export function CitySuggestions({ onSelect }: CitySuggestionsProps) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Suggested cities">
      <span className="mr-1 text-[9px] font-bold tracking-[0.14em] text-slate-400">TRY</span>
      {SUGGESTED_CITIES.map((city) => (
        <button key={city} type="button" onClick={() => onSelect(city)} className="rounded-full bg-emerald-950/[0.05] px-3 py-1.5 text-xs text-emerald-900/70 transition hover:bg-emerald-950/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">{city}</button>
      ))}
    </div>
  );
}
