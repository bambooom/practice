// https://leetcode.com/problems/increasing-triplet-subsequence/
// Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.

// https://leetcode.com/problems/increasing-triplet-subsequence/solutions/499176/javascript-o-1-space-with-explanation/

function increasingTriplet(nums: number[]): boolean {
  let first = Infinity;
  let second = Infinity;

  for (const cur of nums) {
    // if at any point in the loop, we find a number that is greater than our two stored numbers, then we automatically have a valid triplet
    if (cur > first && cur > second) {
      return true;
    }
    if (cur > first) {
      second = cur;
    } else {
      first = cur; // make first the smallest
    }
  }
  return false;
}
