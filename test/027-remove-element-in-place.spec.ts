import {
  removeElement,
  removeElement2,
} from '../leetcode/027-remove-element-in-place';

describe('remove element in-place 1', () => {
  const arr = [3, 2, 2, 3];
  const leftCount = removeElement(arr, 3);
  test('after removed should be 2', () => {
    expect(leftCount).toBe(2);
    expect(arr.slice(0, leftCount)).toEqual([2, 2]);
  });
});

describe('remove element in-place 2', () => {
  const arr = [0, 1, 2, 2, 3, 0, 4, 2];
  const leftCount = removeElement2(arr, 2);
  test('after removed should be 5', () => {
    expect(leftCount).toBe(5);
    expect(arr.slice(0, leftCount)).toEqual([0, 1, 4, 0, 3]);
  });
});
