import { FetchSauces } from '../entities/SauceRepository';
import GetSauces from './GetSauces';

describe('GetSauces', () => {
  describe('.execute()', () => {
    it('returns the sauces', async () => {
      const fetchSauces: FetchSauces = () => new Promise((resolve) => {
        resolve(['tomato', 'garlic']);
      });
      const useCase = new GetSauces(fetchSauces);
      expect(await useCase.execute()).toEqual(['tomato', 'garlic']);
    });
  });
});
