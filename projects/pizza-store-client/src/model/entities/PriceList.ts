interface Price {
  readonly type: string,
  readonly id: string,
  readonly price: number,
  readonly toppingPriceMultiplier?: number,
}

export type PriceList = Price[];
