import fizzbuzz from './fizzbuzz';

describe('fizzbuzz', () => {
  xit('does not throw', () => {
    expect(() => fizzbuzz(0)).not.toThrow();
  });
});
