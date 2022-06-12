import { PriceList } from '../entities/PriceList';
import SummarisePizza, { SummarisePizzaRequest } from './SummarisePizza';

describe('SummarisePizza', () => {
  describe('.execute()', () => {
    it('returns the price of the pizza', async () => {
      const priceList: PriceList = [
        {
          type: 'size', id: 'med', price: 10, toppingPriceMultiplier: 1,
        },
      ];
      const getPrices = () => Promise.resolve(priceList);

      const pizza: SummarisePizzaRequest = {
        size: 'large',
        sauce: 'tomato',
        toppings: ['olives'],
      };
      const calculatePrice = jest.fn(() => Promise.resolve(15));

      const usecase = new SummarisePizza(getPrices, calculatePrice);
      const summary = await usecase.execute(pizza);
      expect(summary.price).toBe(15);
      expect(summary.size).toBe('large');
      expect(summary.sauce).toBe('tomato');
      expect(summary.toppings).toEqual(['olives']);
      expect(calculatePrice).toHaveBeenCalledWith(priceList, pizza);
    });
  });
});
