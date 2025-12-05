// https://leetcode.com/problems/count-partitions-with-even-sum-difference/
// You are given an integer array nums of length n.
// A partition is defined as an index i where 0 <= i < n - 1, splitting the array into two non-empty subarrays such that:
// Left subarray contains indices [0, i].
// Right subarray contains indices [i + 1, n - 1].
// Return the number of partitions where the difference between the sum of the left and right subarrays is even.

// Example 1:
// Input: nums = [10,10,3,7,6]
// Output: 4
// Explanation:
// The 4 partitions are:
// [10], [10, 3, 7, 6] with a sum difference of 10 - 26 = -16, which is even.
// [10, 10], [3, 7, 6] with a sum difference of 20 - 16 = 4, which is even.
// [10, 10, 3], [7, 6] with a sum difference of 23 - 13 = 10, which is even.
// [10, 10, 3, 7], [6] with a sum difference of 30 - 6 = 24, which is even.

// Example 2:
// Input: nums = [1,2,2]
// Output: 0
// Explanation:
// No partition results in an even sum difference.

// Example 3:
// Input: nums = [2,4,6,8]
// Output: 3
// Explanation:
// All partitions result in an even sum difference.

// Constraints:
// 2 <= n == nums.length <= 100
// 1 <= nums[i] <= 100

// sum is even => diff is even
function countPartitions(nums: number[]): number {
  let total = 0;
  for (const x of nums) {
    total += x;
  }
  if (total % 2 !== 0) {
    return 0;
  }
  return nums.length - 1;
}

function countPartitions2(nums: number[]): number {
  let count = 0;
  let left = nums[0];
  let right = nums.slice(1).reduce((a, b) => a + b);
  if (Math.abs(left - right) % 2 === 0) {
    count++;
  }

  for (let i = 1; i < nums.length - 1; i++) {
    left += nums[i];
    right -= nums[i];
    if (Math.abs(left - right) % 2 === 0) {
      count++;
    }
  }

  return count;
}
