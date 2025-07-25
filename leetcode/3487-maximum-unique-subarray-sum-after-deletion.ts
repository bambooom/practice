//https://leetcode.com/problems/maximum-unique-subarray-sum-after-deletion
// You are given an integer array nums.
// You are allowed to delete any number of elements from nums without making it empty. After performing the deletions, select a subarray of nums such that:
// All elements in the subarray are unique.
// The sum of the elements in the subarray is maximized.
// Return the maximum sum of such a subarray.

// Example 1:
// Input: nums = [1,2,3,4,5]
// Output: 15
// Explanation:
// Select the entire array without deleting any element to obtain the maximum sum.

// Example 2:
// Input: nums = [1,1,0,1,1]
// Output: 1
// Explanation:
// Delete the element nums[0] == 1, nums[1] == 1, nums[2] == 0, and nums[3] == 1. Select the entire array [1] to obtain the maximum sum.

// Example 3:
// Input: nums = [1,2,-1,-2,1,0,-1]
// Output: 3
// Explanation:
// Delete the elements nums[2] == -1 and nums[3] == -2, and select the subarray [2, 1] from [1, 2, 1, 0, -1] to obtain the maximum sum.

// https://leetcode.com/problems/maximum-unique-subarray-sum-after-deletion/solutions/6724167/java-js-ts-solution-jw/?envType=daily-question&envId=2025-07-25
function maxSum(nums: number[]): number {
  const unique = new Set<number>();
  let sum = 0;
  let maxNegative = -Infinity;

  for (const num of nums) {
    if (num > 0) {
      unique.add(num);
    } else {
      // need to consider negative numbers
      maxNegative = Math.max(maxNegative, num);
    }
  }

  for (const val of unique) {
    sum += val;
  }

  // if no unique positive numbers, return maxNegative
  return unique.size === 0 ? maxNegative : sum;
}

// editorial
function maxSum2(nums: number[]): number {
  const positiveNumsSet = new Set(nums.filter((num) => num > 0));
  return positiveNumsSet.size === 0
    ? Math.max(...nums)
    : [...positiveNumsSet].reduce((a, b) => a + b, 0);
}
