// https://leetcode.com/problems/perform-string-shifts/
// You are given a string s containing lowercase English letters, and a matrix shift, where shift[i] = [directioni, amounti]
// direction-i can be 0 (for left shift) or 1 (for right shift).
// amount-i is the amount by which string s is to be shifted.
// A left shift by 1 means remove the first character of s and append it to the end.
// Similarly, a right shift by 1 means remove the last character of s and add it to the beginning.
// Return the final string after all operations.

// Input: s = "abc", shift = [[0,1],[1,2]]
// Output: "cab"
// Explanation:
// [0,1] means shift to left by 1. "abc" -> "bca"
// [1,2] means shift to right by 2. "bca" -> "cab"

// trivial solution
function stringShift(s: string, shift: number[][]): string {
  let accumshift = 0;
  for (const [d, a] of shift) {
    if (d === 1) {
      accumshift += a;
    } else {
      accumshift -= a;
    }
  }
  accumshift %= s.length;
  accumshift = accumshift * -1;
  return s.slice(accumshift) + s.slice(0, accumshift);
}
