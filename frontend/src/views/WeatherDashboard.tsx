import { CitySearch } from '../components/CitySearch';
import { DashboardHeading } from '../components/DashboardHeading';
import { PageHeader } from '../components/PageHeader';
import { WeatherContent } from '../components/WeatherContent';
import { useApiStatus } from '../hooks/useApiStatus';
import { useWeather } from '../hooks/useWeather';

export function WeatherDashboard() {
  const apiStatus = useApiStatus();
  const { city, setCity, weather, error, isLoading, searchWeather } = useWeather();
  return (
    <main id="home" className="mx-auto min-h-screen w-full max-w-6xl px-5 pb-7 sm:px-8">
      <PageHeader status={apiStatus} />
      <DashboardHeading />
      <CitySearch city={city} error={error} isLoading={isLoading} onCityChange={setCity} onSearch={searchWeather} />
      <div className="mt-8"><WeatherContent city={city} isLoading={isLoading} weather={weather} /></div>
      <footer className="mt-7 flex flex-col justify-between gap-2 text-[10px] text-slate-400 sm:flex-row">
        <span>Made for following the sky, wherever you are.</span><span>Weather data provided by Open-Meteo</span>
      </footer>
    </main>
  );
}
