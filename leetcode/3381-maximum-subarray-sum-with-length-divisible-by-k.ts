// https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k/
// You are given an array of integers nums and an integer k.
// Return the maximum sum of a subarray of nums, such that the size of the subarray is divisible by k.

// Example 1:
// Input: nums = [1,2], k = 1
// Output: 3
// Explanation:
// The subarray [1, 2] with sum 3 has length equal to 2 which is divisible by 1.

// Example 2:
// Input: nums = [-1,-2,-3,-4,-5], k = 4
// Output: -10
// Explanation:
// The maximum sum subarray is [-1, -2, -3, -4] which has length equal to 4 which is divisible by 4.

// Example 3:
// Input: nums = [-5,1,2,-3,4], k = 2
// Output: 4
// Explanation:
// The maximum sum subarray is [1, 2, -3, 4] which has length equal to 4 which is divisible by 2.

// Constraints:
// 1 <= k <= nums.length <= 2 * 10^5
// -10^9 <= nums[i] <= 10^9

// https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k/solutions/7376581/all-language-solution-c-java-python-rust-jm71/?envType=daily-question&envId=2025-11-27
function maxSubarraySum(nums: number[], k: number): number {
  const INF = 1e30;
  // This array will store the minimum prefix sum seen so far for each possible window length
  const minPrefix = new Array(k).fill(INF);
  minPrefix[0] = 0; // This represents the minimum prefix sum for a window of length 0

  let prefix = 0; // store the current prefix sum
  let answer = -INF; // store the maximum subarray sum found so far

  for (let i = 0; i < nums.length; i++) {
    // Calculate the prefix sum by adding the current number to `prefix`
    prefix += nums[i];
    // This represents the length of the current window modulo `k`
    const mod = (i + 1) % k;

    // This means we have seen a window of length `k` ending at index `i - k + 1`
    if (minPrefix[mod] !== INF) {
      // Update `answer` by taking the maximum of the current `answer` and the difference between `prefix` and `minPrefix[mod]`
      // This is because the maximum subarray sum with length divisible by `k` can be formed by extending the previous window
      answer = Math.max(answer, prefix - minPrefix[mod]);
    }

    // This means the current prefix sum is smaller than the minimum prefix sum seen so far for the current window length
    if (prefix < minPrefix[mod]) {
      minPrefix[mod] = prefix; // This ensures that we keep track of the minimum prefix sum for the current window length
    }
  }

  return answer;
}

// Editorial
function maxSubarraySum2(nums: number[], k: number): number {
  let n = nums.length;
  let prefixSum = 0;
  let maxSum = -Number.MAX_SAFE_INTEGER;
  // array that stores the minimum prefix sum seen so far for each possible window length
  // kSum[i] represents the minimum prefix sum for a window of length i
  let kSum: number[] = Array(k).fill(Number.MAX_SAFE_INTEGER / 2);
  kSum[k - 1] = 0;

  for (let i = 0; i < n; i++) {
    // Update prefix sum
    prefixSum += nums[i];

    // Calculate the maximum sum
    maxSum = Math.max(maxSum, prefixSum - kSum[i % k]);
    // // Update the kSum array
    kSum[i % k] = Math.min(kSum[i % k], prefixSum);
  }
  return maxSum;
}
