// https://leetcode.com/problems/find-the-maximum-sum-of-node-values
// There exists an undirected tree with n nodes numbered 0 to n - 1. You are given a 0-indexed 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the tree. You are also given a positive integer k, and a 0-indexed array of non-negative integers nums of length n, where nums[i] represents the value of the node numbered i.
// Alice wants the sum of values of tree nodes to be maximum, for which Alice can perform the following operation any number of times (including zero) on the tree:
// Choose any edge [u, v] connecting the nodes u and v, and update their values as follows:
// nums[u] = nums[u] XOR k
// nums[v] = nums[v] XOR k
// Return the maximum possible sum of the values Alice can achieve by performing the operation any number of times.

// Example 1:
// Input: nums = [1,2,1], k = 3, edges = [[0,1],[0,2]]
// Output: 6
// Explanation: Alice can achieve the maximum sum of 6 using a single operation:
// - Choose the edge [0,2]. nums[0] and nums[2] become: 1 XOR 3 = 2, and the array nums becomes: [1,2,1] -> [2,2,2].
// The total sum of values is 2 + 2 + 2 = 6.
// It can be shown that 6 is the maximum achievable sum of values.

// Example 2:
// Input: nums = [2,3], k = 7, edges = [[0,1]]
// Output: 9
// Explanation: Alice can achieve the maximum sum of 9 using a single operation:
// - Choose the edge [0,1]. nums[0] becomes: 2 XOR 7 = 5 and nums[1] become: 3 XOR 7 = 4, and the array nums becomes: [2,3] -> [5,4].
// The total sum of values is 5 + 4 = 9.
// It can be shown that 9 is the maximum achievable sum of values.

// Example 3:
// Input: nums = [7,7,7,7,7,7], k = 3, edges = [[0,1],[0,2],[0,3],[0,4],[0,5]]
// Output: 42
// Explanation: The maximum achievable sum is 42 which can be achieved by Alice performing no operations.

// https://leetcode.com/problems/find-the-maximum-sum-of-node-values/solutions/5176710/fastest-execution-beats-100-users-with-java-typescript-python3-c-greedy/?envType=daily-question&envId=2025-05-23

function maximumValueSum(nums: number[], k: number, edges: number[][]): number {
  let bestSum = 0;
  let cnt = 0; // count how many times the value of a node increases when XORed with k.

  // compute the best possible sum and count the number of nodes where XORing increases the value
  for (const num of nums) {
    bestSum += Math.max(num, num ^ k);
    if ((num ^ k) > num) {
      cnt++; // Check if XORing num with k results in a larger value than num. If it does, increment the cnt counter.
    }
  }

  // if cnt is odd, we need to adjust the sum
  if (cnt % 2 !== 0) {
    // odd means that we have an imbalance in the number of nodes that benefit from XORing with k.
    // but XOR operations must always be applied in pairs, the count should be even
    // To balance it, we need to subtract the smallest possible difference between a node's original value and its XORed value from bestSum.
    let minDifference = Number.MAX_SAFE_INTEGER;
    for (const num of nums) {
      // Loop through each num in nums to find the minimum difference
      minDifference = Math.min(minDifference, Math.abs(num - (num ^ k)));
    }
    // find the minDIfference to "undoing" the XOR operation

    bestSum -= minDifference;
  }

  return bestSum;
}

// Example:
// Consider nums = [5, 2, 7] and k = 3:
// XORing with k: 5^3 = 6, 2^3 = 1, 7^3 = 4
// Beneficial nodes (where num^k > num): only 5 (since 6 > 5)
// Count is 1 (odd)
// We can't actually achieve this because XOR operations must be in pairs
// Minimum difference: |5 - 6| = 1
// We subtract 1 from our best sum
// This ensures our answer respects the constraint that XOR operations must be applied in pairs.
