import { merge } from '../leetcode/088-merge-sorted-array';

describe('merge 2 sorted array', () => {
  const nums1 = [1, 2, 3, 0, 0, 0];
  const nums2 = [2, 5, 6];
  const res = merge(nums1, 3, nums2, 3);

  test('', () => {
    expect(res).toBeUndefined();
    expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
  });
});
