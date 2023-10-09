// https://leetcode.com/problems/maximum-subsequence-score/

// You are given two 0-indexed integer arrays nums1 and nums2 of equal length n and a positive integer k. You must choose a subsequence of indices from nums1 of length k.

// For chosen indices i0, i1, ..., ik - 1, your score is defined as:

// The sum of the selected elements from nums1 multiplied with the minimum of the selected elements from nums2.
// It can defined simply as: (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) * min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]).
// Return the maximum possible score.

// A subsequence of indices of an array is a set that can be derived from the set {0, 1, ..., n-1} by deleting some or no elements.

// Example 1:
// Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
// Output: 12
// Explanation:
// The four possible subsequence scores are:
// - We choose the indices 0, 1, and 2 with score = (1+3+3) * min(2,1,3) = 7.
// - We choose the indices 0, 1, and 3 with score = (1+3+2) * min(2,1,4) = 6.
// - We choose the indices 0, 2, and 3 with score = (1+3+2) * min(2,3,4) = 12.
// - We choose the indices 1, 2, and 3 with score = (3+3+2) * min(1,3,4) = 8.
// Therefore, we return the max score, which is 12.

// Example 2:
// Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
// Output: 30
// Explanation:
// Choosing index 2 is optimal: nums1[2] * nums2[2] = 3 * 10 = 30 is the maximum possible score.

// using MinPriorityQueue, built-in Leetcode website
function maxScore(nums1: number[], nums2: number[], k: number): number {
  const minHeap = new MinPriorityQueue();
  const zipped = nums1.map((num1, i) => [num1, nums2[i]]);
  zipped.sort((a, b) => b[1] - a[1]);

  let result = 0,
    sum = 0;

  for (const [num, min] of zipped) {
    minHeap.enqueue(num);
    sum += num;

    if (minHeap.size() == k) {
      result = Math.max(result, sum * min);
      sum -= minHeap.dequeue().element;
    }
  }

  return result;
}

// https://leetcode.com/problems/maximum-subsequence-score/solutions/3559987/js-solution-with-and-without-but-that-s-too-slow-minpriorityqueue/?envType=study-plan-v2&envId=leetcode-75
function maxScore2(nums1: number[], nums2: number[], k: number): number {
  const n = nums1.length;
  const pairs = new Array(n);
  for (let i = 0; i < n; i++) {
    pairs[i] = [nums1[i], nums2[i]];
  }
  pairs.sort((a, b) => b[1] - a[1]);

  const heap: number[] = [];
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += pairs[i][0];
    binaryInsert(heap, pairs[i][0]);
  }

  let result = sum * pairs[k - 1][1];
  for (let i = k; i < n; i++) {
    sum += pairs[i][0] - heap.shift()!;
    binaryInsert(heap, pairs[i][0]);
    result = Math.max(result, sum * pairs[i][1]);
  }

  return result;
}
function binaryInsert(arr: number[], item: number) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = (left + right) >> 1;
    if (arr[mid] > item) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  arr.splice(left, 0, item);
}
