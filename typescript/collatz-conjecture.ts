/**
 * The Collatz Conjecture or 3x+1 problem can be summarized as follows:
 *
 * Take any positive integer n.
 * If n is even, divide n by 2 to get n / 2.
 * If n is odd, multiply n by 3 and add 1 to get 3n + 1.
 * Repeat the process indefinitely.
 * The conjecture states that no matter which number you start with, you will always reach 1 eventually.
 *
 * Given a number n, return the number of steps required to reach 1.
 */

export function steps(count: number): number {
  if (count === 1) return 0;
  if (count <= 0) throw new Error('Only positive numbers are allowed');

  const process = (n: number): number => {
    if (n % 2 === 0) return n / 2;
    return n * 3 + 1;
  };
  let step = 0;
  while (count !== 1) {
    count = process(count);
    step++;
  }

  return step;
}

console.log(steps(1)); // 0
console.log(steps(16)); // 4
