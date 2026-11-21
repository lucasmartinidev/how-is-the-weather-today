import cors from 'cors';
import express, { type Express } from 'express';
import weatherRouter from './routes/weatherRoute';

export function createApp(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('/health', (_request, response) => {
    response.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });
  app.use('/api', weatherRouter);
  return app;
}
