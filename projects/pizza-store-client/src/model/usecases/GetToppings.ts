export type GetToppingsResponse = { id: string, display: string }[];

export default class GetToppings {
  // eslint-disable-next-line class-methods-use-this
  public execute(): Promise<GetToppingsResponse> {
    return Promise.resolve([]);
  }
}
