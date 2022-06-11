export type SizeID = string;

export interface Size {
  id: SizeID;
  display: string;
  price: number;
  toppingPriceMultiplier: number;
}
