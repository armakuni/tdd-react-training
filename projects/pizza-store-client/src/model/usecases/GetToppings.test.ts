import { FetchToppings } from '../entities/ToppingRepository';
import GetToppings from './GetToppings';

describe('GetToppings', () => {
  describe('.execute()', () => {
    it('returns the Toppings', async () => {
      const fetchToppings: FetchToppings = () => new Promise((resolve) => {
        resolve([
          { id: 1, name: 'onions', price: 1 },
          { id: 2, name: 'sweetcorn', price: 0.5 },
        ]);
      });
      const useCase = new GetToppings(fetchToppings);
      expect(await useCase.execute()).toEqual([
        { id: 1, name: 'onions' },
        { id: 2, name: 'sweetcorn' },
      ]);
    });
  });
});
