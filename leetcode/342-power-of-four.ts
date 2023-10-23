// https://leetcode.com/problems/power-of-four/
// Given an integer n, return true if it is a power of four. Otherwise, return false.
// An integer n is a power of four, if there exists an integer x such that n == 4^x.

// loop
function isPowerOfFour(n: number): boolean {
  while (n > 1) {
    n = n / 4;
    if (!Number.isInteger(n)) {
      return false;
    }
  }

  return n === 1;
}

// use math
function isPowerOfFour2(n: number): boolean {
  return Number.isInteger(Math.log(n) / Math.log(4));
}
