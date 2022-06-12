import { FetchSizes } from '../entities/SizeRepository';
import { FetchToppings } from '../entities/ToppingRepository';

interface Price {
  readonly type: string,
  readonly id: string,
  readonly price: number,
  readonly toppingPriceMultiplier?: number,
}

type GetPricesResponse = Price[];

export default class GetPrices {
  constructor(
    private readonly fetchSizes: FetchSizes,
    private readonly fetchToppings: FetchToppings,
  ) { }

  public async execute(): Promise<GetPricesResponse> {
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
