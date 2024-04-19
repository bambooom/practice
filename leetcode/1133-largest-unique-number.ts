// https://leetcode.com/problems/largest-unique-number/
// Given an integer array nums, return the largest integer that only occurs once. If no integer occurs once, return -1.
// #hash-map

// Example 1:
// Input: nums = [5,7,3,9,4,9,8,3,1]
// Output: 8
// Explanation: The maximum integer in the array is 9 but it is repeated. The number 8 occurs only once, so it is the answer.

// Example 2:
// Input: nums = [9,9,8,8]
// Output: -1
// Explanation: There is no number that occurs only once.

function largestUniqueNumber(nums: number[]): number {
  const hash = new Map<number, number>();

  for (const num of nums) {
    hash.set(num, (hash.get(num) || 0) + 1);
  }

  let max = -1;

  for (const [k, v] of hash) {
    if (v === 1) {
      max = Math.max(max, k);
    }
  }

  return max;
}
