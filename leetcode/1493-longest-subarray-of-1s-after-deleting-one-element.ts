// https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/
// #dynamic-programming #sliding-window
// Given a binary array nums, you should delete one element from it.
// Return the size of the longest non-empty subarray containing only 1's in the resulting array.
// Return 0 if there is no such subarray.

// without sliding-window
function longestSubarray(nums: number[]): number {
  // base cases:
  // 1. if length is less than 1, return 0, must delete one element
  if (nums.length <= 1) return 0;
  // 2. if there is no 1, return 0
  if (!nums.includes(1)) return 0;
  // 3. if there is no 0, return length - 1, must delete one element
  if (!nums.includes(0)) return nums.length - 1;

  let maxLength = 0; // Maximum length of consecutive 1s seen so far
  let count = 0; // Current count of consecutive 1s
  let onesBefore = 0; // Count of 1s before the current number
  for (const num of nums) {
    if (num) {
      // is 1
      count++; // increase count
      // Update the maximum length if the current count plus the count of 1s before
      // the current number is greater than the maximum length
      // keep the possibility that can delete 0 to connect two 1s
      maxLength = Math.max(maxLength, count + onesBefore);
    } else {
      // 0
      // If the current number is 0, reset the count and update the count of 1s before
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
