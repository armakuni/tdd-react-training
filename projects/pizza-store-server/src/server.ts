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
      { size: 'large', price: 15, toppingPriceMultiplier: 2 },
      { size: 'medium', price: 10, toppingPriceMultiplier: 1.5 },
      { size: 'small', price: 5, toppingPriceMultiplier: 1 },
      { size: '', price: 0 }],
    toppings: [
      { id: 1, name: 'mushroom', price: 0.5 },
      { id: 2, name: 'anchovy', price: 1 },
      { id: 3, name: 'pepperoni', price: 1.5 },
      { id: 4, name: 'ham', price: 1.5 },
      { id: 5, name: 'olives', price: 0.5 },
      { id: 6, name: 'chillis', price: 1 }],
  };

  app.get('/sizes', (_, res) => {
    res
      .status(200)
      .send([
        {
          id: 'small',
          display: 'Small - 7"',
          price: 5,
          toppingPriceMultiplier: 1,
        },
        {
          id: 'medium',
          display: 'Medium - 9"',
          price: 10,
          toppingPriceMultiplier: 1.5,
        },
        {
          id: 'large',
          display: 'Large - 12"',
          price: 15,
          toppingPriceMultiplier: 2,
        },
      ]);
  });

  app.get('/sauces', (_, res) => {
    res
      .status(200)
      .send([
        { id: 'none', display: 'None' },
        { id: 'tomato', display: 'Tomato' },
        { id: 'white', display: 'White' },
        { id: 'garlic', display: 'Garlic Butter' },
      ]);
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
