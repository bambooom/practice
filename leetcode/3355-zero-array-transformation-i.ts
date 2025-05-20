// https://leetcode.com/problems/zero-array-transformation-i
// You are given an integer array nums of length n and a 2D array queries, where queries[i] = [li, ri].
// For each queries[i]:
// Select a subset of indices within the range [li, ri] in nums.
// Decrement the values at the selected indices by 1.
// A Zero Array is an array where all elements are equal to 0.
// Return true if it is possible to transform nums into a Zero Array after processing all the queries sequentially, otherwise return false.

// Example 1:
// Input: nums = [1,0,1], queries = [[0,2]]
// Output: true
// Explanation:
// For i = 0:
// Select the subset of indices as [0, 2] and decrement the values at these indices by 1.
// The array will become [0, 0, 0], which is a Zero Array.

// Example 2:
// Input: nums = [4,3,2,1], queries = [[1,3],[0,2]]
// Output: false
// Explanation:
// For i = 0:
// Select the subset of indices as [1, 2, 3] and decrement the values at these indices by 1.
// The array will become [4, 2, 1, 0].
// For i = 1:
// Select the subset of indices as [0, 1, 2] and decrement the values at these indices by 1.
// The array will become [3, 1, 0, 0], which is not a Zero Array.

// https://leetcode.com/problems/zero-array-transformation-i/solutions/6101760/easy-solution-with-step-by-step-explanation/?envType=daily-question&envId=2025-05-20
function isZeroArray(nums: number[], queries: number[][]): boolean {
  const n = nums.length;
  const diff = new Array(n + 1).fill(0); // difference array, trackt he net decrement at each index

  for (let i = 0; i < queries.length; i++) {
    const [l, r] = queries[i];
    diff[l] -= 1; // The opposite signs create a "bracket" effect, marks the start of a range
    if (r + 1 < n) {
      diff[r + 1] += 1; // Marks the end of that range, canceling the effect for subsequent positions
    }
  }
  // apply the difference array to nums
  for (let i = 0; i < n; i++) {
    if (i > 0) {
      diff[i] += diff[i - 1]; // accumulate changes
    }

    nums[i] += diff[i]; // apply to original array
    if (nums[i] < 0) {
      nums[i] = 0;
    }
  }

  return nums.every((num) => num === 0);
}
