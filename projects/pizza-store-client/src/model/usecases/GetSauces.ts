export type GetSaucesResponse = { id: string, display: string }[];

export default class GetSauces {
  // eslint-disable-next-line class-methods-use-this
  public execute(): Promise<GetSaucesResponse> {
    return Promise.resolve([]);
  }
}
