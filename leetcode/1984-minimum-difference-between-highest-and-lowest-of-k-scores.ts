// https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/
// You are given a 0-indexed integer array nums, where nums[i] represents the score of the ith student. You are also given an integer k.
// Pick the scores of any k students from the array so that the difference between the highest and the lowest of the k scores is minimized.
// Return the minimum possible difference.

// Example 1:
// Input: nums = [90], k = 1
// Output: 0
// Explanation: There is one way to pick score(s) of one student:
// - [90]. The difference between the highest and lowest score is 90 - 90 = 0.
// The minimum possible difference is 0.

// Example 2:
// Input: nums = [9,4,1,7], k = 2
// Output: 2
// Explanation: There are six ways to pick score(s) of two students:
// - [9,4,1,7]. The difference between the highest and lowest score is 9 - 4 = 5.
// - [9,4,1,7]. The difference between the highest and lowest score is 9 - 1 = 8.
// - [9,4,1,7]. The difference between the highest and lowest score is 9 - 7 = 2.
// - [9,4,1,7]. The difference between the highest and lowest score is 4 - 1 = 3.
// - [9,4,1,7]. The difference between the highest and lowest score is 7 - 4 = 3.
// - [9,4,1,7]. The difference between the highest and lowest score is 7 - 1 = 6.
// The minimum possible difference is 2.

// Constraints:
// 1 <= k <= nums.length <= 1000
// 0 <= nums[i] <= 10^5

function minimumDifference(nums: number[], k: number): number {
  if (nums.length === 1) return 0;

  nums.sort((a, b) => a - b);
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < nums.length - k + 1; i++) {
    min = Math.min(min, nums[i + k - 1] - nums[i]);
  }

  return min;
}

// two pointers
function minimumDifference2(nums: number[], k: number) {
  const n = nums.sort((a, b) => a - b).length;
  let res = Infinity;
  for (let l = 0, r = l + k - 1; r < n; l++, r++) {
    res = Math.min(res, nums[r] - nums[l]);
  }
  return res;
}
