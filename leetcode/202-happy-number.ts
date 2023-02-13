// https://leetcode.com/problems/happy-number/description/

// A happy number is a number defined by the following process:

// Starting with any positive integer, replace the number by the sum of the squares of its digits.
// Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
// Those numbers for which this process ends in 1 are happy.
// Return true if n is a happy number, and false if not.

function isHappy(n: number): boolean {
  if (n === 1) return true;

  const getSumSq = (n: number): number => {
    return n
      .toString()
      .split('')
      .reduce((acc: number, cur: string) => acc + Math.pow(Number(cur), 2), 0);
  };

  const sums: number[] = [];
  while (n !== 1) {
    n = getSumSq(n);
    if (n === 1) {
      return true;
    }
    if (sums.indexOf(n) >= 0) {
      return false;
    } else {
      sums.push(n);
    }
  }
  return true;
}

// from discussion, use hash set
function isHappy2(n: number): boolean {
  const seen: Record<number, boolean> = {};
  while (n !== 1 && !seen[n]) {
    seen[n] = true;
    n = sumOfSquares(n);
  }
  return n === 1;
}

function sumOfSquares(n: number) {
  return n
    .toString()
    .split('')
    .reduce(function (sum: number, num: string) {
      return sum + Math.pow(Number(num), 2);
    }, 0);
}
