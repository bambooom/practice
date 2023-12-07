// https://leetcode.com/problems/two-sum-less-than-k/
// Given an array nums of integers and integer k, return the maximum sum such that there exists i < j with nums[i] + nums[j] = sum and sum < k. If no i, j exist satisfying this equation, return -1.

function twoSumLessThanK(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);

  let ans = -1;
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum < k) {
      ans = Math.max(ans, sum);
      left++;
    } else {
      right--;
    }
  }

  return ans;
}
