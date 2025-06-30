// https://leetcode.com/problems/longest-harmonious-subsequence
// We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.
// Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.

// Example 1:
// Input: nums = [1,3,2,2,5,2,3,7]
// Output: 5
// Explanation:
// The longest harmonious subsequence is [3,2,2,2,3].

// Example 2:
// Input: nums = [1,2,3,4]
// Output: 2
// Explanation:
// The longest harmonious subsequences are [1,2], [2,3], and [3,4], all of which have a length of 2.

// Example 3:
// Input: nums = [1,1,1,1]
// Output: 0
// Explanation:
// No harmonic subsequence exists.

function findLHS(nums: number[]): number {
  const map: Record<string, number> = {};
  let res = 0;

  for (let i = 0; i < nums.length; i++) {
    // record the frequency
    map[nums[i]] ? map[nums[i]]++ : (map[nums[i]] = 1);

    // check if there is a number that is 1 less or 1 more
    if (map[nums[i] - 1]) {
      res = Math.max(res, map[nums[i]] + map[nums[i] - 1]);
    }
    if (map[nums[i] + 1]) {
      res = Math.max(res, map[nums[i]] + map[nums[i] + 1]);
    }
  }

  return res;
}

function findLHS2(nums: number[]): number {
  const dict = new Map<number, number>();
  let maxLength = 0;
  // record frequency
  for (const num of nums) {
    dict.set(num, (dict.get(num) || 0) + 1);
  }
  for (const [key, value] of dict) {
    // check if there is a number that is 1
    if (dict.has(key + 1)) {
      maxLength = Math.max(maxLength, value + dict.get(key + 1)!);
    }
  }
  return maxLength;
}
