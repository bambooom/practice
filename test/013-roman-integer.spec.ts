import { romanToInt } from '../leetcode/013-roman-integer';

describe('roman to integer', () => {
  test('III is 3', () => {
    expect(romanToInt('III')).toBe(3);
  });
  test('LVIII is 58', () => {
    expect(romanToInt('LVIII')).toBe(58);
  });
  test('MCMXCIV is 1994', () => {
    expect(romanToInt('MCMXCIV')).toBe(1994);
  });
});
