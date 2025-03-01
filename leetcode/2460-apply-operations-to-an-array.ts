// https://leetcode.com/problems/apply-operations-to-an-array

// You are given a 0-indexed array nums of size n consisting of non-negative integers.
// You need to apply n - 1 operations to this array where, in the ith operation (0-indexed), you will apply the following on the ith element of nums:
// If nums[i] == nums[i + 1], then multiply nums[i] by 2 and set nums[i + 1] to 0. Otherwise, you skip this operation.
// After performing all the operations, shift all the 0's to the end of the array.
// For example, the array [1,0,2,0,0,1] after shifting all its 0's to the end, is [1,2,1,0,0,0].
// Return the resulting array.
// Note that the operations are applied sequentially, not all at once.

// Example 1:
// Input: nums = [1,2,2,1,1,0]
// Output: [1,4,2,0,0,0]
// Explanation: We do the following operations:
// - i = 0: nums[0] and nums[1] are not equal, so we skip this operation.
// - i = 1: nums[1] and nums[2] are equal, we multiply nums[1] by 2 and change nums[2] to 0. The array becomes [1,4,0,1,1,0].
// - i = 2: nums[2] and nums[3] are not equal, so we skip this operation.
// - i = 3: nums[3] and nums[4] are equal, we multiply nums[3] by 2 and change nums[4] to 0. The array becomes [1,4,0,2,0,0].
// - i = 4: nums[4] and nums[5] are equal, we multiply nums[4] by 2 and change nums[5] to 0. The array becomes [1,4,0,2,0,0].
// After that, we shift the 0's to the end, which gives the array [1,4,2,0,0,0].

// Example 2:
// Input: nums = [0,1]
// Output: [1,0]
// Explanation: No operation can be applied, we just shift the 0 to the end.

// https://leetcode.com/problems/apply-operations-to-an-array/solutions/6479387/beats-100-in-place-processing-zero-shifting-apply-operations-on-array/
// sing loop, zero shifting
function applyOperations(nums: number[]): number[] {
  const n = nums.length;
  const newNums = new Array(n).fill(0);
  let count = 0; // count for positive number

  for (let i = 0; i < n - 1; i++) {
    if (nums[i] !== 0) {
      // non-negative, if zero, no need to process
      if (nums[i] === nums[i + 1]) {
        newNums[count] = nums[i] * 2;
        nums[i + 1] = 0;
        i++;
      } else {
        newNums[count] = nums[i];
      }
      count++;
    }
  }

  if (nums[n - 1] !== 0) {
    newNums[count++] = nums[n - 1];
  }

  return newNums;
}

// https://leetcode.com/problems/apply-operations-to-an-array/solutions/6479062/two-pointers-0-ms-js-ts-beats-100-00/
// two pointers
function applyOperations2(nums: number[]): number[] {
  const n = nums.length;
  let j = 0;

  for (let i = 0; i < n; ++i) {
    if (i < n - 1 && nums[i] === nums[i + 1]) {
      nums[i] *= 2;
      nums[i + 1] = 0;
    }
    if (nums[i] !== 0) {
      nums[j++] = nums[i];
    }
  }
  nums.fill(0, j);

  return nums;
}
