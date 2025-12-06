// https://leetcode.com/problems/count-partitions-with-max-min-difference-at-most-k
// You are given an integer array nums and an integer k. Your task is to partition nums into one or more non-empty contiguous segments such that in each segment, the difference between its maximum and minimum elements is at most k.
// Return the total number of ways to partition nums under this condition.
// Since the answer may be too large, return it modulo 10^9 + 7.

// Example 1:
// Input: nums = [9,4,1,3,7], k = 4
// Output: 6
// Explanation:
// There are 6 valid partitions where the difference between the maximum and minimum elements in each segment is at most k = 4:
// [[9], [4], [1], [3], [7]]
// [[9], [4], [1], [3, 7]]
// [[9], [4], [1, 3], [7]]
// [[9], [4, 1], [3], [7]]
// [[9], [4, 1], [3, 7]]
// [[9], [4, 1, 3], [7]]

// Example 2:
// Input: nums = [3,3,4], k = 0
// Output: 2
// Explanation:
// There are 2 valid partitions that satisfy the given conditions:
// [[3], [3], [4]]
// [[3, 3], [4]]

// Constraints:
// 2 <= nums.length <= 5 * 10^4
// 1 <= nums[i] <= 10^9
// 0 <= k <= 10^9

function countPartitionsK(nums: number[], k: number): number {
  const MOD = 1e9 + 7;
  const n = nums.length;

  // Initialize an array to store the number of partitions ending at each index
  const dp: number[] = Array(n + 1).fill(0);
  dp[0] = 1;

  // Initialize two arrays to keep track of the indices of the maximum and minimum elements encountered so far
  const mx: number[] = [];
  const mn: number[] = [];
  let l = 0; // track of left boundary
  let sum = 0; // the sum of the current partition

  for (let r = 0; r < n; r++) {
    // Remove elements from mx and mn that are smaller than the current element
    while (mx.length && nums[mx[mx.length - 1]] <= nums[r]) {
      mx.pop();
    }
    while (mn.length && nums[mn[mn.length - 1]] >= nums[r]) {
      mn.pop();
    }

    // Add the current index to mx and mn
    mx.push(r);
    mn.push(r);

    // Continue as long as the difference between the maximum and minimum elements in the current partition is greater than k
    while (nums[mx[0]] - nums[mn[0]] > k) {
      // Remove elements from mx and mn that are at the left boundary l
      if (mx[0] === l) mx.shift();
      if (mn[0] === l) mn.shift();

      // Update the value of sum by subtracting the value of dp[l] and adding MOD (to handle negative values)
      sum = (sum - dp[l] + MOD) % MOD;

      l++;
    }

    // Update the value of sum by adding dp[r]
    sum = (sum + dp[r]) % MOD;
    dp[r + 1] = sum;
  }

  return dp[n];
}
