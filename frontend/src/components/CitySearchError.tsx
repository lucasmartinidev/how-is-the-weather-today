type CitySearchErrorProps = { message: string };

export function CitySearchError({ message }: CitySearchErrorProps) {
  return <p id="city-search-error" className="city-search__error" role="alert">{message}</p>;
}
