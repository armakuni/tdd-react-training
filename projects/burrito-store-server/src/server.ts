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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const prices = {
    sizes: [
      { size: 'large', price: 15, fillingPriceMultiplier: 2 },
      { size: 'small', price: 5, fillingPriceMultiplier: 1 },
      { size: '', price: 0 }],
    fillings: [
      { id: 1, name: 'chicken', price: 0.5 },
      { id: 2, name: 'beef', price: 1 },
    ],
  };

  app.get('/sizes', (_, res) => {
    res
      .status(200)
      .send([
        {
          id: 'small',
          display: 'Small - 7"',
          price: 5,
          fillingPriceMultiplier: 1,
        },
        {
          id: 'large',
          display: 'Large',
          price: 15,
          fillingPriceMultiplier: 2,
        },
      ]);
  });

  app.get('/extras', (_, res) => {
    setTimeout(() => {
      res
        .status(200)
        .send([
          { id: 'none', display: 'None' },
          { id: 'cheese', display: 'Cheese' },
        ]);
    }, 500);
  });

  app.get('/fillings', (_, res) => {
    setTimeout(() => {
      res
        .status(200)
        .send([
          { id: 'chicken', display: 'Chicken', price: 0.5 },
          { id: 'beef', display: 'Beef', price: 1 },
        ]);
    }, 250);
  });

  return app;
}
