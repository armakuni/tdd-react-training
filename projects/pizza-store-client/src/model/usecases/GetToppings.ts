import { FetchToppings } from '../entities/ToppingRepository';

type GetToppingsResponse = { id: number, name: string }[];

export default class GetToppings {
  constructor(private readonly fetchToppings: FetchToppings) { }

  public async execute(): Promise<GetToppingsResponse> {
    const toppings = await this.fetchToppings();
    return toppings.map((topping) => ({ id: topping.id, name: topping.name }));
  }
}
