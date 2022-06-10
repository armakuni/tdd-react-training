import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchSauces } from './HTTPSauceRepository';

describe('HTTPSauceRepository', () => {
  const mockAdapter = new MockAdapter(axios);

  describe('fetchSauces', () => {
    it('returns the sauces', async () => {
      mockAdapter
        .onGet('http://localhost:5001/sauces')
        .reply(200, ['tomato', 'white']);

      expect(await fetchSauces()).toEqual(['tomato', 'white']);
    });
  });
});
