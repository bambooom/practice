import { searchInsert } from '../leetcode/035-search-insert-position';

describe('search insert position', () => {
  test('check insert position for [1,3]', () => {
    expect(searchInsert([1, 3], 2)).toBe(1);
    expect(searchInsert([1, 3], 3)).toBe(1);
  });
  test('check insert position for [1, 3, 5, 6]', () => {
    expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
    expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
    expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
  });
});
