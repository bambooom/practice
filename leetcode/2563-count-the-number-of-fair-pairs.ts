// https://leetcode.com/problems/count-the-number-of-fair-pairs
// Given a 0-indexed integer array nums of size n and two integers lower and upper, return the number of fair pairs.
// A pair (i, j) is fair if:
// 0 <= i < j < n, and
// lower <= nums[i] + nums[j] <= upper

// Example 1:
// Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
// Output: 6
// Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4), and (1,5).

// Example 2:
// Input: nums = [1,7,9,2,5], lower = 11, upper = 11
// Output: 1
// Explanation: There is a single fair pair: (2,3).

// straigntforward, but TLE
function countFairPairs(nums: number[], lower: number, upper: number): number {
  let count = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] >= lower && nums[i] + nums[j] <= upper) {
        count++;
      }
    }
  }

  return count;
}

// https://leetcode.com/problems/count-the-number-of-fair-pairs/solutions/6040777/beats-100-explained-step-by-step-list-most-common-array-interview-problems/?envType=daily-question&envId=2025-04-19
// two pointers
function countFairPairs2(nums: number[], lower: number, upper: number): number {
  nums.sort((a, b) => a - b); // fair pair no need to consider the real index in nums

  const countPairs = (nums: number[], target: number): number => {
    let count = 0;
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
      if (nums[left] + nums[right] <= target) {
        count += right - left;
        left++;
      } else {
        right--;
      }
    }

    return count;
  };

  return countPairs(nums, upper) - countPairs(nums, lower - 1);
}

// binary search
function countFairPairs3(nums: number[], lower: number, upper: number): number {
  const binSearch = (
    nums: number[],
    l: number,
    r: number,
    target: number,
  ): number => {
    while (l <= r) {
      const m = l + Math.floor((r - l) / 2);
      if (nums[m] >= target) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    }
    return r;
  };

  nums.sort((a, b) => a - b);
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    const low = lower - nums[i];
    const up = upper - nums[i];
    res +=
      binSearch(nums, i + 1, nums.length - 1, up + 1) -
      binSearch(nums, i + 1, nums.length - 1, low);
  }
  return res;
}
