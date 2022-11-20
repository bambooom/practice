/**
 * Q: You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 *
 *
 * Step(n) = Step(n - 1) + Step(n - 2), it's actually fibonacci
 */

function fn1(n: number): number {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return fn1(n - 2) + fn1(n - 1);
}

function climbStairs(n: number): number {
  if (n == 1) return 1;
  if (n == 2) return 2;
  let one = 1,
    two = 2;
  for (let i = 3; i <= n; i++) {
    const temp = one;
    one = two;
    two += temp;
  }
  return two;
}
