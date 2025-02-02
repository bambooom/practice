// https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/description/
// Given an array nums, return true if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero). Otherwise, return false.
// There may be duplicates in the original array.
// Note: An array A rotated by x positions results in an array B of the same length such that A[i] == B[(i+x) % A.length], where % is the modulo operation.

// Example 1:
// Input: nums = [3,4,5,1,2]
// Output: true
// Explanation: [1,2,3,4,5] is the original sorted array.
// You can rotate the array by x = 3 positions to begin on the the element of value 3: [3,4,5,1,2].

// Example 2:
// Input: nums = [2,1,3,4]
// Output: false
// Explanation: There is no sorted array once rotated that can make nums.

// Example 3:
// Input: nums = [1,2,3]
// Output: true
// Explanation: [1,2,3] is the original sorted array.
// You can rotate the array by x = 0 positions (i.e. no rotation) to make nums.

function check(nums: number[]): boolean {
  const last = nums.length - 1;
  let isRotated = false;

  for (let i = 1; i <= last; i++) {
    if (nums[i] < nums[i - 1]) {
      if (!isRotated) {
        isRotated = true;
      } else {
        return false;
      }
    }
  }

  return !isRotated || nums[last] <= nums[0];
}

// https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/solutions/6344304/looking-for-an-intuition-then-don-t-use-modulo-neither-handle-the-edge-case/
function check2(nums: number[]): boolean {
  let count = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] < nums[i]) {
      count++;
    }
  }

  if (count === 0) {
    return true; // originally sorted
  }

  if (count > 1) {
    return false; // decreasing count more than 1
  }

  return nums[0] >= nums[nums.length - 1];
}
