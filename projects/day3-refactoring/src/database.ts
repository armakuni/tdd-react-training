export type CustomerID = string;
export type Discount = number;
export type ProductID = string;

export interface Item {
  productId: ProductID;
}

export enum ProductClassTypes {
  PREMIUM = 'premium',
  STANDARD = 'standard',
  BUDGET = 'budget'
}

export type ProductClass = ProductClassTypes.PREMIUM | ProductClassTypes.STANDARD | ProductClassTypes.BUDGET;

export interface Product {
  productClass: ProductClass
  price: number;
}

export interface Order {
  readonly items: Item[];
}

export function loadProduct(productID: ProductID): Product {
  throw new Error('loadProduct accesses the database, you cannot call it in your test');
}
