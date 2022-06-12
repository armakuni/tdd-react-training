import { PriceList } from './PriceList';
import calculatePrice from './calculatePrice';

const prices: PriceList = [
  {
    type: 'size',
    id: 'large',
    price: 15,
    toppingPriceMultiplier: 2,
  },
  {
    type: 'size',
    id: 'medium',
    price: 10,
    toppingPriceMultiplier: 1.5,
  },
  {
    type: 'size',
    id: 'small',
    price: 5,
    toppingPriceMultiplier: 1,
  },
  {
    type: 'size',
    id: '',
    price: 0,
    toppingPriceMultiplier: 1,
  },
  { type: 'topping', id: 'mushroom', price: 0.5 },
  { type: 'topping', id: 'anchovy', price: 1 },
  { type: 'topping', id: 'pepperoni', price: 1.5 },
  { type: 'topping', id: 'ham', price: 1.5 },
  { type: 'topping', id: 'olives', price: 0.5 },
  { type: 'topping', id: 'chillis', price: 1 },
  { type: 'topping', id: 'artichoke', price: 2 },
  { type: 'topping', id: 'chicken', price: 2 },
  { type: 'topping', id: 'egg', price: 1.5 },
];

describe('calculatePrice', () => {
  const size = 'large';

  it('calculates price for single pizza with no toppings', () => {
    const pizza = { size, toppings: [] };
    expect(calculatePrice(prices, pizza)).toEqual(15);
  });

  it('calculates price for single pizza', () => {
    const pizza = { size, toppings: ['mushroom', 'anchovy'] };
    expect(calculatePrice(prices, pizza)).toEqual(18);
  });

  it('calculates price for no pizza', () => {
    const pizza = { size: '', toppings: [] };
    expect(calculatePrice(prices, pizza)).toEqual(0);
  });

  it('calculates price for no pizza but with toppings', () => {
    const pizza = { size: '', toppings: ['mushroom', 'anchovy', 'pepperoni'] };
    expect(calculatePrice(prices, pizza)).toEqual(0);
  });

  it('calculates price for pizza with 3 for 2 toppings on 3 toppings', () => {
    const pizza = { size: 'medium', toppings: ['mushroom', 'anchovy', 'pepperoni'] };
    expect(calculatePrice(prices, pizza)).toEqual(13.75);
  });

  it('calculates price for pizza with 3 for 2 toppings on 5 toppings', () => {
    const pizza = { size: 'medium', toppings: ['mushroom', 'anchovy', 'pepperoni', 'olives', 'chillis'] };
    expect(calculatePrice(prices, pizza)).toEqual(16);
  });

  it('calculates price for pizza with multiple 3 for 2 toppings', () => {
    const pizza = { size: 'large', toppings: ['mushroom', 'anchovy', 'pepperoni', 'ham', 'olives', 'chillis'] };
    expect(calculatePrice(prices, pizza)).toEqual(25);
  });
});
