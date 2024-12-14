// https://leetcode.com/problems/continuous-subarrays/

// You are given a 0-indexed integer array nums. A subarray of nums is called continuous if:
// Let i, i + 1, ..., j be the indices in the subarray. Then, for each pair of indices i <= i1, i2 <= j, 0 <= |nums[i1] - nums[i2]| <= 2.
// Return the total number of continuous subarrays.
// A subarray is a contiguous non-empty sequence of elements within an array.

// Example 1:
// Input: nums = [5,4,2,4]
// Output: 8
// Explanation:
// Continuous subarray of size 1: [5], [4], [2], [4].
// Continuous subarray of size 2: [5,4], [4,2], [2,4].
// Continuous subarray of size 3: [4,2,4].
// Thereare no subarrys of size 4.
// Total continuous subarrays = 4 + 3 + 1 = 8.
// It can be shown that there are no more continuous subarrays.

// Example 2:
// Input: nums = [1,2,3]
// Output: 6
// Explanation:
// Continuous subarray of size 1: [1], [2], [3].
// Continuous subarray of size 2: [1,2], [2,3].
// Continuous subarray of size 3: [1,2,3].
// Total continuous subarrays = 3 + 2 + 1 = 6.

// https://leetcode.com/problems/continuous-subarrays/solutions/4194456/javascript-sliding-window-really-simple/
// sliding window
function continuousSubarrays(nums: number[]): number {
  let sum = 0;
  let start = 0;
  const map = new Map<number, number>();

  for (let end = 0; end < nums.length; end++) {
    map.set(nums[end], (map.get(nums[end]) || 0) + 1); // optimistically grow array

    // window is invalid, shrink the array from left to make valid
    while (Math.max(...map.keys()) - Math.min(...map.keys()) > 2) {
      const count = map.get(nums[start])! - 1;
      if (count === 0) {
        map.delete(nums[start]);
      } else {
        map.set(nums[start], count);
      }
      start++;
    }

    sum += end - start + 1;
  }

  return sum;
}

// https://leetcode.com/problems/continuous-subarrays/solutions/6144690/result-2762-continuous-subarrays/
// a little faster than previous
function continuousSubarrays2(nums: number[]): number {
  let start = 0,
    count = 0;
  const minDeque: number[] = [];
  const maxDeque: number[] = [];

  for (let end = 0; end < nums.length; end++) {
    // Maintain minDeque: Remove indices of elements larger than nums[end]
    while (
      minDeque.length > 0 &&
      nums[minDeque[minDeque.length - 1]] > nums[end]
    ) {
      minDeque.pop();
    }
    minDeque.push(end);

    // Maintain maxDeque: Remove indices of elements smaller than nums[end]
    while (
      maxDeque.length > 0 &&
      nums[maxDeque[maxDeque.length - 1]] < nums[end]
    ) {
      maxDeque.pop();
    }
    maxDeque.push(end);

    // If the window is invalid, shrink it from the left
    while (nums[maxDeque[0]] - nums[minDeque[0]] > 2) {
      if (minDeque[0] === start) minDeque.shift();
      if (maxDeque[0] === start) maxDeque.shift();
      start++;
    }

    // Count all valid subarrays ending at `end`
    count += end - start + 1;
  }

  return count;
}
