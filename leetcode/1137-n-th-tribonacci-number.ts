// https://leetcode.com/problems/n-th-tribonacci-number/
// The Tribonacci sequence Tn is defined as follows:
// T0 = 0, T1 = 1, T2 = 1, and Tn + 3 = Tn + Tn + 1 + Tn + 2 for n >= 0.
// Given n, return the value of Tn.

function tribonacci(n: number): number {
  // t0 = 0;
  // t1 = 1;
  // t2 = 1;
  const dp = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }
  return dp[n];
}
