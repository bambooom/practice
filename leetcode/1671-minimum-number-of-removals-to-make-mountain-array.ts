// https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/
// You may recall that an array arr is a mountain array if and only if:
// - arr.length >= 3;
// - There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
//     - arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
//     - arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
// Given an integer array nums, return the minimum number of elements to remove to make nums a mountain array.

// Example 1:
// Input: nums = [1,3,1]
// Output: 0
// Explanation: The array itself is a mountain array so we do not need to remove any elements.

// Example 2:
// Input: nums = [2,1,1,5,6,2,3,1]
// Output: 3
// Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].

// https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/solutions/5984675/explained-step-by-step-beats-100-working-30-10-2024/
// Longest Increasing Subsequence (LIS) Solution from both directions

// helper funtion to implement lower_bound functionality
function lowerBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

// helper function to calculate LIS length for each position
function lisLength(v: number[]): number[] {
  const lis: number[] = [v[0]];
  const lisLen = new Array(v.length).fill(1); // track LIS length ending at eaching position

  for (let i = 1; i < v.length; i++) {
    // if current element is larger than last LIS element, extend the sequence
    if (v[i] > lis[lis.length - 1]) {
      lis.push(v[i]);
    } else {
      // replace the smallest element that's >= current element
      // this maintain the potential for longer sequences
      const index = lowerBound(lis, v[i]);
      lis[index] = v[i];
    }
    // store length of LIS up to current position
    lisLen[i] = lis.length;
  }

  return lisLen;
}

function minimumMountainRemovals(nums: number[]): number {
  const n = nums.length;

  // get LIS length from left to right, increasing part
  const lis = lisLength(nums);

  nums.reverse();
  // get LIS length from right to left, decreasing part
  const lds = lisLength(nums);
  lds.reverse();
  nums.reverse(); // restore original array

  let removes = Number.MAX_SAFE_INTEGER;

  // for each potential peak position
  for (let i = 0; i < n; i++) {
    // valid mountain needs both sides to have length > 1
    if (lis[i] > 1 && lds[i] > 1) {
      // calculate removals needed:
      // total length - l(ength of increasing part + length of decreasing part - 1)
      // * -1 because peak is counted twice
      removes = Math.min(removes, n + 1 - lis[i] - lds[i]);
    }
  }

  return removes;
}
