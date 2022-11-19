import {
  removeDuplicates,
  removeDuplicates2,
} from '../leetcode/026-remove-duplicates-in-place';

describe('remove duplicates in-place', () => {
  const arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  test('unique value 5', () => {
    const unique = removeDuplicates(arr);
    expect(unique).toBe(5);
    expect(arr.slice(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('remove duplicates in-place 2', () => {
  const arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  test('unique value 5', () => {
    const unique = removeDuplicates2(arr);
    expect(unique).toBe(5);
    expect(arr.slice(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });
});
