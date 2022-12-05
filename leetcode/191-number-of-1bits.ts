// https://leetcode.com/problems/number-of-1-bits/
// bit manipulation, divide and conquer
// Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

function hammingWeight(n: number): number {
  let sum = 0;

  while (n != 0) {
    sum += n & 1; // means if n is 1 then it increments
    n = n >>> 1; // means he checks if n is 1 by using unsigned right operator which i think converts it into 32 bit integer
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift
  }

  return sum;
}
