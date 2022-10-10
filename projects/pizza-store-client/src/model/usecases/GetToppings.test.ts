import GetToppings from './GetToppings';
import { FetchToppings } from '../entities/ToppingRepository';

describe('GetToppings', () => {
  describe('.execute()', () => {
    it('gets the list of toppings', async () => {
      const fetchToppings: FetchToppings = () => new Promise((resolve) => {
        resolve([
          {
            id: 'pepperroni',
            display: 'Pepperroni',
            price: 1,
          },
        ]);
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const useCase = new GetToppings(fetchToppings);
      // ...
      expect(await useCase.execute()).toEqual([{ id: 'pepperroni', display: 'Pepperroni' }]);
    });
  });
});
