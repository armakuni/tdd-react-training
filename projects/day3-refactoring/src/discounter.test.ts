import calculateDiscount from './discounter';

jest.mock('./database', () => ({ }));

describe('discounter', () => {
  it('should pass', () => {
    const order = { orderId: 'order-1', items: [] };
    const cid = 'customer-1';
    calculateDiscount(order, cid);
  });
});
