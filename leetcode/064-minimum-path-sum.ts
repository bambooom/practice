// https://leetcode.com/problems/minimum-path-sum
// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.
// Note: You can only move either down or right at any point in time.

// Example1:
// Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
// Output: 7
// Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
// Example2:
// Input: grid = [[1,2,3],[4,5,6]]
// Output: 12

// https://leetcode.com/problems/minimum-path-sum/solutions/3850380/beats-100-run-time-typescript-javascript-top-down-dp-w-memoization/?envType=study-plan-v2&envId=top-100-liked
function minPathSum(grid: number[][]): number {
  const M = grid.length;
  const N = grid[0].length;

  // keep track of each cell cost
  const dpArr = new Array(M).fill(0).map(() => new Array(N));
  // x,y coordinate
  const dp = (x: number, y: number): number => {
    // if we reach the bottom right, the sum is just the cell grid[x][y]
    if (x === M - 1 && y === N - 1) {
      dpArr[x][y] = grid[x][y];
      return grid[x][y];
    }
    // if already have the value, just return it, reduce repeated calculation
    if (dpArr[x][y] !== undefined) {
      return dpArr[x][y];
    }

    // on right border
    if (x === M - 1) {
      dpArr[x][y] = grid[x][y] + dp(x, y + 1);
      return dpArr[x][y];
    }

    // on bottom border
    if (y === N - 1) {
      dpArr[x][y] = grid[x][y] + dp(x + 1, y);
      return dpArr[x][y];
    }

    // normal case, plus the smaller value of the recursion to the right or down
    dpArr[x][y] = grid[x][y] + Math.min(dp(x + 1, y), dp(x, y + 1));
    return dpArr[x][y];
  };

  return dp(0, 0);
}
