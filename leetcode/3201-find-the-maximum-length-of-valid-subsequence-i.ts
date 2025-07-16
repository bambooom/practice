// https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i/
// You are given an integer array nums.
// A subsequence sub of nums with length x is called valid if it satisfies:
// (sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x - 1]) % 2.
// Return the length of the longest valid subsequence of nums.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

// Example 1:
// Input: nums = [1,2,3,4]
// Output: 4
// Explanation:
// The longest valid subsequence is [1, 2, 3, 4].

// Example 2:
// Input: nums = [1,2,1,1,2,1,2]
// Output: 6
// Explanation:
// The longest valid subsequence is [1, 2, 1, 2, 1, 2].

// Example 3:
// Input: nums = [1,3]
// Output: 2
// Explanation:
// The longest valid subsequence is [1, 3].

// four possible parity patterns for the subsequence:
// - All elements are even.
// - All elements are odd.
// - Elements at odd indices are odd, and elements at even indices are even.
// - Elements at odd indices are even, and elements at even indices are odd.
function maximumLength(nums: number[]): number {
  let res = 0;
  const patterns = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ] as const;
  for (const pattern of patterns) {
    let cnt = 0;
    for (const num of nums) {
      // For each element, the function checks if the element matches the current pattern
      // by checking if the remainder of the element divided by 2 (num % 2) is equal to
      // the corresponding element in the pattern array (pattern[cnt % 2]).
      // If it matches, the count cnt is incremented.
      if (num % 2 === pattern[cnt % 2]) {
        cnt++;
      }
    }
    res = Math.max(res, cnt);
  }
  return res;
}
