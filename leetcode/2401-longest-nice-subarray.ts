// https://leetcode.com/problems/longest-nice-subarray
// You are given an array nums consisting of positive integers.
// We call a subarray of nums nice if the bitwise AND of every pair of elements that are in different positions in the subarray is equal to 0.
// Return the length of the longest nice subarray.
// A subarray is a contiguous part of an array.
// Note that subarrays of length 1 are always considered nice.

// Example 1:
// Input: nums = [1,3,8,48,10]
// Output: 3
// Explanation: The longest nice subarray is [3,8,48]. This subarray satisfies the conditions:
// - 3 AND 8 = 0.
// - 3 AND 48 = 0.
// - 8 AND 48 = 0.
// It can be proven that no longer nice subarray can be obtained, so we return 3.

// Example 2:
// Input: nums = [3,1,5,11,13]
// Output: 1
// Explanation: The length of the longest nice subarray is 1. Any subarray of length 1 can be chosen.

// https://leetcode.com/problems/longest-nice-subarray/solutions/6549436/two-solution-with-explanation-0-2ms-beats-85-19-100-o-n-2-62-9-67-5-o-1/?envType=daily-question&envId=2025-03-18
// pairwise compare
function longestNiceSubarray(nums: number[]): number {
  if (nums.length === 0) return 0;

  let max = 1;
  for (let i = 0; i < nums.length; i++) {
    let count = 1;
    let currentBitmask = nums[i];

    for (let j = i + 1; j < nums.length; j++) {
      // bitwise AND operation, check if shared bits
      if ((currentBitmask & nums[j]) === 0) {
        // if there is no conflict, update count and currentBitmask
        count++;
        currentBitmask |= nums[j];
      } else {
        // if conflict detected, skip the remaining elements
        break;
      }
    }
    max = Math.max(max, count);
  }

  return max;
}

// sliding window solution
function longestNiceSubarray2(nums: number[]): number {
  let mask = 0; // store the combined bits of the current subarray
  let result = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    // if adding nums[right] causes a conflict (shared bit), slide the window
    while ((mask & nums[right]) !== 0) {
      // ~nums[left] flips all the bits of nums[left], i.e., it performs a bitwise NOT operation
      // mask &= performs a bitwise AND operation and right result
      mask &= ~nums[left]; // remove the bits of nums[left] from the mask
      left++;
    }
    // no conflict, add the current window number's bits
    mask |= nums[right];

    result = Math.max(result, right - left + 1);
  }

  return result;
}
