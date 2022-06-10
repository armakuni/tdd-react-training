import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchSizes } from './HTTPSizeRespository';

describe('HTTPSizesRepository', () => {
  const mockAdapter = new MockAdapter(axios);

  describe('fetchSizes', () => {
    it('returns the sizes', async () => {
      mockAdapter
        .onGet('http://localhost:5001/sizes')
        .reply(200, ['big', 'small']);

      expect(await fetchSizes()).toEqual(['big', 'small']);
    });
  });
});
