import { FetchSauces } from '../entities/SauceRepository';

export type GetSaucesResponse = { id: string, display: string }[];

export default class GetSauces {
  constructor(private readonly fetchSauces: FetchSauces) { }

  public execute(): Promise<GetSaucesResponse> {
    return this.fetchSauces();
  }
}
