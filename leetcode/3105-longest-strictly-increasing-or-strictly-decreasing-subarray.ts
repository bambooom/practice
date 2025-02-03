// https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray
// You are given an array of integers nums. Return the length of the longest subarray of nums which is either strictly increasing or strictly decreasing.

// Example 1:
// Input: nums = [1,4,3,3,2]
// Output: 2
// Explanation:
// The strictly increasing subarrays of nums are [1], [2], [3], [3], [4], and [1,4].
// The strictly decreasing subarrays of nums are [1], [2], [3], [3], [4], [3,2], and [4,3].
// Hence, we return 2.

function longestMonotonicSubarray(nums: number[]): number {
  if (nums.length === 1) return 1;

  let maxLen = 1;
  let incLen = 1;
  let decLen = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      incLen += 1;
      decLen = 1;
    } else if (nums[i] < nums[i - 1]) {
      decLen += 1;
      incLen = 1;
    } else {
      incLen = 1;
      decLen = 1;
    }

    maxLen = Math.max(maxLen, incLen, decLen);
  }

  return maxLen;
}
