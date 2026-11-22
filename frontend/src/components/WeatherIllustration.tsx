import type { WeatherReport } from '../types/weatherReport';
type WeatherIllustrationProps = { report: WeatherReport };

export function WeatherIllustration({ report }: WeatherIllustrationProps) {
  return (
    <div className="weather-illustration" aria-hidden="true">
      <span className="weather-illustration__orbit weather-illustration__orbit--outer" />
      <span className="weather-illustration__orbit weather-illustration__orbit--inner" />
      <span className="weather-illustration__marker weather-illustration__marker--one" />
      <span className="weather-illustration__marker weather-illustration__marker--two" />
      <span className="weather-illustration__temperature">{Math.round(report.current.temperature)}<small>{report.units.temperature}</small></span>
      <span className="weather-illustration__live">LIVE</span>
    </div>
  );
}
