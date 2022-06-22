export type CustomerID = string;
export type Discount = number;
export type ProductID = string;

export interface Item {
  productId: ProductID;
}

export interface Product {
  productClass: 'premium' | 'standard' | 'budget';
  price: number;
}

export interface Order {
  readonly items: Item[];
}

export function loadProduct(productID: ProductID): Product {
  throw new Error('loadProduct access the database, you cannot call it in your test');
}
