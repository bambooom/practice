// https://leetcode.com/problems/count-symmetric-integers
// You are given two positive integers low and high.
// An integer x consisting of 2 * n digits is symmetric if the sum of the first n digits of x is equal to the sum of the last n digits of x. Numbers with an odd number of digits are never symmetric.
// Return the number of symmetric integers in the range [low, high].

// Example 1:
// Input: low = 1, high = 100
// Output: 9
// Explanation: There are 9 symmetric integers between 1 and 100: 11, 22, 33, 44, 55, 66, 77, 88, and 99.

// Example 2:
// Input: low = 1200, high = 1230
// Output: 4
// Explanation: There are 4 symmetric integers between 1200 and 1230: 1203, 1212, 1221, and 1230.

// brute force, slow
function countSymmetricIntegers(low: number, high: number): number {
  let res = 0;

  const isSymmetric = (num: number) => {
    const numStr = num.toString();
    if (numStr.length % 2 !== 0) {
      return false;
    }
    const first = [...numStr.slice(0, numStr.length / 2)].reduce(
      (acc, cur) => acc + Number(cur),
      0,
    );
    const second = [...numStr.slice(numStr.length / 2)].reduce(
      (acc, cur) => acc + Number(cur),
      0,
    );
    return first === second;
  };

  for (let num = low; num <= high; num++) {
    if (isSymmetric(num)) {
      res++;
    }
  }

  return res;
}

// faster
function countSymmetricIntegers2(low: number, high: number): number {
  const counter = (num: number) => {
    const m = num.toString().length;
    if (m % 2) return false;
    const mid = m / 2;
    let sum = 0;
    for (let i = 0; i < m; i++) {
      const digit = num % 10;
      num = Math.floor(num / 10);
      if (i < mid) {
        sum += digit;
      } else {
        sum -= digit;
      }
    }
    return sum === 0;
  };

  let count = 0;
  for (let i = low; i <= high; i++) {
    if (counter(i)) count++;
  }
  return count;
}
