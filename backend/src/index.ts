import 'dotenv/config';
import { createApp } from './app';

const port = Number(process.env.PORT ?? 3000);
const server = createApp().listen(port);

function shutdown(): void {
  server.close(() => {
    process.exitCode = 0;
  });
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
