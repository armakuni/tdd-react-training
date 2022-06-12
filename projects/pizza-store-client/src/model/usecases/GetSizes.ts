import { FetchSizes } from '../entities/SizeRepository';

export type GetSizesResponse = { id: string, display: string }[];

export default class GetSizes {
  constructor(private readonly fetchSizes: FetchSizes) { }

  public async execute(): Promise<GetSizesResponse> {
    const sizes = await this.fetchSizes();
    return sizes.map(({ id, display }) => ({ id, display }));
  }
}
