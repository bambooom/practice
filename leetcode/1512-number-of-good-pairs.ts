// https://leetcode.com/problems/number-of-good-pairs/

// Given an array of integers nums, return the number of good pairs.
// A pair (i, j) is called good if nums[i] == nums[j] and i < j.

// time O(n^2) space O(1)
function numIdenticalPairs(nums: number[]): number {
  let count = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    const p = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (p === nums[j]) {
        count++;
      }
    }
  }

  return count;
}

// hashmap, time O(n) space O(n)
function numIdenticalPairs2(nums: number[]): number {
  let count = 0;
  const map: Record<number, number> = {}; // key: number in nums, value: number of occurrences

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (map[num]) {
      count += map[num];
      map[num]++;
    } else {
      map[num] = 1;
    }
  }

  return count;
}
