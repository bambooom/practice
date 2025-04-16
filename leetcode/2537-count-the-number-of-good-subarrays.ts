// https://leetcode.com/problems/count-the-number-of-good-subarrays
// Given an integer array nums and an integer k, return the number of good subarrays of nums.
// A subarray arr is good if there are at least k pairs of indices (i, j) such that i < j and arr[i] == arr[j].
// A subarray is a contiguous non-empty sequence of elements within an array.
// #sliding-window #hash-table

// Example 1:
// Input: nums = [1,1,1,1,1], k = 10
// Output: 1
// Explanation: The only good subarray is the array nums itself.

// Example 2:
// Input: nums = [3,1,4,3,2,2,4], k = 2
// Output: 4
// Explanation: There are 4 different good subarrays:
// - [3,1,4,3,2,2] that has 2 pairs.
// - [3,1,4,3,2,2,4] that has 3 pairs.
// - [1,4,3,2,2,4] that has 2 pairs.
// - [4,3,2,2,4] that has 2 pairs.

function countGood(nums: number[], k: number): number {
  let pairCount = 0;
  const freq: { [key: number]: number } = {}; // rack occurrences of elements in the current window
  let result = 0;
  let left = 0;

  // expand the window from the right
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] in freq) {
      // Add the frequency of the new element to good_pairs.
      const temp = freq[nums[right]];
      pairCount += temp;
      freq[nums[right]] = temp + 1;
    } else {
      // increment the frequency of new element
      freq[nums[right]] = 1;
    }

    // Shrink the window from the left if good_pairs >= k:
    while (pairCount >= k) {
      result += nums.length - right;
      const leftCount = freq[nums[left]]; // Decrease the frequency of nums[left]
      pairCount -= leftCount - 1;
      freq[nums[left]] = leftCount - 1; // Remove its contribution to good_pairs
      left++; // Move left forward
    }
  }

  return result;
}
