import calculateDiscount from './discounter';

jest.mock('./database');

// const range = (n: number): number[] => [...Array(n).keys()];
//
// const combinations = range(15).flatMap(
//   (numberOfPremium) => range(15).flatMap(
//     (numberOfStandard) => range(15).map(
//       (numberOfBudget) => ({ numberOfPremium, numberOfStandard, numberOfBudget }),
//     ),
//   ),
// );
//
// const products: Record<string, Product> = {
//   premium: { productClass: 'premium', price: 1000 },
//   standard: { productClass: 'standard', price: 100 },
//   budget: { productClass: 'budget', price: 10 },
// };
//
// const repeat = <T>(count: number, item: T) => Array(count).fill(item) as T[];

describe('discounter', () => {
  it('should pass', () => {
    const order = { orderId: 'order-1', items: [] };
    const cid = 'customer-1';
    calculateDiscount(order, cid);
  });
});

// describe('helpers', () => {
//   describe('range', () => {
//     it('returns a list containing the range', () => {
//       expect(range(2)).toEqual([0, 1]);
//       expect(range(5)).toEqual([0, 1, 2, 3, 4]);
//     });
//   });
//
//   describe('repeat', () => {
//     it('repeats the item n times', () => {
//       expect(repeat(2, 'hello')).toEqual(['hello', 'hello']);
//       expect(repeat(3, 5)).toEqual([5, 5, 5]);
//     });
//   });
// });
