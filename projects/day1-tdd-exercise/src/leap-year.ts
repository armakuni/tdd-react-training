/*
 * All years divisible by 400 ARE leap years
 * All years divisible by 100 but NOT by 400 ARE NOT leap years
 * All years divisible by 4 but Not by 100 ARE leap years
 * All years not divisible by 4 ARE NOT leap years
 */

function isDivisibleBy(year: number, divisor: number): boolean {
  return year % divisor === 0;
}

export default function isLeapYear(year: number): boolean {
  if (isDivisibleBy(year, 400)) return true;
  if (isDivisibleBy(year, 100)) return false;
  return isDivisibleBy(year, 4);
}
