// https://leetcode.com/problems/find-k-th-smallest-pair-distance
// The distance of a pair of integers a and b is defined as the absolute difference between a and b.
// Given an integer array nums and an integer k, return the kth smallest distance among all the pairs nums[i] and nums[j] where 0 <= i < j < nums.length.

// Example 1:
// Input: nums = [1,3,1], k = 1
// Output: 0
// Explanation: Here are all the pairs:
// (1,3) -> 2
// (1,1) -> 0
// (3,1) -> 2
// Then the 1st smallest distance pair is (1,1), and its distance is 0.

// https://leetcode.com/problems/find-k-th-smallest-pair-distance/solutions/5633267/finding-the-k-th-smallest-distance-pair-in-a-sorted-array-using-binary-search/
// binary search
// 1. sorting the array ensures that distance between pairs can be managed and compared
// 2. binary search on distance
// 3. counting valid pairs, for each midpoint distance, use two-pointer approach to count valid pairs
// 4. adjust binary seach bounds
function smallestDistancePair(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);

  const n = nums.length;
  let left = 0;
  let right = nums[n - 1] - nums[0]; // biggest distance between two pairs

  while (left < right) {
    const mid = (left + right) >> 1;
    let count = 0;
    let i = 0;

    for (let j = 0; j < n; j++) {
      while (nums[j] - nums[i] > mid) {
        i++;
      }
      count += j - i;
    }

    if (count >= k) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
