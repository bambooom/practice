// https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii
// You are given an integer array nums and a positive integer k.
// A subsequence sub of nums with length x is called valid if it satisfies:
// (sub[0] + sub[1]) % k == (sub[1] + sub[2]) % k == ... == (sub[x - 2] + sub[x - 1]) % k.
// Return the length of the longest valid subsequence of nums.

// Example 1:
// Input: nums = [1,2,3,4,5], k = 2
// Output: 5
// Explanation:
// The longest valid subsequence is [1, 2, 3, 4, 5].

// Example 2:
// Input: nums = [1,4,2,3,1,4], k = 3
// Output: 4
// Explanation:
// The longest valid subsequence is [1, 4, 1, 4].

function maximumLength(nums: number[], k: number): number {
  // 2D array, dp[i][j] denotes the maximum length of a valid subsequence whose last two elements have remainders i and j modulo k
  const dp: number[][] = Array.from({ length: k }, () => new Array(k).fill(0));
  let res = 0;
  for (const num of nums) {
    const mod = num % k; // remainder
    for (let prev = 0; prev < k; prev++) {
      // For each remainder mod, the function updates the dp array by incrementing the value at dp[prev][mod] by 1, where prev is the previous remainder.
      // The update is done for all possible previous remainders prev from 0 to k-1.
      dp[prev][mod] = dp[mod][prev] + 1;
      // update max
      res = Math.max(res, dp[prev][mod]);
    }
  }
  return res;
}

// https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii/solutions/6968466/dp-o-nk-optimal-solution-maximum-length-of-valid-subsequence/?envType=daily-question&envId=2025-07-17
function maximumLength2(nums: number[], k: number): number {
  let res = 2;
  for (let j = 0; j < k; j++) {
    const dp: number[] = Array(k).fill(0);

    for (let i = 0; i < nums.length; i++) {
      const mod = nums[i] % k;
      const pos = (j - mod + k) % k;
      dp[mod] = dp[pos] + 1;
    }

    res = Math.max(res, ...dp);
  }

  return res;
}
