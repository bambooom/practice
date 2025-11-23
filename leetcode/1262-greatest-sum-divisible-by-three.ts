// https://leetcode.com/problems/greatest-sum-divisible-by-three/
// Given an integer array nums, return the maximum possible sum of elements of the array such that it is divisible by three.

// Example 1:
// Input: nums = [3,6,5,1,8]
// Output: 18
// Explanation: Pick numbers 3, 6, 1 and 8 their sum is 18 (maximum sum divisible by 3).

// Example 2:
// Input: nums = [4]
// Output: 0
// Explanation: Since 4 is not divisible by 3, do not pick any number.

// Example 3:
// Input: nums = [1,2,3,4,4]
// Output: 12
// Explanation: Pick numbers 1, 3, 4 and 4 their sum is 12 (maximum sum divisible by 3).

// Constraints:
// 1 <= nums.length <= 4 * 10^4
// 1 <= nums[i] <= 10^4

// Greedy + Backward Thinking
function maxSumDivThree(nums: number[]): number {
  // Initialize variables to store the sum and the two smallest numbers for each remainder
  let sum = 0;

  let m1a = Infinity; // The smallest number with remainder 1
  let m1b = Infinity; // The second smallest number with remainder 1
  let m2a = Infinity; // The smallest number with remainder 2
  let m2b = Infinity; // The second smallest number with remainder 2

  for (let x of nums) {
    sum += x;
    const r = x % 3;

    // If the remainder is 1, update the smallest and second smallest numbers with remainder 1
    if (r === 1) {
      if (x < m1a) {
        m1b = m1a;
        m1a = x;
      } else if (x < m1b) {
        m1b = x;
      }
    } else if (r === 2) {
      // If the remainder is 2, update the smallest and second smallest numbers with remainder 2
      if (x < m2a) {
        m2b = m2a;
        m2a = x;
      } else if (x < m2b) {
        m2b = x;
      }
    }
  }

  // Calculate the remainder of the sum divided by 3
  const rem = sum % 3;
  if (rem === 0) {
    return sum;
  }

  // Calculate the minimum value to remove from the sum to make it divisible by 3
  let remove = Infinity;

  if (rem === 1) {
    // If the remainder is 1, remove either the smallest number with remainder 1 or the second smallest number with remainder 2
    remove = Math.min(m1a, m2b < Infinity ? m2a + m2b : Infinity);
  } else {
    // If the remainder is 2, remove either the smallest number with remainder 2 or the second smallest number with remainder 1
    remove = Math.min(m2a, m1b < Infinity ? m1a + m1b : Infinity);
  }

  // If no value could be removed, return 0
  return remove === Infinity ? 0 : sum - remove;
}
