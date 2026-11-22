type WeatherMetricProps = {
  label: string;
  value: string;
  unit: string;
  caption: string;
};

export function WeatherMetric({ label, value, unit, caption }: WeatherMetricProps) {
  return (
    <article className="weather-metric">
      <p className="weather-metric__label">{label}</p>
      <p className="weather-metric__value">{value}<span>{unit}</span></p>
      <p className="weather-metric__caption">{caption}</p>
    </article>
  );
}
