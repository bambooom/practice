// https://leetcode.com/problems/count-complete-subarrays-in-an-array
// #sliding-window
// You are given an array nums consisting of positive integers.
// We call a subarray of an array complete if the following condition is satisfied:
// The number of distinct elements in the subarray is equal to the number of distinct elements in the whole array.
// Return the number of complete subarrays.
// A subarray is a contiguous non-empty part of an array.

// Example 1:
// Input: nums = [1,3,1,2,2]
// Output: 4
// Explanation: The complete subarrays are the following: [1,3,1,2], [1,3,1,2,2], [3,1,2] and [3,1,2,2].

// Example 2:
// Input: nums = [5,5,5,5]
// Output: 10
// Explanation: The array consists only of the integer 5, so any subarray is complete. The number of subarrays that we can choose is 10.

function countCompleteSubarrays(nums: number[]): number {
  const unique = new Set(nums).size;
  let left = 0;
  let result = 0;

  const freq = new Map<number, number>();

  // Expand the window from the right
  for (let right = 0; right < nums.length; right++) {
    freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);

    // Shrink the window from the left if freq.size === unique
    while (freq.size === unique) {
      result += nums.length - right;

      freq.set(nums[left], freq.get(nums[left])! - 1);
      if (freq.get(nums[left]) === 0) {
        freq.delete(nums[left]);
      }
      left++;
    }
  }

  return result;
}
