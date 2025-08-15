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

// bit mask, checking if n = 4^x = 2^2x, so n must be a power of 2.
// use bit mastk 0x55555555 to check if n is power of 4
function isPowerOfFour3(n: number): boolean {
  return (n & 0x55555555) !== 0 && (n & (n - 1)) === 0;
}

// bit mask
// Use the invert of the bit mask to check if n is a power of 4.
// ~0x55555555 is 0xaaaaaaaa
function isPowerOfFour4(n: number): boolean {
  return n > 0 && (n & 0xaaaaaaaa) === 0 && (n & (n - 1)) === 0;
}
