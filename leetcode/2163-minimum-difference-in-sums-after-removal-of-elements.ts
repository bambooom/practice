// https://leetcode.com/problems/minimum-difference-in-sums-after-removal-of-elements
// You are given a 0-indexed integer array nums consisting of 3 * n elements.

// You are allowed to remove any subsequence of elements of size exactly n from nums. The remaining 2 * n elements will be divided into two equal parts:

// The first n elements belonging to the first part and their sum is sumfirst.
// The next n elements belonging to the second part and their sum is sumsecond.
// The difference in sums of the two parts is denoted as sumfirst - sumsecond.

// For example, if sumfirst = 3 and sumsecond = 2, their difference is 1.
// Similarly, if sumfirst = 2 and sumsecond = 3, their difference is -1.
// Return the minimum difference possible between the sums of the two parts after the removal of n elements.

// Example 1:
// Input: nums = [3,1,2]
// Output: -1
// Explanation: Here, nums has 3 elements, so n = 1.
// Thus we have to remove 1 element from nums and divide the array into two equal parts.
// - If we remove nums[0] = 3, the array will be [1,2]. The difference in sums of the two parts will be 1 - 2 = -1.
// - If we remove nums[1] = 1, the array will be [3,2]. The difference in sums of the two parts will be 3 - 2 = 1.
// - If we remove nums[2] = 2, the array will be [3,1]. The difference in sums of the two parts will be 3 - 1 = 2.
// The minimum difference between sums of the two parts is min(-1,1,2) = -1.

// Example 2:
// Input: nums = [7,9,5,8,1,3]
// Output: 1
// Explanation: Here n = 2. So we must remove 2 elements and divide the remaining array into two parts containing two elements each.
// If we remove nums[2] = 5 and nums[3] = 8, the resultant array will be [7,9,1,3]. The difference in sums will be (7+9) - (1+3) = 12.
// To obtain the minimum difference, we should remove nums[1] = 9 and nums[4] = 1. The resultant array becomes [7,5,8,3]. The difference in sums of the two parts is (7+5) - (8+3) = 1.
// It can be shown that it is not possible to obtain a difference smaller than 1.

import {
  MaxPriorityQueue,
  MinPriorityQueue,
} from '@datastructures-js/priority-queue';

function minimumDifference(nums: number[]): number {
  const n3 = nums.length;
  const n = Math.floor(n3 / 3);
  // an array of length n + 1 initialized with zeros, which will store the sums of the first part.
  const part1: number[] = new Array(n + 1).fill(0);
  let sum = 0;

  // max heap (simulate with opposite numbers)
  const ql = new MaxPriorityQueue<number>();
  for (let i = 0; i < n; i++) {
    sum += nums[i]; // sum of first part n
    ql.enqueue(nums[i]);
  }

  part1[0] = sum;
  // next n elements
  for (let i = n; i < n * 2; i++) {
    sum += nums[i];
    ql.enqueue(nums[i]);
    sum -= ql.dequeue(); // maximum element is removed from ql
    part1[i - (n - 1)] = sum; // update first part sum
  }

  let part2 = 0;
  // min heap
  const qr = new MinPriorityQueue<number>();
  // last n elements
  for (let i = n * 3 - 1; i >= n * 2; i--) {
    part2 += nums[i]; // last n elements' sum
    qr.enqueue(nums[i]);
  }

  let ans = part1[n] - part2; // initial diff
  // in reverse order
  for (let i = n * 2 - 1; i >= n; i--) {
    part2 += nums[i];
    qr.enqueue(nums[i]);
    part2 -= qr.dequeue(); // remove minimum element
    ans = Math.min(ans, part1[i - n] - part2); // update difference
  }
  return ans;
}
