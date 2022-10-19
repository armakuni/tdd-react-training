import calculateDiscount from './discounter';
import { Product, ProductID, ProductClassTypes, ProductClass } from './database'


const loadProduct = jest.fn().mockImplementation((productId: ProductID) => { 
  return { productClass: ProductClassTypes.STANDARD, price: 1 } 
});

const range = (n: number): number[] => [...Array(n).keys()];

const combinations = range(15).flatMap(
  (numberOfPremium) => range(15).flatMap(
    (numberOfStandard) => range(15).map(
      (numberOfBudget) => ({ numberOfPremium, numberOfStandard, numberOfBudget }),
    ),
  ),
);

const products: Record<ProductClass, Product> = {
  premium: { productClass: ProductClassTypes.PREMIUM, price: 1000 },
  standard: { productClass: ProductClassTypes.STANDARD, price: 100 },
  budget: { productClass: ProductClassTypes.BUDGET, price: 10 },
};

const repeat = <T>(count: number, item: T) => Array(count).fill(item) as T[];

describe('discounter', () => {
  it('returns no discount when passed less then 3 standard products', () => {
    const order = { orderId: 'order-1', items: repeat(2, { productId: '1'}) };
    const discount = calculateDiscount(order, loadProduct);

    expect(discount).toBe(0);
  });

  it('returns discount of 1 when passed 10 standard products', () => {
    const order = { orderId: 'order-1', items: repeat(10, { productId: '1'}) };
    const discount = calculateDiscount(order, loadProduct);

    expect(discount).toBe(1);
  });

  it('returns discount of 10 percent of the number of standard products', () => {
    const order = { orderId: 'order-1', items: repeat(11, {productId: '1' }) };
    const discount = calculateDiscount(order, loadProduct);

    expect(discount).toBe(1.1);
  });

  it('returns a discount of 10% of the total price if the number if products is less than 10', () => {
    const order = { orderId: 'order-1', items: repeat(9, { productId: '1' }) };

    const discount = calculateDiscount(order, loadProduct);

    expect(discount).toBe(0.9)
  });

  it.each([
    [5, 1],
    [10, 2],
    [15, 3],
  ])('returns 20 percent discount for 5 or more budget products (With %p budget products, expect discount to be %p', (input: number, result: number) => {
    const order = { orderId: 'order-1', items: repeat(input, { productId: '1' }) };

    const discount = calculateDiscount(order, 
      (productId: ProductID) => { 
        return { productClass: ProductClassTypes.BUDGET, price: 1 } 
      }
    );

    expect(discount).toBe(result);
  });

  it.each([
    [3, 0.3],
    [4, 0.4],
  ])('returns 10 percent discount for >=3 and <5 standard products (With %p standard products, expect discount to be %p', (input: number, result: number) => {
    const order = { orderId: 'order-1', items: repeat(input, { productId: '1' }) };

    const discount = calculateDiscount(order, 
      (productId: ProductID) => { 
        return { productClass: ProductClassTypes.STANDARD, price: 1 } 
      }
    );

    expect(discount).toBe(result);
  });

  it('returns a 20% discount if we have more than 3 premium products', () => {
    const order = { orderId: 'order-1', items: repeat(3, { productId: '1' }) };

    const discount = calculateDiscount(order, (productId: ProductID) => { 
      return { productClass: ProductClassTypes.PREMIUM, price: 1 } 
    });

    expect(discount).toBe(0.6)
  });

  it('returns a 5% discount if we have 10 or more premium products', () => {
    const order = { orderId: 'order-1', items: repeat(10, { productId: '1' }) };

    const discount = calculateDiscount(order, (productId: ProductID) => { 
      return { productClass: ProductClassTypes.PREMIUM, price: 1 } 
    });

    expect(discount).toBe(0.5)
  });

  it('returns a 5% discount if we have between 5 and 10 premium products', () => {
    const order = { orderId: 'order-1', items: repeat(5, { productId: '1' }) };

    const discount = calculateDiscount(order, (productId: ProductID) => { 
      return { productClass: ProductClassTypes.PREMIUM, price: 1 } 
    });

    expect(discount).toBe(0.25)
  });

  
});

describe('helpers', () => {
  describe('range', () => {
    it('returns a list containing the range', () => {
      expect(range(2)).toEqual([0, 1]);
      expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('repeat', () => {
    it('repeats the item n times', () => {
      expect(repeat(2, 'hello')).toEqual(['hello', 'hello']);
      expect(repeat(3, 5)).toEqual([5, 5, 5]);
    });
  });
});
