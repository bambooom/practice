// https://leetcode.com/problems/domino-and-tromino-tiling
// You have two types of tiles: a 2 x 1 domino shape and a tromino shape. You may rotate these shapes.
// Domino Tile:
// +---+---+
// | O | O |
// +---+---+

// Tromino Tile:
// +---+---+
// | O | O |
// +---+---+
// | O |
// +---+

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

//https://leetcode.com/problems/domino-and-tromino-tiling/solutions/4379585/typescript-dp-solution-with-explanation-in-comments-runtime-90/?envType=daily-question&envId=2025-05-05
// dynamic programming, just another exanplantion of why
function numTilings3(n: number): number {
  // Base cases:
  // 1: 2x1 => 1(verical d) = 1 way
  // 2: 2x2 => 1(vertical dd) + 1(horizontal dd) = 2 ways
  // 3: 2x3 => 1(tr+tr) + 1 (vertical ddd) + 3 (vertical d + horizontal dd) = 5 ways

  /* Recursive formula explanation:
  Each i in f(n-i) refers to i empty columns starting from the right, that can be filled with missing domino.
  In cases of f(n-1) till f(n-2) we only have 1 possible combination to fill the gap, hence multiplier is 1
  i=1 -> one vertical domino (once)
  i=2 -> two horizontal domino (once)
  In cases of f(n-3) till the last one, we use 2 distinct combinations with trominos (it could be placed in two positions)
  i=3 -> two tromino (two possibilities)
  i=4 -> two tromino + domino (two possibilities)
  i=5 -> two tromino + two domino (two possibilities)
  So we conclude the number of unique combinations on 2xn field, fully filled:
  1. f(n) = f(n-1) + f(n-2) + 2*f(n-3) + 2*f(n-4) + ... + 2*f(0);
  Lets get f(n-1) = f(n-2) + f(n-3) + 2*f(n-4) + ... + 2*f(0)
  2. => f(n) - f(n-1) = f(n-1) + f(n-3);
  3. => f(n) = 2*f(n-1) + f(n-3)
  */
  const MOD = 10 ** 9 + 7;
  const memo = new Array(n);
  memo[1] = 1;
  memo[2] = 2;
  memo[3] = 5;
  for (let i = 4; i <= n; i++) {
    memo[i] = (2 * memo[i - 1] + memo[i - 3]) % MOD;
  }
  return memo[n];
}
