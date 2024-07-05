// https://leetcode.com/problems/missing-element-in-sorted-array
// Given an integer array nums which is sorted in ascending order and all of its elements are unique and given also an integer k, return the kth missing number starting from the leftmost number of the array.

// Example 1:
// Input: nums = [4,7,9,10], k = 1
// Output: 5
// Explanation: The first missing number is 5.

// Example 2:
// Input: nums = [4,7,9,10], k = 3
// Output: 8
// Explanation: The missing numbers are [5,6,8,...], hence the third missing number is 8.

// Example 3:
// Input: nums = [1,2,4], k = 3
// Output: 6
// Explanation: The missing numbers are [3,5,6,7,...], hence the third missing number is 6.

// binary search
function missingElement(nums: number[], k: number): number {
  let min = 0;
  let max = nums.length - 1;
  const start = nums[0];

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    const missingBeforeMid = nums[mid] - mid - start;

    if (missingBeforeMid < k) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return min - 1 + start + k;
}
