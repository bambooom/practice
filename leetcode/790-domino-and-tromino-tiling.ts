// https://leetcode.com/problems/domino-and-tromino-tiling

// Given an integer n, return the number of ways to tile an 2 x n board. Since the answer may be very large, return it modulo 10^9 + 7.
// In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on the board such that exactly one of the tilings has both squares occupied by a tile.

// #dynamic-programming

// https://leetcode.com/problems/domino-and-tromino-tiling/?envType=study-plan-v2&envId=leetcode-75
const MODULO_DIVISOR = 10 ** 9 + 7;
function numTilings(n: number): number {
  let current = 0;
  // Head or tail uses fixed block 1
  let prevOne = 0;
  // Head or tail uses fixed block 2
  let prevTwo = 0;
  // Head or tail uses fixed block more than and equal 3, 4
  let prevGteThree = 0;
  for (let i = 1; i <= n; i++) {
    prevGteThree += prevTwo;
    prevTwo = prevOne;
    prevOne = current;
    // prevGteThree * 2,
    // because fixed block more than equal 3, 4 have 2 situations
    current = (i >= 3 ? 2 : 1) + prevOne + prevTwo + prevGteThree * 2;
    current %= MODULO_DIVISOR;
  }
  return current;
}

// https://leetcode.com/problems/domino-and-tromino-tiling/solutions/3872381/typescript-dp/?envType=study-plan-v2&envId=leetcode-75
// Intuition:
// first, use test to get the below result
// n | result
// 0 = 1
// 1 = 1
// 2 = 2
// 3 = 5
// 4 = 11
// 5 = 24
// 6 = 53
// 7 = 117
// 8 = 258
// So: dp[i] = 2*dp[i-1] + dp[i-3]
function numTilings2(n: number): number {
  const mod = 10 ** 9 + 7;
  const dp: number[] = [1, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = (2 * dp[i - 1] + dp[i - 3]) % mod;
  }
  return dp[n];
}
