import { PriceCalculator } from '../entities/PriceCalculator';
import { PriceList } from '../entities/PriceList';

export interface SummarisePizzaRequest {
  size: string;
  toppings: string[];
}

export interface SummarisePizzaResponse {
  size: string;
  price: number;
}

export default class SummarisePizza {
  constructor(
    private readonly getPrices: () => Promise<PriceList>,
    private readonly calculatePrice: PriceCalculator,
  ) { }

  public async execute(request: SummarisePizzaRequest): Promise<SummarisePizzaResponse> {
    const priceList = await this.getPrices();
    const price = await this.calculatePrice(priceList, request);
    return { size: request.size, price };
  }
}
