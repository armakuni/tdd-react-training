import { FetchSizes } from '../entities/SizeRepository';
import GetSizes from './GetSizes';

describe('GetSizes', () => {
  describe('.execute()', () => {
    it('returns the sizes', async () => {
      const fetchSizes: FetchSizes = () => ['large', 'small'];
      const useCase = new GetSizes(fetchSizes);
      expect(await useCase.execute()).toEqual(['large', 'small']);
    });
  });
});
