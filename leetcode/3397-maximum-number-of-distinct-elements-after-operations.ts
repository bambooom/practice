// https://leetcode.com/problems/maximum-number-of-distinct-elements-after-operations/
// You are given an integer array nums and an integer k.
// You are allowed to perform the following operation on each element of the array at most once:
// Add an integer in the range [-k, k] to the element.
// Return the maximum possible number of distinct elements in nums after performing the operations.

// Example 1:
// Input: nums = [1,2,2,3,3,4], k = 2
// Output: 6
// Explanation:
// nums changes to [-1, 0, 1, 2, 3, 4] after performing operations on the first four elements.

// Example 2:
// Input: nums = [4,4,4,4], k = 1
// Output: 3
// Explanation:
// By adding -1 to nums[0] and 1 to nums[1], nums changes to [3, 5, 4, 4].

// Constraints:
// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^9
// 0 <= k <= 10^9

function maxDistinctElements(nums: number[], k: number): number {
  if (nums.length === 0) {
    return 0;
  }

  // Sorting helps because we can then greedily assign the smallest possible valid number
  // for each element that is still greater than the previously chosen one.
  nums.sort((a, b) => a - b);

  let count = 0;
  let prev = -Infinity; // store the last used distinct value (initialize very small)

  for (let a of nums) {
    // calculate valid range [a-k, a+k]
    const low = a - k;
    const high = a + k;

    // Pick the smallest possible value x = max(prev + 1, a - k) that is still distinct.
    let x = prev + 1;

    if (x < low) {
      x = low;
    }
    // If x <= a + k, count it and update prev = x
    if (x <= high) {
      count++;
      prev = x;
    }
  }

  return count;
}
