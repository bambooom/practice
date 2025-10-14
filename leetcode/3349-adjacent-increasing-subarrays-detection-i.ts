// https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i/
// Given an array nums of n integers and an integer k, determine whether there exist two adjacent subarrays of length k such that both subarrays are strictly increasing. Specifically, check if there are two subarrays starting at indices a and b (a < b), where:
// Both subarrays nums[a..a + k - 1] and nums[b..b + k - 1] are strictly increasing.
// The subarrays must be adjacent, meaning b = a + k.
// Return true if it is possible to find two such subarrays, and false otherwise.

// Example 1:
// Input: nums = [2,5,7,8,9,2,3,4,3,1], k = 3
// Output: true
// Explanation:
// The subarray starting at index 2 is [7, 8, 9], which is strictly increasing.
// The subarray starting at index 5 is [2, 3, 4], which is also strictly increasing.
// These two subarrays are adjacent, so the result is true.

// Example 2:
// Input: nums = [1,2,3,4,4,4,4,5,6,7], k = 5
// Output: false

// Constraints:
// 2 <= nums.length <= 100
// 1 < 2 * k <= nums.length
// -1000 <= nums[i] <= 1000

// https://leetcode.com/problems/adjacent-increasing-subarrays-detection-i/solutions/7273227/adjacent-increasing-subarrays-detection-i-beat-100-java-c-c-c-python3-go-js-ts/?envType=daily-question&envId=2025-10-14
// Instead of checking every possible subarray separately, we can track the lengths of increasing runs as we traverse the array.
// If two consecutive increasing runs each have length at least k, then such subarrays exist.
function hasIncreasingSubarrays(nums: number[], k: number): boolean {
  let inc = 1; // length of the current strictly increasing run
  let prevInc = 0; // length of the previous increasing run
  let maxLen = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      inc++; // increasing
    } else {
      prevInc = inc; // store the previous increasing run
      inc = 1; // reset the current increasing run
    }

    // After each update, check if both the previous and current runs can form subarrays of size k
    // inc >> 1 performs inc / 2, it finds the maximum lenfth of the subarray that can be formed usign current increasing run
    // Math.min(prevInc, inc) finds the minimum length of the two increasing runs. By taking the minimum of prevInc and inc, it ensures that the length of the subarray is based on the smaller of the two runs.
    // update the maxLen with the maximum length of the subarray that can be formed using either the current or the previous increasing run.
    maxLen = Math.max(maxLen, Math.max(inc >> 1, Math.min(prevInc, inc)));

    if (maxLen >= k) {
      return true;
    }
  }

  return false;
}

// trivial
function hasIncreasingSubarrays2(nums: number[], k: number): boolean {
  const kk = k * 2;
  for (let i = 0; i <= nums.length - kk; i++) {
    const aa = nums.slice(i, i + k);
    const bb = nums.slice(i + k, i + kk);

    function isStrictlyIncreasing(nums: number[]): boolean {
      return nums.every((val, i, arr) => i === 0 || val > arr[i - 1]);
    }

    if (isStrictlyIncreasing(aa) && isStrictlyIncreasing(bb)) {
      return true;
    }
  }
  return false;
}
