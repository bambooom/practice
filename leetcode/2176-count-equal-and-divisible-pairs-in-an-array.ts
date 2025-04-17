// https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array
// Given a 0-indexed integer array nums of length n and an integer k, return the number of pairs (i, j) where 0 <= i < j < n, such that nums[i] == nums[j] and (i * j) is divisible by k.

// Example 1:
// Input: nums = [3,1,2,2,2,1,3], k = 2
// Output: 4
// Explanation:
// There are 4 pairs that meet all the requirements:
// - nums[0] == nums[6], and 0 * 6 == 0, which is divisible by 2.
// - nums[2] == nums[3], and 2 * 3 == 6, which is divisible by 2.
// - nums[2] == nums[4], and 2 * 4 == 8, which is divisible by 2.
// - nums[3] == nums[4], and 3 * 4 == 12, which is divisible by 2.

// Example 2:
// Input: nums = [1,2,3,4], k = 1
// Output: 0
// Explanation: Since no value in nums is repeated, there are no pairs (i,j) that meet all the requirements.

// straightforward
function countPairs(nums: number[], k: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j] && (i * j) % k === 0) {
        count++;
      }
    }
  }
  return count;
}

// https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array/solutions/6658173/array-hashmap-o-n-worst-case-o-n-log-n-average-case-with-optimizations/?envType=daily-question&envId=2025-04-17
// use hashmap to optimize
function countPairs2(nums: number[], k: number): number {
  const indexMap: Map<number, number[]> = new Map();
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (indexMap.has(num)) {
      for (const j of indexMap.get(num)!) {
        if ((i * j) % k === 0) {
          count++;
        }
      }
    }
    if (!indexMap.has(num)) {
      indexMap.set(num, []);
    }
    indexMap.get(num)!.push(i);
  }

  return count;
}
