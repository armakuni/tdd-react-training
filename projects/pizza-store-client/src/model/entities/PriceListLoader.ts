import { FetchSizes } from './SizeRepository';
import { FetchToppings } from './ToppingRepository';
import { PriceList } from './PriceList';

export default class PriceListLoader {
  constructor(
    private readonly fetchSizes: FetchSizes,
    private readonly fetchToppings: FetchToppings,
  ) { }

  public async load(): Promise<PriceList> {
    const sizes = await this.fetchSizes();
    const toppings = await this.fetchToppings();
    const sizePrices = sizes.map((size) => ({
      type: 'size',
      id: size.id,
      price: size.price,
      toppingPriceMultiplier: size.toppingPriceMultiplier,
    }));
    const toppingPrices = toppings.map((topping) => ({
      type: 'topping',
      id: topping.id,
      price: topping.price,
    }));
    return Promise.resolve([...sizePrices, ...toppingPrices]);
  }
}
