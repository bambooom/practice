// https://leetcode.com/problems/minimum-cost-path-with-teleportations/description
// You are given a m x n 2D integer array grid and an integer k. You start at the top-left cell (0, 0) and your goal is to reach the bottom‐right cell (m - 1, n - 1).
// There are two types of moves available:
// - Normal move: You can move right or down from your current cell (i, j), i.e. you can move to (i, j + 1) (right) or (i + 1, j) (down). The cost is the value of the destination cell.
// - Teleportation: You can teleport from any cell (i, j), to any cell (x, y) such that grid[x][y] <= grid[i][j]; the cost of this move is 0. You may teleport at most k times.
// Return the minimum total cost to reach cell (m - 1, n - 1) from (0, 0).

// Example 1:
// Input: grid = [[1,3,3],[2,5,4],[4,3,5]], k = 2
// Output: 7
// Explanation:
// Initially we are at (0, 0) and cost is 0.

// Current Position	Move	             New Position	 Total Cost
// (0, 0)	          Move Down	          (1, 0)	      0 + 2 = 2
// (1, 0)	          Move Right	        (1, 1)	      2 + 5 = 7
// (1, 1)	          Teleport to (2, 2)	(2, 2)	      7 + 0 = 7
// The minimum cost to reach bottom-right cell is 7.

// Example 2:
// Input: grid = [[1,2],[2,3],[3,4]], k = 1
// Output: 9
// Explanation:
// Initially we are at (0, 0) and cost is 0.

// Current Position	 Move	       New Position	    Total Cost
// (0, 0)	           Move Down	 (1, 0)	          0 + 2 = 2
// (1, 0)	           Move Right	 (1, 1)	          2 + 3 = 5
// (1, 1)	           Move Down	 (2, 1)	          5 + 4 = 9
// The minimum cost to reach bottom-right cell is 9.

// Constraints:
// 2 <= m, n <= 80
// m == grid.length
// n == grid[i].length
// 0 <= grid[i][j] <= 10^4
// 0 <= k <= 10

// https://leetcode.com/problems/minimum-cost-path-with-teleportations/solutions/7098758/typescript-solution-by-crfmn-7dp3/?envType=daily-question&envId=2026-01-28
function minCost(grid: number[][], k: number): number {
  const m = grid.length;
  const n = grid[0].length;
  const teleMap: [number, number, number][] = []; // store the teleportation points
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      teleMap.push([grid[i][j], i, j]); // [value, row, column]
    }
  }
  // Sort the teleMap array based on the cell values and then the row indices and finally the column indices
  teleMap.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

  const dp: number[][] = Array.from({ length: m }, () =>
    Array(n).fill(Number.MAX_SAFE_INTEGER),
  );
  dp[0][0] = 0; // start position. top left with 0 cost

  // Calculates the minimum cost to reach a cell by moving from the cell down or right.
  const normalMove = (
    dp: number[][],
    grid: number[][],
    m: number,
    n: number,
  ) => {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (i > 0) {
          dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + grid[i][j]); // move down
        }
        if (j > 0) {
          dp[i][j] = Math.min(dp[i][j], dp[i][j - 1] + grid[i][j]); // move right
        }
      }
    }
  };

  // minimum cost to reach a cell by teleporting from any cell with a value less than or equal to the current cell
  const teleportMove = (
    dp: number[][],
    teleMap: [number, number, number][],
  ) => {
    const ts = teleMap.length;

    let curVal = -1;
    let groupMin = Number.MAX_SAFE_INTEGER; // The minimum cost to reach any cell in the current group

    for (let idx = 0; idx < ts; idx++) {
      const [v, r, c] = teleMap[idx];
      // if we encounter a new value, update the current value and the group minimum
      if (v !== curVal) {
        curVal = v;
        groupMin = dp[r][c];
      } else {
        // otherwise, update the group minimum and the current cell's cost
        groupMin = Math.min(groupMin, dp[r][c]);
        dp[r][c] = Math.min(dp[r][c], groupMin);
      }
    }

    // update suffix minimum
    const [vLast, rLast, cLast] = teleMap[ts - 1];
    let suffixMin = dp[rLast][cLast];

    // update the minimum cost to reach each cell by teleporting from any cell with a value less than or equal to the current cell
    // Iterate over the teleportation points in reverse order
    for (let idx = ts - 2; idx >= 0; idx--) {
      const [v2, r, c] = teleMap[idx];
      const cur = dp[r][c];
      if (cur < suffixMin) {
        suffixMin = cur; // Update `suffixMin` if the current cost is less than current `suffixMin`
      } else {
        dp[r][c] = suffixMin;
      }
    }
  };

  // main
  // This loop iterates k times, and each iteration consists of two steps: normal movement and teleportation.
  //
  // The normal movement step updates the minimum cost to reach each cell by moving from the cell down or right.
  // This is done by calling the `normalMove` function.
  //
  // The teleportation step updates the minimum cost to reach each cell by teleporting from any cell with a value less than or equal to the current cell.
  // This is done by calling the `teleportMove` function.
  //
  // The teleportation step is only done if there are more than 0 teleportations left (i.e., k > 0).
  for (let sk = k; sk >= 0; sk--) {
    normalMove(dp, grid, m, n);
    if (sk > 0) {
      teleportMove(dp, teleMap);
    }
  }

  return dp[m - 1][n - 1];
}
