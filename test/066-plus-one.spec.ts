import { plusOne } from '../leetcode/066-plus-one';

describe('large digit plus one', () => {
  test('plus one for normal last 1 digit only', () => {
    expect(plusOne([1, 2, 3])).toEqual([1, 2, 4]);
    expect(plusOne([3, 2, 2, 4])).toEqual([3, 2, 2, 5]);
  });
  test('plus one for last digit is 9', () => {
    expect(plusOne([9])).toEqual([1, 0]);
    expect(plusOne([1, 9])).toEqual([2, 0]);
    expect(plusOne([9, 9])).toEqual([1, 0, 0]);
    expect(plusOne([9, 1])).toEqual([9, 2]);
    expect(plusOne([9, 1, 9])).toEqual([9, 2, 0]);
    expect(plusOne([9, 9, 9])).toEqual([1, 0, 0, 0]);
    expect(plusOne([1, 9, 9])).toEqual([2, 0, 0]);
  });
});
