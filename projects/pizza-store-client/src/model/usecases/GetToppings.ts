import { FetchToppings } from '../entities/ToppingRepository';

export type GetToppingsResponse = { id: string, display: string }[];

export default class GetToppings {
  constructor(private readonly fetchToppings: FetchToppings) { }

  // eslint-disable-next-line class-methods-use-this
  public async execute(): Promise<GetToppingsResponse> {
    const toppings = await this.fetchToppings();
    // return toppings
    return toppings.map(({ id, display }) => ({ id, display }));
  }
}
