// https://leetcode.com/problems/maximum-number-of-moves-in-a-grid/
// You are given a 0-indexed m x n matrix grid consisting of positive integers.
// You can start at any cell in the first column of the matrix, and traverse the grid in the following way:
// From a cell (row, col), you can move to any of the cells: (row - 1, col + 1), (row, col + 1) and (row + 1, col + 1) such that the value of the cell you move to, should be strictly bigger than the value of the current cell.
// Return the maximum number of moves that you can perform.

// Example1:
// Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
// Output: 3
// Explanation: We can start at the cell (0, 0) and make the following moves:
// - (0, 0) -> (0, 1).
// - (0, 1) -> (1, 2).
// - (1, 2) -> (2, 3).
// It can be shown that it is the maximum number of moves that can be made.

// Example2:
// Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
// Output: 0
// Explanation: Starting from any cell in the first column we cannot perform any moves.

// https://leetcode.com/problems/maximum-number-of-moves-in-a-grid/solutions/5980453/list-most-common-interview-matrix-beats-100-explained-step-by-step/
function maxMoves(grid: number[][]): number {
  const m = grid.length; // rows
  const n = grid[0].length; // cols

  let res = 0; // rightmost column we can reach
  const dp: number[] = new Array(m).fill(0); // stores maximum number of moves possible to reach each cell in the current column

  for (let j = 1; j < n; j++) {
    let leftTop = 0; // keeps track of the dp value from the cell above-left
    let found = false; // indicated if we can reach any cell in the current column

    for (let i = 0; i < m; i++) {
      let cur = -1; // store the maximum moves to reach the current cell
      const nextLeftTop = dp[i]; // store dp[i] for next iteration's leftTop

      // check move from top-left cell
      if (i - 1 >= 0 && leftTop !== -1 && grid[i][j] > grid[i - 1][j - 1]) {
        cur = Math.max(cur, leftTop + 1);
      }
      // check move from direct left cell
      if (dp[i] !== -1 && grid[i][j] > grid[i][j - 1]) {
        cur = Math.max(cur, dp[i] + 1);
      }
      // check move from bottom-left cell
      if (i + 1 < m && dp[i + 1] !== -1 && grid[i][j] > grid[i + 1][j - 1]) {
        cur = Math.max(cur, dp[i + 1] + 1);
      }

      // update dp array for current cell
      dp[i] = cur;
      // update found flag
      found = found || dp[i] !== -1;
      // update leftTop for next row
      leftTop = nextLeftTop;
    }

    // if we can't reach any cell in current column, break
    if (!found) break;
    // update result to current column if we can reach it
    res = j;
  }

  return res;
}
