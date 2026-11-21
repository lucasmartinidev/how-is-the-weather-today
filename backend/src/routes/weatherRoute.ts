import { Router } from 'express';
import { getWeatherForCity, WeatherServiceError } from '../services/weatherService';

const weatherRouter = Router();

weatherRouter.get('/weather', async (request, response) => {
  const city = typeof request.query.city === 'string' ? request.query.city : '';
  try {
    response.json(await getWeatherForCity(city));
  } catch (error) {
    if (error instanceof WeatherServiceError) {
      response.status(error.statusCode).json({ error: error.message });
      return;
    }
    response.status(502).json({ error: 'The weather service is unavailable. Please try again shortly.' });
  }
});

export default weatherRouter;
