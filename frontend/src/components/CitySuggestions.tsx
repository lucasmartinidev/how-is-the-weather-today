const SUGGESTED_CITIES = ['New York', 'London', 'Tokyo', 'Sydney'];

type CitySuggestionsProps = { onSelect: (city: string) => void };

export function CitySuggestions({ onSelect }: CitySuggestionsProps) {
  return (
    <nav className="city-suggestions" aria-label="Suggested cities">
      <span>TRY</span>
      {SUGGESTED_CITIES.map((city) => (
        <button key={city} type="button" onClick={() => onSelect(city)}>{city}</button>
      ))}
    </nav>
  );
}
