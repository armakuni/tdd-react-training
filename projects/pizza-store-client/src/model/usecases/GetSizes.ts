import { FetchSizes } from '../entities/SizeRepository';

type GetSizesResponse = string[]

export default class GetSizes {
  constructor(private readonly fetchSizes: FetchSizes) { }

  public async execute(): Promise<GetSizesResponse> {
    const sizes = await this.fetchSizes();
    return sizes.map((size) => size.id);
  }
}
