export type WeatherReport = {
  location: {
    name: string;
    region: string | null;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string | null;
  };
  current: {
    time: string;
    temperature: number;
    humidity: number;
    apparentTemperature: number;
    isDay: boolean;
    precipitation: number;
    weatherCode: number;
    windSpeed: number;
  };
  units: {
    temperature: string;
    humidity: string;
    apparentTemperature: string;
    precipitation: string;
    windSpeed: string;
  };
};
