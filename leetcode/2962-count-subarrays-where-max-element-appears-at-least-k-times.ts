// https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/description
// You are given an integer array nums and a positive integer k.
// Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.
// A subarray is a contiguous sequence of elements within an array.

// Example 1:
// Input: nums = [1,3,2,3,3], k = 2
// Output: 6
// Explanation: The subarrays that contain the element 3 at least 2 times are: [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].

// Example 2:
// Input: nums = [1,4,2,1], k = 3
// Output: 0
// Explanation: No subarray contains the element 4 at least 3 times.

function countSubarraysWithMaxAtLeastKTimes(nums: number[], k: number): number {
  const max = Math.max(...nums);
  let count = 0;
  let left = 0;
  let right = 0;
  let maxCount = 0;

  while (right < nums.length) {
    if (nums[right] === max) {
      maxCount++;
    }
    while (maxCount >= k) {
      // it means that the current window [left, right] contains at least k occurrences of the maximum element.
      count += nums.length - right; // For each position i in the range [right, nums.length - 1], we can form a subarray by extending the current window [left, right] to [left, i].
      // Since the maximum element appears at least k times in the window [left, right], it will also appear at least k times in all the extended subarrays [left, i].
      // Therefore, we can count all the extended subarrays [left, i] as valid subarrays where the maximum element appears at least k times.
      if (nums[left] === max) {
        // If the leftmost element in the window is the maximum element, we need to decrement the maxCount to reflect the removal of this element from the window.
        maxCount--;
      }
      left++; // Move the left pointer to the right to shrink the window.
    }
    right++;
  }

  return count;
}
