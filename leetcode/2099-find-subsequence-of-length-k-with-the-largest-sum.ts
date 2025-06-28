// https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum
// You are given an integer array nums and an integer k. You want to find a subsequence of nums of length k that has the largest sum.
// Return any such subsequence as an integer array of length k.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

// Example 1:
// Input: nums = [2,1,3,3], k = 2
// Output: [3,3]
// Explanation:
// The subsequence has the largest sum of 3 + 3 = 6.

// Example 2:
// Input: nums = [-1,-2,3,4], k = 3
// Output: [-1,3,4]
// Explanation:
// The subsequence has the largest sum of -1 + 3 + 4 = 6.

// Example 3:
// Input: nums = [3,4,3,3], k = 2
// Output: [3,4]
// Explanation:
// The subsequence has the largest sum of 3 + 4 = 7.
// Another possible subsequence is [4, 3].

function maxSubsequence(nums: number[], k: number): number[] {
  const sorted = nums.slice().sort((a, b) => b - a);
  const max = sorted.slice(0, k);
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (max.includes(nums[i])) {
      res.push(nums[i]);
      if (res.length === k) break;
    }
  }
  return res;
}

// https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/solutions/6893810/one-line/?envType=daily-question&envId=2025-06-28
const maxSubsequence2 = (nums: number[], k: number) =>
  nums
    .map((n, i) => [n, i]) // map [value, index]
    .sort((a, b) => a[0] - b[0]) // sort by values
    .slice(-k) // last k elements
    .sort((a, b) => a[1] - b[1]) // sort by index
    .map((v) => v[0]); // only values

function maxSubsequence3(nums: number[], k: number): number[] {
  const withIndex = nums.map((val, idx) => ({ val, idx }));
  withIndex.sort((a, b) => b.val - a.val);
  const topK = withIndex.slice(0, k);
  topK.sort((a, b) => a.idx - b.idx);
  return topK.map((item) => item.val);
}
