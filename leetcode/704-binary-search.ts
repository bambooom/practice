// https://leetcode.com/problems/binary-search/
/**
 * Given an array of integers nums which is sorted in ascending order, and an integer target,
 * write a function to search target in nums.
 * If target exists, then return its index. Otherwise, return -1.
 * You must write an algorithm with O(log n) runtime complexity.
 */

function search(nums: number[], target: number): number {
  let low = 0,
    high = nums.length - 1;
  if (target < nums[low] || target > nums[high]) return -1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (target === nums[mid]) return mid;
    else if (target > nums[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return target === nums[low] ? low : target == nums[high] ? high : -1;
}
