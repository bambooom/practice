// https://leetcode.com/problems/missing-ranges/

// You are given an inclusive range [lower, upper] and a sorted unique integer array nums, where all elements are within the inclusive range.
// A number x is considered missing if x is in the range [lower, upper] and x is not in nums.
// Return the shortest sorted list of ranges that exactly covers all the missing numbers. That is, no element of nums is included in any of the ranges, and each missing number is covered by one of the ranges.

// Example
// Input: nums = [0,1,3,50,75], lower = 0, upper = 99
// Output: [[2,2],[4,49],[51,74],[76,99]]

function findMissingRanges(
  nums: number[],
  lower: number,
  upper: number,
): number[][] {
  if (nums.length === 0) {
    return [[lower, upper]];
  }

  const res = [];
  if (lower < nums[0]) {
    res.push([lower, nums[0] - 1]);
  }

  for (let i = 0; i < nums.length - 1; i++) {
    const diff = nums[i + 1] - nums[i];

    if (diff <= 1) {
      continue;
    }

    res.push([nums[i] + 1, nums[i + 1] - 1]);
  }

  if (upper > nums[nums.length - 1]) {
    res.push([nums[nums.length - 1] + 1, upper]);
  }

  return res;
}
