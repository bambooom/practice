// https://leetcode.com/problems/partition-equal-subset-sum/
// Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.
// #Dynamic-programming

// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].

function canPartition(nums: number[]): boolean {
  const sum: number = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) {
    return false;
  }
  // Now, our aim is to find if at least one subarray has the sum equal to the value `half`
  // As we can be sure that the other half of the subarray will have the same value
  const half = sum / 2;
  const dp: boolean[] = [true];
  for (let index = 0; index < nums.length; ++index) {
    const num = nums[index];
    for (let i = half; i >= num; --i) {
      dp[i] = dp[i] || dp[i - num];
    }
  }

  return dp[half] || false;
}
