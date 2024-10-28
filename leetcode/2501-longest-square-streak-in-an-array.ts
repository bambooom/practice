// https://leetcode.com/problems/longest-square-streak-in-an-array/description
// You are given an integer array nums. A subsequence of nums is called a square streak if:

// The length of the subsequence is at least 2, and
// after sorting the subsequence, each element (except the first element) is the square of the previous number.
// Return the length of the longest square streak in nums, or return -1 if there is no square streak.

// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

// Example 1:
// Input: nums = [4,3,6,16,8,2]
// Output: 3
// Explanation: Choose the subsequence [4,16,2]. After sorting it, it becomes [2,4,16].
// - 4 = 2 * 2.
// - 16 = 4 * 4.
// Therefore, [4,16,2] is a square streak.
// It can be shown that every subsequence of length 4 is not a square streak.

// Example 2:
// Input: nums = [2,3,5,6,7]
// Output: -1
// Explanation: There is no square streak in nums so return -1.

// https://leetcode.com/problems/longest-square-streak-in-an-array/solutions/5976355/explained-step-by-step-beats-100-working-28-10-2024/
function longestSquareStreak(nums: number[]): number {
  // remove duplicate and sorted
  const numSet = new Set(nums);
  const sortedNums = Array.from(numSet).sort((a, b) => a - b);

  let maxLength = 0;

  for (const num of sortedNums) {
    // initialize streak length for current number
    let length = 0;

    let current = num;

    // keep squaring the number while it exists in our set
    while (numSet.has(current)) {
      length++;
      current = current ** 2;

      // add safety check for numbers getting too large
      if (current > 100000) {
        break;
      }
    }

    // only update maxLength if we found a streak of length > 1
    if (length > 1) {
      maxLength = Math.max(maxLength, length);
    }
  }

  return maxLength > 1 ? maxLength : -1;
}
