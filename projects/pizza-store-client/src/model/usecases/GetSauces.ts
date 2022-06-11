import { FetchSauces } from '../entities/SauceRepository';

type GetSaucesResponse = string[];

export default class GetSauces {
  constructor(private readonly fetchSauces: FetchSauces) { }

  public async execute(): Promise<GetSaucesResponse> {
    const sauces = await this.fetchSauces();
    return sauces.map((sauce) => sauce.id);
  }
}
