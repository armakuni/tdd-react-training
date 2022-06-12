import { FetchSizes } from '../entities/SizeRepository';
import GetSizes from './GetSizes';

describe('GetSizes', () => {
  describe('.execute()', () => {
    it('returns the sizes', async () => {
      const fetchSizes: FetchSizes = () => new Promise((resolve) => {
        resolve([
          {
            id: 'large',
            display: 'Large',
            price: 15,
            toppingPriceMultiplier: 2,
          },
          {
            id: 'small',
            display: 'Small',
            price: 10,
            toppingPriceMultiplier: 1,
          },
        ]);
      });
      const useCase = new GetSizes(fetchSizes);
      expect(await useCase.execute()).toEqual([
        { id: 'large', display: 'Large' },
        { id: 'small', display: 'Small' },
      ]);
    });
  });
});
