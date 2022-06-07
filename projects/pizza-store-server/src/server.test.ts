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
      expect(response.body).toStrictEqual(['small', 'medium', 'large']);
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

    it('returns tomato, white and none', async () => {
      const response = await request(app).get('/sauces');
      expect(response.body).toStrictEqual(['tomato', 'white', 'none']);
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

    it('returns data structure for topping options pepperoni, anchovy, mushroom', async () => {
      const response = await request(app).get('/toppings');
      const toppings = [
        { id: 1, name: 'pepperoni', price: 1 }, 
        { id: 2, name: 'anchovy', price: 2.5 }, 
        { id: 3, name: 'mushroom', price: 3.0 }];
      expect(response.body).toStrictEqual(toppings);
    });
  });
});
