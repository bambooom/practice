// https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii
// Given an array nums of n integers, your task is to find the maximum value of k for which there exist two adjacent subarrays of length k each, such that both subarrays are strictly increasing. Specifically, check if there are two subarrays of length k starting at indices a and b (a < b), where:
// Both subarrays nums[a..a + k - 1] and nums[b..b + k - 1] are strictly increasing.
// The subarrays must be adjacent, meaning b = a + k.
// Return the maximum possible value of k.
// A subarray is a contiguous non-empty sequence of elements within an array.

// Example 1:
// Input: nums = [2,5,7,8,9,2,3,4,3,1]
// Output: 3
// Explanation:
// The subarray starting at index 2 is [7, 8, 9], which is strictly increasing.
// The subarray starting at index 5 is [2, 3, 4], which is also strictly increasing.
// These two subarrays are adjacent, and 3 is the maximum possible value of k for which two such adjacent strictly increasing subarrays exist.

// Example 2:
// Input: nums = [1,2,3,4,4,4,4,5,6,7]
// Output: 2
// Explanation:
// The subarray starting at index 0 is [1, 2], which is strictly increasing.
// The subarray starting at index 2 is [3, 4], which is also strictly increasing.
// These two subarrays are adjacent, and 2 is the maximum possible value of k for which two such adjacent strictly increasing subarrays exist.

// Constraints:
// 2 <= nums.length <= 2 * 10^5
// -109 <= nums[i] <= 10^9

// https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii/solutions/7275640/adjacent-inc-subarrays-detection-ii-beats-96-java-c-c-c-python3-go-js-ts/?envType=daily-question&envId=2025-10-15
// We need to find the maximum length k such that there exist two adjacent strictly increasing subarrays of length k.
// While traversing the array, we can track how long the current strictly increasing sequence (up) is, and how long the previous one (preUp) was.
// At every point where an increase breaks, we can compare these two consecutive runs to determine how large adjacent increasing subarrays can be.
function maxIncreasingSubarrays(nums: number[]): number {
  let n = nums.length;
  let up = 1; // length of the current strictly increasing segment.
  let preUp = 0; // length of the previous strictly increasing segment.
  let res = 0; // the maximum valid length k found so far.

  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      up++; // extend the current strictly increasing segment
    } else {
      // otherwise, we move on to the next strictly increasing segment
      preUp = up;
      up = 1;
    }

    let half = up >> 1; // half of a long continuous increasing sequence
    let m = Math.min(preUp, up);
    // if the increase breaks between two runs
    //Take the larger of these values and update res.
    let candidate = Math.max(half, m);

    if (candidate > res) {
      res = candidate;
    }
  }

  return res;
}
