// https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-ii
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
// Adding 0 to nums[1], after which nums becomes [1, 4, 5].
// Adding -1 to nums[2], after which nums becomes [1, 4, 4].

// Example 2:
// Input: nums = [5,11,20,20], k = 5, numOperations = 1
// Output: 2
// Explanation:
// We can achieve a maximum frequency of two by:
// Adding 0 to nums[1].

// Constraints:
// difference with 3346, range of nums[i] & k is much bigger
// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^9
// 0 <= k <= 10^9
// 0 <= numOperations <= nums.length

// very similar to Q3346, use the same answer can lead to TLE
// https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-ii/solutions/6035213/javascript-sort-map/?envType=daily-question&envId=2025-10-22
function maxFrequencyII(
  nums: number[],
  k: number,
  numOperations: number,
): number {
  const n = nums.length;
  nums.sort((a, b) => a - b); // ascending order
  const map = new Map<number, number>(); // Initialize a map to store the frequency of each number in the nums array
  let ans = 0;

  // case 1: existing element as potential target
  let i = 0;
  let j = 0;
  //  It updates the frequency of the numbers in the subarray and calculates the current frequency of the number being considered. The maximum frequency found so far is updated accordingly.
  for (const num of nums) {
    // increase gap
    // Increase the gap by adding a value in the range [-k, k] to the current number
    while (j < n && nums[j] <= num + k) {
      map.set(nums[j], (map.get(nums[j]) || 0) + 1);
      j++;
    }

    // decreate gap
    // Decrease the gap by subtracting a value in the range [-k, k] from the current number
    while (i < n && nums[i] < num - k) {
      map.set(nums[i], map.get(nums[i])! - 1);
      i++;
    }

    // Calculate the current frequency of the number being considered
    const curr = Math.min(j - i, map.get(num)! + numOperations);
    ans = Math.max(ans, curr);
  }

  // case 2: non-existing element as potential target
  j = 0;
  for (let i = 0; i < n; i++) {
    // Expand the subarray by incrementing j until the end of the subarray exceeds the potential target plus 2*k
    while (j < n && nums[j] <= nums[i] + 2 * k) {
      j++;
    }
    // Calculate the current frequency of the subarray
    const curr = Math.min(j - i, numOperations);
    ans = Math.max(ans, curr);
  }

  return ans;
}
