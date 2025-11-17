// https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away/
// Given an binary array nums and an integer k, return true if all 1's are at least k places away from each other, otherwise return false.

// Example 1:
// Input: nums = [1,0,0,0,1,0,0,1], k = 2
// Output: true
// Explanation: Each of the 1s are at least 2 places away from each other.

// Example 2:
// Input: nums = [1,0,0,1,0,1], k = 2
// Output: false
// Explanation: The second 1 and third 1 are only one apart from each other.

// Constraints:
// 1 <= nums.length <= 10^5
// 0 <= k <= nums.length
// nums[i] is 0 or 1

function kLengthApart(nums: number[], k: number): boolean {
  let prev = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      if (prev !== -1 && i - prev - 1 < k) {
        return false;
      }
      prev = i;
    }
  }

  return true;
}
