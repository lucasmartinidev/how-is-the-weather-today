import { CitySearch } from '../components/CitySearch';
import { DashboardHeading } from '../components/DashboardHeading';
import { PageHeader } from '../components/PageHeader';
import { WeatherContent } from '../components/WeatherContent';
import { useApiStatus } from '../hooks/useApiStatus';
import { useWeather } from '../hooks/useWeather';
import { getWeatherAppearance } from '../services/weatherAtmosphere';

export function WeatherDashboard() {
  const apiStatus = useApiStatus();
  const { city, setCity, weather, error, isLoading, searchWeather } = useWeather();
  const appearance = weather ? getWeatherAppearance(weather) : null;
  return (
    <div className="weather-world" data-weather={appearance?.condition ?? 'variable'} data-temperature={appearance?.temperature ?? 'mild'} data-light={appearance?.light ?? 'night'}>
      <main id="home" className="weather-dashboard">
        <PageHeader status={apiStatus} />
        <DashboardHeading />
        <CitySearch city={city} error={error} isLoading={isLoading} onCityChange={setCity} onSearch={searchWeather} />
        <div className="weather-dashboard__content"><WeatherContent city={city} isLoading={isLoading} weather={weather} /></div>
        <footer className="dashboard-footer">
          <span>Made for following the sky, wherever you are.</span><span>Weather data provided by Open-Meteo</span>
        </footer>
      </main>
    </div>
  );
}
