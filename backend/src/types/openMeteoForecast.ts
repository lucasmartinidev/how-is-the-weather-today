export type OpenMeteoForecast = {
  current?: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  current_units?: {
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    precipitation: string;
    wind_speed_10m: string;
  };
};
