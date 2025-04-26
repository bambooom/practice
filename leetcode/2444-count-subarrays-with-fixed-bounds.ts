// https://leetcode.com/problems/count-subarrays-with-fixed-bounds
// You are given an integer array nums and two integers minK and maxK.
// A fixed-bound subarray of nums is a subarray that satisfies the following conditions:
// The minimum value in the subarray is equal to minK.
// The maximum value in the subarray is equal to maxK.
// Return the number of fixed-bound subarrays.
// A subarray is a contiguous part of an array.

// Example 1:
// Input: nums = [1,3,5,2,7,5], minK = 1, maxK = 5
// Output: 2
// Explanation: The fixed-bound subarrays are [1,3,5] and [1,3,5,2].

// Example 2:
// Input: nums = [1,1,1,1], minK = 1, maxK = 1
// Output: 10
// Explanation: Every subarray of nums is a fixed-bound subarray. There are 10 possible subarrays.

// https://leetcode.com/problems/count-subarrays-with-fixed-bounds/solutions/6687450/beats-100-algorithms-sliding-window-single-pass-with-index-tracking/?envType=daily-question&envId=2025-04-26
// sliding window
function countSubarrays(nums: number[], minK: number, maxK: number): number {
  let count = 0;
  // track last indices of minK, maxK, and any value outside [minK, maxK]
  let minKIdx = -1;
  let maxKIdx = -1;
  let outOfBoundIdx = -1;

  for (let i = 0; i < nums.length; i++) {
    const v = nums[i];

    // if v is out of the allowed range, reset the window
    if (v < minK || v > maxK) {
      outOfBoundIdx = i;
    }

    // Record when we see minK or maxK
    if (v === minK) {
      minKIdx = i;
    }
    if (v === maxK) {
      maxKIdx = i;
    }

    // earlist start that includes both minK and maxK
    const validStart = Math.min(minKIdx, maxKIdx);
    // all starts after outOfBoundsIdx to valiStart are valid
    count += Math.max(0, validStart - outOfBoundIdx);
  }

  return count;
}

// seems better understanding
function countSubarrays2(nums: number[], minK: number, maxK: number): number {
  let count = 0;
  let minPos = -1;
  let maxPos = -1;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    const end = nums[right];

    if (end < minK || end > maxK) {
      minPos = -1;
      maxPos = -1;
      left = right + 1;
    }

    if (end === minK) {
      minPos = right;
    }
    if (end === maxK) {
      maxPos = right;
    }

    if (minPos !== -1 && maxPos !== -1) {
      count += Math.min(minPos, maxPos) + 1 - left;
    }
  }

  return count;
}
