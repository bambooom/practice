// https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/
// #dynamic-programming #sliding-window
// Given a binary array nums, you should delete one element from it.
// Return the size of the longest non-empty subarray containing only 1's in the resulting array.
// Return 0 if there is no such subarray.

// without sliding-window
function longestSubarray(nums: number[]): number {
  if (nums.length <= 1) return 0;
  if (!nums.includes(1)) return 0;
  if (!nums.includes(0)) return nums.length - 1;

  let maxLength = 0;
  let count = 0;
  let onesBefore = 0;
  for (const num of nums) {
    if (num) {
      // 1
      count++;
      maxLength = Math.max(maxLength, count + onesBefore);
    } else {
      // 0
      onesBefore = count;
      count = 0; // reset count
    }
  }
  return Math.min(maxLength, nums.length - 1);
}

// using sliding-window
function longestSubarray2(nums: number[]): number {
  let leftIndex = -1;
  let zeroPosition = -1;
  let zeroCount = 0;
  let max = 0;
  for (let index = 0; index < nums.length; index++) {
    if (nums[index] == 0) {
      if (zeroCount == 1) {
        // change current position
        leftIndex = zeroPosition;
      } else {
        zeroCount = 1;
      }
      zeroPosition = index;
    }
    max = Math.max(max, index - leftIndex - 1);
  }
  return max;
}
