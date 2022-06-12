import { FetchToppings } from '../entities/ToppingRepository';

export type GetToppingsResponse = { id: string, display: string }[];

export default class GetToppings {
  constructor(private readonly fetchToppings: FetchToppings) { }

  public async execute(): Promise<GetToppingsResponse> {
    const toppings = await this.fetchToppings();
    return toppings.map((topping) => ({ id: topping.id, display: topping.display }));
  }
}
