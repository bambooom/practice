// https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/
// Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).

// Example 1:

// Input: low = 3, high = 7
// Output: 3
// Explanation: The odd numbers between 3 and 7 are [3,5,7].
// Example 2:

// Input: low = 8, high = 10
// Output: 1
// Explanation: The odd numbers between 8 and 10 are [9].

function countOdds(low: number, high: number): number {
  if (low % 2 === 0) {
    return Math.floor((high - low + 1) / 2);
  } else {
    return Math.floor((high - low) / 2) + 1;
  }
}

function countOdds2(low: number, high: number): number {
  if (low & 1) {
    return Math.floor((high - low + 2) / 2);
  }
  return Math.floor((high - low + 1) / 2);
}
