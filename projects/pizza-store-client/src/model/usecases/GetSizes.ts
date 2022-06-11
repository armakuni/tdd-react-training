import { FetchSizes } from '../entities/SizeRepository';

type GetSizesResponse = string[]

export default class GetSizes {
  constructor(private readonly fetchSizes: FetchSizes) { }

  public execute(): Promise<GetSizesResponse> {
    return this.fetchSizes();
  }
}
