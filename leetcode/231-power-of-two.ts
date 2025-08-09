// https://leetcode.com/problems/power-of-two
// Given an integer n, return true if it is a power of two. Otherwise, return false.
// An integer n is a power of two, if there exists an integer x such that n == 2^x

function isPowerOfTwo(n: number): boolean {
  if (n <= 0) return false;

  while (n % 2 === 0) {
    n = n / 2;
  }

  return n === 1;
}

// bitwise AND operation
// In binary representation, powers of two have exactly one bit set to 1 (e.g., 8 is 1000, 16 is 10000).
// When you subtract 1 from a power of two, you get a number with all bits set to the right of the original bit (e.g., 7 is 0111, 15 is 01111).
// Therefore, when you perform a bitwise AND operation between a power of two and the number one less than it, the result is always zero.
// This is the condition checked by the function. If n is a power of two, the expression(n & (n - 1))
//  will be zero, and the function will return true. Otherwise, it will return false.
function isPowerOfTwo2(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}
