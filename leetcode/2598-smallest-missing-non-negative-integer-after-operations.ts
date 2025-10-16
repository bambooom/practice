// https://leetcode.com/problems/smallest-missing-non-negative-integer-after-operations
// You are given a 0-indexed integer array nums and an integer value.
// In one operation, you can add or subtract value from any element of nums.
// For example, if nums = [1,2,3] and value = 2, you can choose to subtract value from nums[0] to make nums = [-1,2,3].
// The MEX (minimum excluded) of an array is the smallest missing non-negative integer in it.
// For example, the MEX of [-1,2,3] is 0 while the MEX of [1,0,3] is 2.
// Return the maximum MEX of nums after applying the mentioned operation any number of times.

// Example 1:
// Input: nums = [1,-10,7,13,6,8], value = 5
// Output: 4
// Explanation: One can achieve this result by applying the following operations:
// - Add value to nums[1] twice to make nums = [1,0,7,13,6,8]
// - Subtract value from nums[2] once to make nums = [1,0,2,13,6,8]
// - Subtract value from nums[3] twice to make nums = [1,0,2,3,6,8]
// The MEX of nums is 4. It can be shown that 4 is the maximum MEX we can achieve.

// Example 2:
// Input: nums = [1,-10,7,13,6,8], value = 7
// Output: 2
// Explanation: One can achieve this result by applying the following operation:
// - subtract value from nums[2] once to make nums = [1,-10,0,13,6,8]
// The MEX of nums is 2. It can be shown that 2 is the maximum MEX we can achieve.

// Constraints:
// 1 <= nums.length, value <= 10^5
// -10^9 <= nums[i] <= 10^9

// an integer
function findSmallestInteger(nums: number[], value: number): number {
  if (value === 1) {
    // if value is 1, // If the value is 1, return the length of the nums array
    return nums.length;
  }

  const count = new Array(value).fill(0);
  for (let i = 0; i < nums.length; i++) {
    // Calculate the remainder of the current number divided by the value
    let num = nums[i] % value;
    if (num < 0) {
      // If the remainder is negative, add the value to the number to make it non-negative
      num += value;
    }

    // Increment the corresponding index in the count array
    count[num]++;
  }

  // find out the min multiples of value
  const min = Math.min(...count);

  // find out the left over
  // Find the index of the minimum value in the count array
  const minIndex = count.indexOf(min);

  // // Return the product of the minimum value and the value, plus the index
  return min * value + minIndex;
}
