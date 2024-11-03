// https://leetcode.com/problems/rotate-string
// Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.
// A shift on s consists of moving the leftmost character of s to the rightmost position.
// For example, if s = "abcde", then it will be "bcdea" after one shift.

// Example 1:
// Input: s = "abcde", goal = "cdeab"
// Output: true
// Example 2:
// Input: s = "abcde", goal = "abced"
// Output: false

// s + s contains all possible rotations of the original string
function rotateString(s: string, goal: string): boolean {
  if (s.length !== goal.length) return false;
  return (s + s).includes(goal);
}
