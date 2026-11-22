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
    <section aria-label="Search weather by city" className="city-search">
      <label htmlFor="city-search" className="city-search__label">Find your city</label>
      <form onSubmit={handleSubmit} className="city-search__form" aria-busy={isLoading}>
        <MapPin size={18} className="city-search__pin" aria-hidden="true" />
        <input id="city-search" type="search" value={city} onChange={(event) => onCityChange(event.target.value)} placeholder="Enter a city, e.g. San Francisco" aria-invalid={error !== ''} aria-describedby={error ? 'city-search-error' : undefined} />
        <button type="submit" aria-label={isLoading ? 'Searching' : 'Search weather'} disabled={!city.trim() || isLoading}>
          {isLoading ? <LoaderCircle size={17} className="is-spinning" /> : <Search size={17} />}
          <span>{isLoading ? 'Searching' : 'Search weather'}</span>
        </button>
      </form>
      {error && <p id="city-search-error" className="city-search__error" role="alert">{error}</p>}
      <CitySuggestions onSelect={(suggestedCity) => void onSearch(suggestedCity)} />
    </section>
  );
}
