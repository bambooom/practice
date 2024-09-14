// https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and
// You are given an integer array nums of size n.
// Consider a non-empty subarray from nums that has the maximum possible bitwise AND.
//  - In other words, let k be the maximum value of the bitwise AND of any subarray of nums. Then, only subarrays with a bitwise AND equal to k should be considered.
// Return the length of the longest such subarray.
// The bitwise AND of an array is the bitwise AND of all the numbers in it.
// A subarray is a contiguous sequence of elements within an array.

// Example 1:
// Input: nums = [1,2,3,3,2,2]
// Output: 2
// Explanation:
// The maximum possible bitwise AND of a subarray is 3.
// The longest subarray with that value is [3,3], so we return 2.

// Example 2:
// Input: nums = [1,2,3,4]
// Output: 1
// Explanation:
// The maximum possible bitwise AND of a subarray is 4.
// The longest subarray with that value is [4], so we return 1.

// https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and/
// bit, greedy, sliding window
// - the maximum value of bitwise and of an subarray should always be the value of the element with highest value in nums - max_number
// - the bitwise and of the max_number with any different number is always smaller than current max_number. For instance, the bitwise and of 9 and any number smaller than 9 will be less than 9.
// 9 & 8 = 8
// 9 & 7 = 1
// 9 & 6 = 0
// ...
// 9 & 1 = 1
// 9 & 0 = 0
// - Thus, to maintain this maximum, the whole subarray should contain all similar element to this max_number
// - Thus we just find the max_number in nums and then find the longest continous subarray that contain all the same number max_number.
// - In other word, the problem actually asks for the longest subarray with all values equal to max(nums)
// - For example, nums = [1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3]` the answer will be 5.
function longestSubarray(nums: number[]): number {
  let j = -1; // Stores the index of the last element that is not the maximum value.
  const maxVal = Math.max(...nums);
  let res = 0; // Stores the length of the longest subarray containing only the maximum value.

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== maxVal) {
      // if current number is not the maximum value
      // update j
      j = i;
    }
    // current subarray containing only the maximum value and updated res
    res = Math.max(res, i - j);
  }

  return res;
}

// https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and/solutions/5771401/best-solution-easy-explanation-all-languages/
// The intuition is that the maximum possible bitwise AND can only occur when all elements of the subarray are equal to the largest value in the array.
// This is because the bitwise AND of any subarray that includes a smaller number will be smaller than the largest value.
function longestSubarray(nums: number[]): number {
  let length = 0;
  const maxVal = Math.max(...nums);

  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === maxVal) {
      count++;
      length = Math.max(length, count);
    } else {
      count = 0;
    }
  }
  return length;
}
