// https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers
// Return the number of ways n can be expressed as the sum of the xth power of unique positive integers, in other words, the number of sets of unique integers [n1, n2, ..., nk] where n = n1^x + n2^x + ... + nk^x.
// Since the result can be very large, return it modulo 10^9 + 7.
// For example, if n = 160 and x = 3, one way to express n is n = 2^3 + 3^3 + 5^3.

// Example 1:
// Input: n = 10, x = 2
// Output: 1
// Explanation: We can express n as the following: n = 3^2 + 1^2 = 10.
// It can be shown that it is the only way to express 10 as the sum of the 2nd power of unique integers.

// Example 2:
// Input: n = 4, x = 1
// Output: 2
// Explanation: We can express n in the following ways:
// - n = 4^1 = 4.
// - n = 3^1 + 1^1 = 4.

// dynamic programming
function numberOfWays(n: number, x: number): number {
  const mod = 10 ** 9 + 7;
  // Create an array to store the number of ways to express each integer from 0 to `n`
  const numWays: number[] = new Array(n + 1).fill(0);
  numWays[0] = 1; // Base case: there is 1 way to express 0 (i.e., not using any numbers)

  // Iterate over each possible maximum power `max` from 1 to `n`
  for (let max = 1; max <= n; max++) {
    const power = max ** x;

    if (power > n) {
      break;
    }

    // Iterate over each target integer from `n` down to the current power
    for (let target = n; target >= power; target--) {
      // For each target, add the number of ways to express the target minus the current power
      // This is because we can either include or exclude the current power in the sum
      numWays[target] += numWays[target - power]; // "If I can express target - power in some way, then I can also express target by adding the xth power of max to that expression."
      // Apply the modulus to prevent overflow
      numWays[target] %= mod;
    }
  }

  // Return the number of ways to express `n`
  return numWays[n];
}

// Editorial
function numberOfWays2(n: number, x: number): number {
  const MOD = 1e9 + 7;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(n + 1).fill(0),
  );
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    const val = Math.pow(i, x);
    for (let j = 0; j <= n; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j >= val) {
        dp[i][j] = (dp[i][j] + dp[i - 1][j - val]) % MOD;
      }
    }
  }
  return dp[n][n];
}
