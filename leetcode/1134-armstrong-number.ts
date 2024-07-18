// https://leetcode.com/problems/armstrong-number/
// Given an integer n, return true if and only if it is an Armstrong number.
// The k-digit number n is an Armstrong number if and only if the kth power of each digit sums to n.

// Example 1:
// Input: n = 153
// Output: true
// Explanation: 153 is a 3-digit number, and 153 = 13 + 53 + 33.
// Example 2:
// Input: n = 123
// Output: false
// Explanation: 123 is a 3-digit number, and 123 != 13 + 23 + 33 = 36.

function isArmstrong(n: number): boolean {
  const k = n.toString().length;
  const digits = n.toString().split('');

  return digits.reduce((a, c) => a + Math.pow(parseInt(c), k), 0) === n;
}
