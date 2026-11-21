import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  LoaderCircle,
  MapPin,
  Moon,
  Search,
  Sun,
  Thermometer,
  Wind,
  type LucideIcon,
} from 'lucide-react'

type ApiStatus = 'checking' | 'online' | 'offline'

type WeatherResponse = {
  location: {
    name: string
    region: string | null
    country: string
    latitude: number
    longitude: number
    timezone: string | null
  }
  current: {
    time: string
    temperature: number
    humidity: number
    apparentTemperature: number
    isDay: number
    precipitation: number
    weatherCode: number
    windSpeed: number
  }
  units: {
    temperature: string
    humidity: string
    apparentTemperature: string
    precipitation: string
    windSpeed: string
  }
}

type ApiError = { error: string }
type WeatherCondition = { label: string; Icon: LucideIcon }

const apiBaseUrl = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
const suggestedCities = ['São Paulo', 'Rio de Janeiro', 'Lisboa', 'Tóquio']

function getWeatherCondition(code: number, isDay: number): WeatherCondition {
  if (code === 0) return { label: 'Céu limpo', Icon: isDay ? Sun : Moon }
  if (code === 1) return { label: 'Predominantemente limpo', Icon: isDay ? Sun : Moon }
  if (code === 2) return { label: 'Parcialmente nublado', Icon: CloudSun }
  if (code === 3) return { label: 'Nublado', Icon: Cloud }
  if (code === 45 || code === 48) return { label: 'Neblina', Icon: CloudFog }
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Garoa', Icon: CloudDrizzle }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Chuva', Icon: CloudRain }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Neve', Icon: CloudSnow }
  if ([95, 96, 99].includes(code)) return { label: 'Tempestade', Icon: CloudLightning }
  return { label: 'Condição variável', Icon: isDay ? CloudSun : Cloud }
}

function formatWeatherDate(time: string) {
  const [date] = time.split('T')
  const [year, month, day] = date.split('-').map(Number)

  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, day, 12))
}

function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking')
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const requestController = useRef<AbortController | null>(null)

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/health`, {
          signal: AbortSignal.timeout(5000),
        })
        setApiStatus(response.ok ? 'online' : 'offline')
      } catch {
        setApiStatus('offline')
      }
    }

    void checkApiStatus()
    const interval = setInterval(checkApiStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => () => requestController.current?.abort(), [])

  const searchWeather = async (searchCity: string) => {
    const normalizedCity = searchCity.trim()
    if (!normalizedCity) return

    requestController.current?.abort()
    const controller = new AbortController()
    requestController.current = controller
    setCity(normalizedCity)
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/weather?city=${encodeURIComponent(normalizedCity)}`,
        { signal: controller.signal },
      )
      const data: WeatherResponse | ApiError = await response.json()

      if (!response.ok || 'error' in data) {
        throw new Error('error' in data ? data.error : 'Não foi possível buscar o clima.')
      }

      setWeather(data)
    } catch (requestError) {
      if (controller.signal.aborted) return
      setError(requestError instanceof Error ? requestError.message : 'Ocorreu um erro inesperado.')
    } finally {
      if (!controller.signal.aborted) setIsLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void searchWeather(city)
  }

  const statusLabel = {
    checking: 'Verificando serviço',
    online: 'Serviço online',
    offline: 'Serviço indisponível',
  }[apiStatus]

  const condition = weather
    ? getWeatherCondition(weather.current.weatherCode, weather.current.isDay)
    : null

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Céu de Hoje, início">
          <span className="brand-mark"><CloudSun size={21} strokeWidth={1.8} /></span>
          <span>céu<span className="brand-dot">.</span>de hoje</span>
        </a>
        <div className="topbar-status">
          <span className="topbar-caption">CLIMA EM TEMPO REAL</span>
          <span className={`api-status api-status-${apiStatus}`}>
            <span className="status-dot" />
            {statusLabel}
          </span>
        </div>
      </header>

      <main id="inicio" className="dashboard">
        <section className="intro-section">
          <div className="intro-copy">
            <p className="eyebrow"><span /> SEU TEMPO, EM TEMPO REAL</p>
            <h1>Um novo olhar<br />para <em>o clima.</em></h1>
            <p className="intro-description">
              Descubra as condições de agora em qualquer lugar do mundo.
            </p>
          </div>
          <div className="intro-decoration" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="intro-sun"><Sun size={48} strokeWidth={1.15} /></div>
            <span className="decoration-caption">OLHE PARA CIMA</span>
          </div>
        </section>

        <section className="search-section" aria-label="Buscar clima por cidade">
          <label className="search-label" htmlFor="city-search">ENCONTRE SUA CIDADE</label>
          <form className="search-form" onSubmit={handleSubmit}>
            <MapPin className="search-pin" size={19} strokeWidth={1.8} aria-hidden="true" />
            <input
              id="city-search"
              type="search"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Digite uma cidade, ex.: São Paulo"
              autoComplete="off"
              aria-describedby={error ? 'search-error' : undefined}
            />
            <button className="search-button" type="submit" disabled={!city.trim()}>
              {isLoading
                ? <LoaderCircle className="spin" size={18} />
                : <Search size={18} strokeWidth={2} />}
              <span>{isLoading ? 'Buscando' : 'Buscar clima'}</span>
            </button>
          </form>
          {error && <p className="search-error" id="search-error" role="alert">{error}</p>}
          <div className="suggestions" aria-label="Sugestões de cidades">
            <span className="suggestions-label">EXPERIMENTE</span>
            {suggestedCities.map((suggestedCity) => (
              <button
                className="suggestion-chip"
                key={suggestedCity}
                type="button"
                onClick={() => void searchWeather(suggestedCity)}
              >
                {suggestedCity}
              </button>
            ))}
          </div>
        </section>

        {weather && condition ? (
          <section className="weather-results" aria-live="polite" aria-label={`Clima em ${weather.location.name}`}>
            <div className="weather-hero">
              <div className="hero-grain" aria-hidden="true" />
              <div className="hero-topline">
                <span className="hero-kicker"><span className="live-dot" /> AGORA EM</span>
                <span className="hero-date">{formatWeatherDate(weather.current.time)}</span>
              </div>
              <div className="hero-content">
                <div className="hero-weather-copy">
                  <h2>{weather.location.name}</h2>
                  <p className="location-subtitle">
                    {[weather.location.region, weather.location.country].filter(Boolean).join(', ')}
                  </p>
                  <div className="temperature-row">
                    <span className="temperature-value">{Math.round(weather.current.temperature)}</span>
                    <span className="temperature-unit">{weather.units.temperature}</span>
                  </div>
                  <div className="condition-line">
                    <condition.Icon size={19} strokeWidth={1.8} />
                    <span>{condition.label}</span>
                  </div>
                </div>
                <div className="hero-weather-art" aria-hidden="true">
                  <div className="weather-art-halo" />
                  <condition.Icon className="hero-weather-icon" size={112} strokeWidth={0.9} />
                </div>
              </div>
              <div className="hero-footer">
                <span><span className="footer-sparkle">✳</span> Condições atuais</span>
                <span>Atualizado às {weather.current.time.split('T')[1]?.slice(0, 5) ?? '--:--'}</span>
              </div>
            </div>

            <div className="details-heading">
              <div>
                <p className="eyebrow"><span /> AGORA POR AÍ</p>
                <h2>Detalhes do clima</h2>
              </div>
              <span className="details-coordinate">
                {weather.location.latitude.toFixed(2)}° , {weather.location.longitude.toFixed(2)}°
              </span>
            </div>
            <div className="weather-details">
              <article className="detail-card">
                <span className="detail-icon detail-icon-warm"><Thermometer size={19} /></span>
                <span className="detail-label">SENSAÇÃO TÉRMICA</span>
                <strong>{Math.round(weather.current.apparentTemperature)}<small>{weather.units.apparentTemperature}</small></strong>
                <span className="detail-note">Como o corpo sente</span>
              </article>
              <article className="detail-card">
                <span className="detail-icon detail-icon-blue"><Droplets size={19} /></span>
                <span className="detail-label">UMIDADE</span>
                <strong>{weather.current.humidity}<small>{weather.units.humidity}</small></strong>
                <span className="detail-note">No ar agora</span>
              </article>
              <article className="detail-card">
                <span className="detail-icon detail-icon-green"><Wind size={19} /></span>
                <span className="detail-label">VENTO</span>
                <strong>{Math.round(weather.current.windSpeed)}<small> {weather.units.windSpeed}</small></strong>
                <span className="detail-note">Velocidade atual</span>
              </article>
              <article className="detail-card">
                <span className="detail-icon detail-icon-lilac"><CloudRain size={19} /></span>
                <span className="detail-label">PRECIPITAÇÃO</span>
                <strong>{weather.current.precipitation.toLocaleString('pt-BR')}<small> {weather.units.precipitation}</small></strong>
                <span className="detail-note">Volume registrado</span>
              </article>
            </div>
          </section>
        ) : (
          <section className={`empty-state${isLoading ? ' empty-state-loading' : ''}`} aria-live="polite">
            <div className="empty-illustration" aria-hidden="true">
              <div className="empty-sun"><Sun size={39} strokeWidth={1.2} /></div>
              <CloudSun className="empty-cloud" size={75} strokeWidth={1.15} />
              <span className="empty-ground" />
            </div>
            <div className="empty-copy">
              <p className="eyebrow"><span /> {isLoading ? 'UM INSTANTE' : 'SEU PRÓXIMO DESTINO'}</p>
              <h2>{isLoading ? 'O céu está se abrindo.' : <>O clima da sua cidade,<br />a um instante de distância.</>}</h2>
              <p>
                {isLoading
                  ? `Buscando as condições atuais para ${city}.`
                  : 'Pesquise um lugar acima e veja as condições de agora.'}
              </p>
            </div>
            <span className="empty-index" aria-hidden="true">01 / 01</span>
          </section>
        )}

        <footer className="page-footer">
          <span>Feito para acompanhar o céu, onde quer que você esteja.</span>
          <span>Dados meteorológicos por Open-Meteo</span>
        </footer>
      </main>
    </div>
  )
}

export default App
