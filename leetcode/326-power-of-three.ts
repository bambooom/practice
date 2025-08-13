// https://leetcode.com/problems/power-of-three/
// Given an integer n, return true if it is a power of three. Otherwise, return false.
// An integer n is a power of three, if there exists an integer x such that n == 3^x.

// Example 1:
// Input: n = 27
// Output: true
// Explanation: 27 = 33

// Example 2:
// Input: n = 0
// Output: false
// Explanation: There is no x where 3^x = 0.

// Example 3:
// Input: n = -1
// Output: false
// Explanation: There is no x where 3^x = (-1).

function isPowerOfThree(n: number): boolean {
  if (n <= 0) return false;
  while (n % 3 === 0) {
    n = n / 3;
  }

  return n === 1;
}

// recursive
function isPowerOfThree2(n: number): boolean {
  if (n === 0) return false;
  if (n === 1) return true;
  if (n % 3 === 0) return isPowerOfThree(n / 3);
  return false;
}

// math
// https://leetcode.com/problems/power-of-three/solutions/5539461/one-line-math-solution-with-explanation-beats-90-by-runtime-ts-js/?envType=daily-question&envId=2025-08-13
function isPowerOfThree3(n: number): boolean {
  return (Math.log10(n) / Math.log10(3)) % 1 === 0;
}
