// https://leetcode.com/problems/subarray-sum-equals-k/
// Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

// we can keep a record of all the sums up to index i, that is Sum0, Sum1...Sumi.
// For each new sum, we can check if there is a previous Sum such that Sum_current - Sum_prev = k.In order to find what is the "old_index", we can just change the formula to Sum_curren - k = Sum_old and look up from our record to see if we find a matching pair.If we did, bingo, that means we found a valid subarray.
function subarraySum(nums: number[], k: number): number {
  const map = new Map<number, number>();
  map.set(0, 1);

  let sum = 0;
  let count = 0;

  for (const num of nums) {
    sum += num;

    if (map.has(sum - k)) {
      count += map.get(sum - k) as number;
    }
    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
}
