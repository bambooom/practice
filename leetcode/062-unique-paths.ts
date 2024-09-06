// https://leetcode.com/problems/unique-paths/
// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.
// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.
// The test cases are generated so that the answer will be less than or equal to 2 * 10^9
// #dynamic-programming #combination

// DP space optimized
function uniquePaths(m: number, n: number): number {
  const dp = new Array(n + 1).fill(1);
  for (let row = m - 1; row > 0; row--) {
    for (let col = n - 1; col > 0; col--) {
      dp[col] += dp[col + 1];
    }
  }
  return dp[1];
}

//DP Bottom up tabular
const uniquePaths2 = (m: number, n: number): number => {
  const dp = new Array(m + 1).fill(0);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(n + 1).fill(1);
  }

  dp[m][n] = 1;
  for (let row = m - 1; row > 0; row--) {
    for (let col = n - 1; col > 0; col--) {
      dp[row][col] = dp[row + 1][col] + dp[row][col + 1];
    }
  }

  return dp[1][1];
};

// Brute force recursive
const uniquePaths3 = (m: number, n: number): number => {
  const helper = (m: number, n: number, row: number, col: number): number => {
    if (row === m && col === n) return 1;
    if (row > m || col > n) return 0;

    const pathsRight = helper(m, n, row, col + 1);
    const pathsDown = helper(m, n, row + 1, col);

    return pathsRight + pathsDown;
  };

  return helper(m, n, 1, 1);
};
