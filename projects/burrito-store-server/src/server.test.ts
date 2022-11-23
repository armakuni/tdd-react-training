import request from 'supertest';
import server from './server';

describe('server', () => {
  const app = server();

  describe('/', () => {
    const route = '/';

    it('returns a 200 status', async () => {
      const response = await request(app).get(route);
      expect(response.statusCode).toBe(200);
    });

    it('returns cors headers', async () => {
      const response = await request(app).get(route);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.headers['access-control-allow-origin']).toBe('*');
    });
  });

  describe('/ping', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).get('/ping');
      expect(response.statusCode).toBe(200);
    });

    it('returns a "application/json" content-type', async () => {
      const response = await request(app).get('/ping');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('returns a "pong"', async () => {
      const response = await request(app).get('/ping');
      expect(response.body).toBe('pong');
    });
  });

  describe('/sizes', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).get('/sizes');
      expect(response.statusCode).toBe(200);
    });

    it('returns a "application/json" content-type', async () => {
      const response = await request(app).get('/sizes');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('returns small, medium and large', async () => {
      const response = await request(app).get('/sizes');
      expect(response.body).toStrictEqual([
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
  });

  describe('/sauces', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).get('/sauces');
      expect(response.statusCode).toBe(200);
    });

    it('returns a "application/json" content-type', async () => {
      const response = await request(app).get('/sauces');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('returns the sauce options', async () => {
      const response = await request(app).get('/sauces');
      expect(response.body).toStrictEqual([
        { id: 'none', display: 'None' },
        { id: 'tomato', display: 'Tomato' },
        { id: 'white', display: 'White' },
        { id: 'garlic', display: 'Garlic Bread' },
      ]);
    });
  });

  describe('/toppings', () => {
    it('returns a 200 status', async () => {
      const response = await request(app).get('/toppings');
      expect(response.statusCode).toBe(200);
    });

    it('returns a "application/json" content-type', async () => {
      const response = await request(app).get('/toppings');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('returns data structure for topping options', async () => {
      const response = await request(app).get('/toppings');
      const toppings = [
        { id: 'mushroom', display: 'Mushrooms', price: 0.5 },
        { id: 'anchovy', display: 'Anchovies', price: 1 },
        { id: 'pepperoni', display: 'Pepperoni', price: 1.5 },
        { id: 'ham', display: 'Ham', price: 1.5 },
        { id: 'olives', display: 'Olives', price: 0.5 },
        { id: 'chillis', display: 'Chillis', price: 1 },
      ];
      expect(response.body).toStrictEqual(toppings);
    });
  });
});
