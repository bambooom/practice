// https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/
// Given an integer array nums and an integer k, find three non-overlapping subarrays of length k with maximum sum and return them.
// Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.

// Example 1:
// Input: nums = [1,2,1,2,6,7,5,1], k = 2
// Output: [0,3,5]
// Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
// We could have also taken[2, 1], but an answer of[1, 3, 5] would be lexicographically larger.

// Example 2:
// Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
// Output: [0,2,4]

// https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/solutions/6195672/beats-80-users-with-java-typescript-array-dynamic-programming/
// prefix sum array: compute the sum of any subarray
function maxSumOfThreeSubarrays(nums: number[], k: number): number[] {
  const n = nums.length;
  const sumArr = new Array(n + 1).fill(0); // Prefix sum array
  // sumArr[i] represents the sum of the first i elements in nums.
  // The sum of a subarray nums[a..b] is calculated as: subarray sum=sumArr[b+1]-sumArr[a]
  for (let i = 0; i < n; i++) {
    sumArr[i + 1] = sumArr[i] + nums[i];
  }

  const left = new Array(n).fill(0); // Best left subarray starting indices
  const right = new Array(n).fill(0); // Best right subarray starting indices
  const result = [0, 0, 0]; // Result to store final indices

  // Compute left array
  // For each position i, find the starting index of the maximum subarray of length k that ends at or before i.
  let maxLeftIndex = 0;
  for (let i = k - 1; i < n; i++) {
    if (
      sumArr[i + 1] - sumArr[i + 1 - k] >
      sumArr[maxLeftIndex + k] - sumArr[maxLeftIndex]
    ) {
      maxLeftIndex = i + 1 - k; // update maxLeftIndex
    }
    left[i] = maxLeftIndex;
  }

  // Compute right array
  // For each position i, find the starting index of the maximum subarray of length k that starts at or after i.
  let maxRightIndex = n - k;
  for (let i = n - k; i >= 0; i--) {
    if (
      sumArr[i + k] - sumArr[i] >=
      sumArr[maxRightIndex + k] - sumArr[maxRightIndex]
    ) {
      maxRightIndex = i;
    }
    right[i] = maxRightIndex;
  }

  // Find the maximum sum for the three subarrays
  let maxSum = 0;
  for (let i = k; i <= n - 2 * k; i++) {
    const l = left[i - 1];
    const r = right[i + k];
    const totalSum =
      sumArr[l + k] -
      sumArr[l] +
      (sumArr[i + k] - sumArr[i]) +
      (sumArr[r + k] - sumArr[r]);
    if (totalSum > maxSum) {
      maxSum = totalSum;
      result[0] = l;
      result[1] = i;
      result[2] = r;
    }
  }

  return result;
}
