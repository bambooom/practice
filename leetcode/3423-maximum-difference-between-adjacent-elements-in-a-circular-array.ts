// https://leetcode.com/problems/maximum-difference-between-adjacent-elements-in-a-circular-array/
// Given a circular array nums, find the maximum absolute difference between adjacent elements.
// Note: In a circular array, the first and last elements are adjacent.

// Example 1:
// Input: nums = [1,2,4]
// Output: 3
// Explanation:
// Because nums is circular, nums[0] and nums[2] are adjacent. They have the maximum absolute difference of |4 - 1| = 3.

// Example 2:
// Input: nums = [-5,-10,-5]
// Output: 5
// Explanation:
// The adjacent elements nums[0] and nums[1] have the maximum absolute difference of |-5 - (-10)| = 5.

function maxAdjacentDistance(nums: number[]): number {
  // let maxDiff = 0;

  // for (let i = 0; i < nums.length; i++) {
  //   if (i < nums.length - 1) {
  //     maxDiff = Math.max(maxDiff, Math.abs(nums[i] - nums[i + 1]));
  //   } else {
  //     maxDiff = Math.max(maxDiff, Math.abs(nums[i] - nums[0]));
  //   }
  // }

  // return maxDiff;

  // simplify
  const n = nums.length;
  let maxDiff = Math.abs(nums[0] - nums[n - 1]);

  for (let i = 0; i < n - 1; i++) {
    maxDiff = Math.max(maxDiff, Math.abs(nums[i] - nums[i + 1]));
  }

  return maxDiff;
}
