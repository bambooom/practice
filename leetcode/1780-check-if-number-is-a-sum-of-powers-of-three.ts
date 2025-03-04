// https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three/description/
// Given an integer n, return true if it is possible to represent n as the sum of distinct powers of three. Otherwise, return false.
// An integer y is a power of three if there exists an integer x such that y == 3^x.

// Example 1:
// Input: n = 12
// Output: true
// Explanation: 12 = 31 + 32
// Example 2:
// Input: n = 91
// Output: true
// Explanation: 91 = 30 + 32 + 34
// Example 3:
// Input: n = 21
// Output: false

// The key idea behind this problem is that a non-negative integer can be expressed as a sum of distinct powers of 3 if and only if its ternary representation contains only the digits 0 and 1 (i.e., it does not contain 2).
// math proof: https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three/solutions/6492533/math-proof-explanation-0ms-100-o-log3-n-53-7-55-9mb-9-09-36-36-o-1/
function checkPowersOfThree(n: number): boolean {
  while (n > 0) {
    const r = n % 3;
    if (r === 2) {
      return false;
    }
    n = (n - r) / 3;
  }

  return true;
}
