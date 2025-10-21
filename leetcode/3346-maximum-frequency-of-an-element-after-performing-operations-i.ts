// https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i/
// You are given an integer array nums and two integers k and numOperations.
// You must perform an operation numOperations times on nums, where in each operation you:
// Select an index i that was not selected in any previous operations.
// Add an integer in the range [-k, k] to nums[i].
// Return the maximum possible frequency of any element in nums after performing the operations.

// Example 1:
// Input: nums = [1,4,5], k = 1, numOperations = 2
// Output: 2
// Explanation:
// We can achieve a maximum frequency of two by:
// Adding 0 to nums[1]. nums becomes [1, 4, 5].
// Adding -1 to nums[2]. nums becomes [1, 4, 4].

// Example 2:
// Input: nums = [5,11,20,20], k = 5, numOperations = 1
// Output: 2
// Explanation:
// We can achieve a maximum frequency of two by:
// Adding 0 to nums[1].

// Constraints:
// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^5
// 0 <= k <= 10^5
// 0 <= numOperations <= nums.length

// https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i/solutions/7289410/maximum-freq-of-element-after-operations-most-efficient-java-c-c-c-c-go-python3/?envType=daily-question&envId=2025-10-21
// an element can be shifted within a range [nums[i] - k, nums[i] + k]
// Our goal is to find which target value t can gather the most numbers (including those shifted) within its range using at most numOperations operations.
function maxFrequency(
  nums: number[], // The input array of numbers
  k: number, // The maximum shift range for each element
  numOperations: number, // The maximum number of operations allowed
): number {
  const maxNum = Math.max(...nums); // The maximum value in the input array
  const n = maxNum + k + 2; // The size of the frequency array
  const frequency: number[] = new Array(n).fill(0); // The frequency array

  // Count the frequency of each number in the input array
  for (const num of nums) {
    frequency[num]++;
  }

  const prefixSum: number[] = new Array(n).fill(0); // The prefix sum array
  prefixSum[0] = frequency[0];

  // Calculate the prefix sum
  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + frequency[i];
  }

  let maxFrequency = 0; // The maximum frequency found so far

  // Iterate over each possible target value
  for (let target = 0; target < n; target++) {
    // If the target value is not in the array and we have no operations left, skip it
    if (frequency[target] === 0 && numOperations === 0) {
      continue;
    }

    const left = Math.max(0, target - k); // The left bound of the range
    const right = Math.min(n - 1, target + k); // The right bound of the range
    const totalInRange =
      prefixSum[right] - (left > 0 ? prefixSum[left - 1] : 0); // The total count in the range
    const adjacentCount = totalInRange - frequency[target]; // The number of other numbers that can be turned into the target value
    const possibleFrequency =
      frequency[target] + Math.min(numOperations, adjacentCount); // The possible frequency for the target value

    maxFrequency = Math.max(maxFrequency, possibleFrequency);
  }

  return maxFrequency;
}
