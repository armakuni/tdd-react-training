import { FetchSauces } from '../entities/SauceRepository';

type GetSaucesResponse = string[];

export default class GetSauces {
  constructor(private readonly fetchSauces: FetchSauces) { }

  public async execute(): Promise<GetSaucesResponse> {
    return this.fetchSauces();
  }
}
