import {
  create, setSauce, setSize, setToppings,
} from './Pizza';

describe('Pizza', () => {
  describe('create', () => {
    it('returns a pizza with no values set', () => {
      expect(create()).toEqual({
        size: undefined,
        sauce: undefined,
        toppings: new Set(),
      });
    });
  });

  describe('setSize', () => {
    it('returns an updared pizza', () => {
      expect(setSize(create(), 'big')).toEqual({
        size: 'big',
        sauce: undefined,
        toppings: new Set(),
      });
    });
  });

  describe('setSauce', () => {
    it('returns an updated pizza', () => {
      expect(setSauce(create(), 'tomato')).toEqual({
        size: undefined,
        sauce: 'tomato',
        toppings: new Set(),
      });
    });
  });

  describe('setToppings', () => {
    it('returns an updated pizza', () => {
      expect(setToppings(create(), new Set([2, 3]))).toEqual({
        size: undefined,
        sauce: undefined,
        toppings: new Set([2, 3]),
      });
    });
  });
});
