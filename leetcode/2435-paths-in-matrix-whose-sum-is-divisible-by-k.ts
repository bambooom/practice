// https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k/
// You are given a 0-indexed m x n integer matrix grid and an integer k. You are currently at position (0, 0) and you want to reach position (m - 1, n - 1) moving only down or right.
// Return the number of paths where the sum of the elements on the path is divisible by k. Since the answer may be very large, return it modulo 109 + 7.

// Example 1:
// Input: grid = [[5,2,4],[3,0,5],[0,7,2]], k = 3
// Output: 2
// Explanation: There are two paths where the sum of the elements on the path is divisible by k.
// The first path highlighted in red has a sum of 5 + 2 + 4 + 5 + 2 = 18 which is divisible by 3.
// The second path highlighted in blue has a sum of 5 + 3 + 0 + 5 + 2 = 15 which is divisible by 3.

// Example 2:
// Input: grid = [[0,0]], k = 5
// Output: 1
// Explanation: The path highlighted in red has a sum of 0 + 0 = 0 which is divisible by 5.

// Example 3:
// Input: grid = [[7,3,4,9],[2,3,6,2],[2,3,7,0]], k = 1
// Output: 10
// Explanation: Every integer is divisible by 1 so the sum of the elements on every possible path is divisible by k.

// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 5 * 10^4
// 1 <= m * n <= 5 * 10^4
// 0 <= grid[i][j] <= 100
// 1 <= k <= 50

// Editorial
function numberOfPaths(grid: number[][], k: number): number {
  const MOD = 1e9 + 7;

  const m = grid.length;
  const n = grid[0].length;

  const dp: number[][][] = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      dp[i][j] = new Array(k).fill(0);

      // If the position is the top-left corner, set the value to 1
      if (i === 1 && j === 1) {
        dp[i][j][grid[0][0] % k] = 1;
        continue;
      }

      // If the position is not the top-left corner, calculate the number of paths
      if (i >= 1 && j >= 1) {
        // value of the current position
        const value = grid[i - 1][j - 1] % k;

        // Iterate over each possible remainder
        for (let r = 0; r < k; r++) {
          // previous remainder
          const prevMod = (r - value + k) % k;

          // Calculate the number of paths by summing the paths from the top and left positions
          dp[i][j][r] = dp[i - 1][j][prevMod] + dp[i][j - 1][prevMod];
          dp[i][j][r] %= MOD; // take modulo
        }
      }
    }
  }

  // Return the number of paths that end at the bottom-right corner
  return dp[m][n][0];
}
