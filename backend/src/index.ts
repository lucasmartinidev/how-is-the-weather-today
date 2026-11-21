import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/weather', async (req: Request, res: Response) => {
  const city = typeof req.query.city === 'string' ? req.query.city.trim() : '';

  if (!city || city.length > 100) {
    res.status(400).json({ error: 'Informe uma cidade válida.' });
    return;
  }

  try {
    const geocodingUrl = new URL('https://geocoding-api.open-meteo.com/v1/search');
    geocodingUrl.search = new URLSearchParams({
      name: city,
      count: '1',
      language: 'pt',
      format: 'json',
    }).toString();

    const geocodingResponse = await fetch(geocodingUrl, {
      signal: AbortSignal.timeout(10000),
    });

    if (!geocodingResponse.ok) {
      res.status(502).json({ error: 'Não foi possível buscar essa cidade agora.' });
      return;
    }

    const geocodingData = await geocodingResponse.json() as {
      results?: Array<{
        name: string;
        latitude: number;
        longitude: number;
        country: string;
        admin1?: string;
        timezone?: string;
      }>;
    };
    const place = geocodingData.results?.[0];

    if (!place) {
      res.status(404).json({ error: 'Cidade não encontrada. Verifique o nome e tente novamente.' });
      return;
    }

    const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast');
    weatherUrl.search = new URLSearchParams({
      latitude: String(place.latitude),
      longitude: String(place.longitude),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
      temperature_unit: 'celsius',
      wind_speed_unit: 'kmh',
      precipitation_unit: 'mm',
      timezone: 'auto',
    }).toString();

    const weatherResponse = await fetch(weatherUrl, {
      signal: AbortSignal.timeout(10000),
    });

    if (!weatherResponse.ok) {
      res.status(502).json({ error: 'Não foi possível consultar o clima agora.' });
      return;
    }

    const weatherData = await weatherResponse.json() as {
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

    if (!weatherData.current || !weatherData.current_units) {
      res.status(502).json({ error: 'A resposta do serviço de clima está incompleta.' });
      return;
    }

    res.json({
      location: {
        name: place.name,
        region: place.admin1 ?? null,
        country: place.country,
        latitude: place.latitude,
        longitude: place.longitude,
        timezone: place.timezone ?? null,
      },
      current: {
        time: weatherData.current.time,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        apparentTemperature: weatherData.current.apparent_temperature,
        isDay: weatherData.current.is_day,
        precipitation: weatherData.current.precipitation,
        weatherCode: weatherData.current.weather_code,
        windSpeed: weatherData.current.wind_speed_10m,
      },
      units: {
        temperature: weatherData.current_units.temperature_2m,
        humidity: weatherData.current_units.relative_humidity_2m,
        apparentTemperature: weatherData.current_units.apparent_temperature,
        precipitation: weatherData.current_units.precipitation,
        windSpeed: weatherData.current_units.wind_speed_10m,
      },
    });
  } catch (error) {
    console.error('Open-Meteo request failed:', error);
    res.status(502).json({ error: 'O serviço de clima está indisponível. Tente novamente em instantes.' });
  }
});

app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
