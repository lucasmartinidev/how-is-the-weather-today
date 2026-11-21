import { useEffect, useRef, useState } from 'react';
import { fetchWeather } from '../services/weatherApi';
import type { WeatherReport } from '../types/weatherReport';

export function useWeather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherReport | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const requestController = useRef<AbortController | null>(null);
  useEffect(() => () => requestController.current?.abort(), []);
  const searchWeather = async (searchCity: string) => {
    const normalizedCity = searchCity.trim();
    if (!normalizedCity) return;
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    setCity(normalizedCity);
    setError('');
    setIsLoading(true);
    try {
      setWeather(await fetchWeather(normalizedCity, controller.signal));
    } catch (requestError) {
      if (!controller.signal.aborted) setError(requestError instanceof Error ? requestError.message : 'An unexpected error occurred.');
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  };
  return { city, setCity, weather, error, isLoading, searchWeather };
}
