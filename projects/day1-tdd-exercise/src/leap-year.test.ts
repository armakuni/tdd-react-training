import isLeapYear from './leap-year';

describe('isLeapYear', () => {
  it('returns false for non-leap years', () => {
    expect(isLeapYear(2021)).toBe(false);
    expect(isLeapYear(2022)).toBe(false);
  });

  it('returns true for years divisible by 4', () => {
    expect(isLeapYear(2004)).toBe(true);
    expect(isLeapYear(2008)).toBe(true);
  });

  it('returns false for years divisible by 100', () => {
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(1700)).toBe(false);
  });

  it('returns true for years divisible by 400', () => {
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(2400)).toBe(true);
  });
});
