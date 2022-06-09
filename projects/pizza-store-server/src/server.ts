import express, { Express } from 'express';
import pino from 'pino-http';
import cors from 'cors';

export default function server(): Express {
  const app = express();

  app.use(pino());
  app.use(cors());

  app.get('/', (req, res) => {
    req.log.info({ logger: 'pino' });
    res.status(200).send();
  });

  app.get('/ping', (_, res) => {
    res
      .status(200)
      .header('Content-Type', 'application/json')
      .send('"pong"');
  });

  app.get('/sizes', (_, res) => {
    res
      .status(200)
      .send(['small', 'medium', 'large']);
  });

  app.get('/sauces', (_, res) => {
    res
      .status(200)
      .send(['tomato', 'white', 'none']);
  });

  app.get('/toppings', (_, res) => {
    res
      .status(200)
      .send([
        { id: 1, name: 'pepperoni', price: 1 },
        { id: 2, name: 'anchovy', price: 2.5 },
        { id: 3, name: 'mushroom', price: 3.0 },
      ]);
  });

  return app;
}
