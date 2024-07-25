// https://leetcode.com/problems/maximum-average-subarray-ii
// You are given an integer array nums consisting of n elements, and an integer k.

// Find a contiguous subarray whose length is greater than or equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

// Example 1:

// Input: nums = [1,12,-5,-6,50,3], k = 4
// Output: 12.75000
// Explanation:
// - When the length is 4, averages are [0.5, 12.75, 10.5] and the maximum average is 12.75
// - When the length is 5, averages are [10.4, 10.8] and the maximum average is 10.8
// - When the length is 6, averages are [9.16667] and the maximum average is 9.16667
// The maximum average is when we choose a subarray of length 4 (i.e., the sub array [12, -5, -6, 50]) which has the max average 12.75, so we return 12.75
// Note that we do not consider the subarrays of length < 4.
// Example 2:

// Input: nums = [5], k = 1
// Output: 5.00000

// binary search
// guess solution exists, and find if it really exists
// If it exists, we can continue trying to approximate the solution even to a further precise value, but choosing a larger number as the next approximation. But, if the initial guess is wrong, and the initial maximum average value(guessed) isn't possible, we need to try with a smaller number as the next approximate.
function findMaxAverage(nums: number[], k: number): number {
  // average between min and max
  let maxVal = Math.max(...nums);
  let minVal = Math.min(...nums);

  let prevMid = maxVal;
  let error = Number.MAX_VALUE;

  // check if it exists
  const check = (nums: number[], mid: number, k: number): boolean => {
    let sum = 0;
    let prev = 0;
    let minSum = 0;
    for (let i = 0; i < k; i++) {
      sum += nums[i] - mid;
    }

    if (sum >= 0) {
      return true;
    }

    for (let i = k; i < nums.length; i++) {
      sum += nums[i] - mid;
      prev += nums[i - k] - mid;
      minSum = Math.min(prev, minSum);
      if (sum >= minSum) {
        return true;
      }
    }

    return false;
  };

  while (error > 0.00001) {
    const mid = (maxVal + minVal) / 2;
    if (check(nums, mid, k)) {
      minVal = mid;
    } else {
      maxVal = mid;
    }
    error = Math.abs(prevMid - mid);
    prevMid = mid;
  }

  return minVal;
}
