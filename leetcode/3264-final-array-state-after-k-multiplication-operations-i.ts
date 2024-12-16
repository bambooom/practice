// https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i/

// You are given an integer array nums, an integer k, and an integer multiplier.
// You need to perform k operations on nums. In each operation:
// Find the minimum value x in nums. If there are multiple occurrences of the minimum value, select the one that appears first.
// Replace the selected minimum value x with x * multiplier.
// Return an integer array denoting the final state of nums after performing all k operations.

function getFinalState(
  nums: number[],
  k: number,
  multiplier: number,
): number[] {
  for (let i = 0; i < k; ++i) {
    const index = nums.indexOf(Math.min(...nums));
    nums[index] *= multiplier;
  }
  return nums;
}
