// https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/
// You are given an integer array nums. The absolute sum of a subarray [numsl, numsl+1, ..., numsr-1, numsr] is abs(numsl + numsl+1 + ... + numsr-1 + numsr).
// Return the maximum absolute sum of any (possibly empty) subarray of nums.
// Note that abs(x) is defined as follows:
// If x is a negative integer, then abs(x) = -x.
// If x is a non - negative integer, then abs(x) = x.

// Example 1:
// Input: nums = [1,-3,2,3,-4]
// Output: 5
// Explanation: The subarray [2,3] has absolute sum = abs(2+3) = abs(5) = 5.

// Example 2:
// Input: nums = [2,-5,1,-4,3,-2]
// Output: 8
// Explanation: The subarray [-5,1,-4] has absolute sum = abs(-5+1-4) = abs(-8) = 8.

// https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/solutions/5902888/linear-simple-solution/
// To maximize the absolute sum, we must calculate and compare the maximum positive and maximum negative sums, which can be achieved by comparing the absolute values of both sums.
function maxAbsoluteSum(nums: number[]): number {
  let maxSum = 0;
  let positiveSum = 0;
  let negativeSum = 0;

  for (const num of nums) {
    positiveSum = Math.max(positiveSum + num, 0);
    negativeSum = Math.min(negativeSum - num, 0);
    maxSum = Math.max(maxSum, positiveSum, negativeSum);
  }

  return maxSum;
}

// https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/solutions/1517994/typescript-javascript-kadane-s-algo-o-n-with-comments-negative-max-positive-max/
function maxAbsoluteSum2(nums: number[]): number {
  /**

    Find the max sum and min sum, why? cause the there's a case
        max sum -> 21
        min sum -> -27

    Collect the positive max and negative max (we'll do Math.abs later).

    Let's reduce to the Kadane(max subarray sum) prob

    **/
  const N = nums.length;
  let maxSum = 0;
  let minSum = 0;
  let ret = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < N; i++) {
    // Kadane's algo for max
    maxSum = Math.max(nums[i], maxSum + nums[i]);
    // Kadane's algo for negative max
    minSum = Math.min(nums[i], minSum + nums[i]);

    ret = Math.max(ret, maxSum, Math.abs(minSum));
  }

  return ret;
}
