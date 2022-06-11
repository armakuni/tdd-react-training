import { FetchToppings } from '../entities/ToppingRepository';
import GetToppings from './GetToppings';

describe('GetToppings', () => {
  describe('.execute()', () => {
    it('returns the Toppings', async () => {
      const fetchToppings: FetchToppings = () => new Promise((resolve) => {
        resolve([
          { id: 'onions', display: 'Onions', price: 1 },
          { id: 'sweetcorn', display: 'Sweetcorn', price: 0.5 },
        ]);
      });
      const useCase = new GetToppings(fetchToppings);
      expect(await useCase.execute()).toEqual([
        { id: 'onions', display: 'Onions' },
        { id: 'sweetcorn', display: 'Sweetcorn' },
      ]);
    });
  });
});
