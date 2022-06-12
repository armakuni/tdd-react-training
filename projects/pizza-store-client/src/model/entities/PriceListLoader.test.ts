import { Size } from './Size';
import { FetchSizes } from './SizeRepository';
import { Topping } from './Topping';
import { FetchToppings } from './ToppingRepository';
import PriceListLoader from './PriceListLoader';

describe('PriceListLoader', () => {
  describe('.load()', () => {
    const sizes: Size[] = [
      {
        id: 's',
        display: 'Small',
        price: 10,
        toppingPriceMultiplier: 1,
      },
      {
        id: 'l',
        display: 'Large',
        price: 15,
        toppingPriceMultiplier: 1.5,
      },
    ];
    const fetchSizes: FetchSizes = () => Promise.resolve(sizes);

    const toppings: Topping[] = [
      { id: 'mid', display: 'Mushrooms', price: 1 },
      { id: 'oid', display: 'Olives', price: 1 },
    ];
    const fetchToppings: FetchToppings = () => Promise.resolve(toppings);

    it('returns the size prices', async () => {
      const usecase = new PriceListLoader(fetchSizes, fetchToppings);
      const prices = await usecase.load();
      expect(prices).toContainEqual({
        type: 'size', id: 's', price: 10, toppingPriceMultiplier: 1,
      });
      expect(prices).toContainEqual({
        type: 'size', id: 'l', price: 15, toppingPriceMultiplier: 1.5,
      });
    });

    it('returns the topping prices', async () => {
      const usecase = new PriceListLoader(fetchSizes, fetchToppings);
      const prices = await usecase.load();
      expect(prices).toContainEqual({ type: 'topping', id: 'mid', price: 1 });
      expect(prices).toContainEqual({ type: 'topping', id: 'oid', price: 1 });
    });
  });
});
