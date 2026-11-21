import { type FormEvent } from 'react';
import { LoaderCircle, MapPin, Search } from 'lucide-react';
import { CitySuggestions } from './CitySuggestions';

type CitySearchProps = {
  city: string;
  error: string;
  isLoading: boolean;
  onCityChange: (city: string) => void;
  onSearch: (city: string) => Promise<void>;
};

export function CitySearch({ city, error, isLoading, onCityChange, onSearch }: CitySearchProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSearch(city);
  };
  return (
    <section aria-label="Search weather by city" className="relative z-10 max-w-2xl">
      <label htmlFor="city-search" className="mb-2 block text-[10px] font-bold tracking-[0.16em] text-emerald-900/65">Find your city</label>
      <form onSubmit={handleSubmit} className="flex h-14 items-center gap-3 rounded-xl border border-emerald-950/10 bg-white/80 p-1.5 pl-4 shadow-sm shadow-emerald-950/[0.03] focus-within:border-emerald-800/40">
        <MapPin size={19} className="shrink-0 text-emerald-800/60" aria-hidden="true" />
        <input id="city-search" type="search" value={city} onChange={(event) => onCityChange(event.target.value)} placeholder="Enter a city, e.g. San Francisco" className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" />
        <button type="submit" disabled={!city.trim() || isLoading} className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-950 px-4 text-sm font-medium text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50">
          {isLoading ? <LoaderCircle size={17} className="animate-spin" /> : <Search size={17} />}
          <span className="hidden sm:inline">{isLoading ? 'Searching' : 'Search weather'}</span>
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-rose-700" role="alert">{error}</p>}
      <CitySuggestions onSelect={(suggestedCity) => void onSearch(suggestedCity)} />
    </section>
  );
}
