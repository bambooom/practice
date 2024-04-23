// https://leetcode.com/problems/max-consecutive-ones-ii/description/
// Given a binary array nums, return the maximum number of consecutive 1's in the array if you can flip at most one 0.
// #sliding-window

// Example 1:
// Input: nums = [1,0,1,1,0]
// Output: 4
// Explanation:
// - If we flip the first zero, nums becomes [1,1,1,1,0] and we have 4 consecutive ones.
// - If we flip the second zero, nums becomes [1,0,1,1,1] and we have 3 consecutive ones.
// The max number of consecutive ones is 4.

// Example 2:
// Input: nums = [1,0,1,1,0,1]
// Output: 4
// Explanation:
// - If we flip the first zero, nums becomes [1,1,1,1,0,1] and we have 4 consecutive ones.
// - If we flip the second zero, nums becomes [1,0,1,1,1,1] and we have 4 consecutive ones.
// The max number of consecutive ones is 4.

// Sliding window
// Time O(N) | Space O(1)
// Valid State = one or fewer 0's in our current sequence
// Invalid State = two 0's in our current sequence
function findMaxConsecutiveOnes(nums: number[]): number {
  let longest = 0;
  let left = 0;
  let right = 0;
  let zeros = 0;

  while (right < nums.length) {
    if (nums[right] === 0) zeros++;

    // if invalid
    while (zeros === 2) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }
    longest = Math.max(longest, right - left + 1);
    right++;
  }

  return longest;
}

// Brute Force: Time O(N^2) | Space O(1)
function findMaxConsecutiveOnes2(nums: number[]): number {
  if (nums === null || nums.length === 0) {
    return 0;
  }

  let ans = 0;
  for (let left = 0; left < nums.length; left++) {
    let numZeros = 0;

    for (let right = left; right < nums.length; right++) {
      if (nums[right] === 0) {
        numZeros++;
      }

      if (numZeros > 1) {
        const count = right - left;
        if (count > ans) ans = count;
        break;
      }
    }

    // Check
    if (numZeros <= 1) {
      const count = nums.length - left;
      if (count > ans) ans = count;
    }
  }

  return ans;
}
