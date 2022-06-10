import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchToppings } from './HTTPToppingRepository';

describe('HTTPToppingRepository', () => {
  const mockAdapter = new MockAdapter(axios);

  describe('fetchToppings', () => {
    it('returns the toppings', async () => {
      mockAdapter
        .onGet('http://localhost:5001/toppings')
        .reply(200, [
          { id: 1, name: 'pepperoni', price: 1 },
          { id: 2, name: 'anchovy', price: 2.5 },
        ]);

      expect(await fetchToppings()).toEqual([
        { id: 1, name: 'pepperoni', price: 1 },
        { id: 2, name: 'anchovy', price: 2.5 },
      ]);
    });
  });
});
