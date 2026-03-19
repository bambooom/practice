// https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y
// Given a 2D character matrix grid, where grid[i][j] is either 'X', 'Y', or '.', return the number of submatrices that contain:
// grid[0][0]
// an equal frequency of 'X' and 'Y'.
// at least one 'X'.

// Example 1:
// Input: grid = [["X","Y","."],["Y",".","."]]
// Output: 3
// Explanation:

// Example 2:
// Input: grid = [["X","X"],["X","Y"]]
// Output: 0
// Explanation:
// No submatrix has an equal frequency of 'X' and 'Y'.

// Example 3:
// Input: grid = [[".","."],[".","."]]
// Output: 0
// Explanation:
// No submatrix has at least one 'X'.

// Constraints:
// 1 <= grid.length, grid[i].length <= 1000
// grid[i][j] is either 'X', 'Y', or '.'.

// https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y/solutions/7662975/100-medium-problem-with-easy-approach-wi-dnhy/?envType=daily-question&envId=2026-03-19
// Approach
// Maintain two arrays:
// ox[j] → cumulative count of 'X'
// oy[j] → cumulative count of 'Y'
// For each row:
// Keep running row counters rowX, rowY.
// For each column:
//    Update row counters.
//    Add row counters into ox[j] and oy[j].
//    If ox[j] == oy[j] and ox[j] > 0, increment result.
// Each (i, j) represents a submatrix from (0,0) to (i,j).
function numberOfSubmatrices(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  const ox: number[] = new Array(n).fill(0); // cumulative count of X
  const oy: number[] = new Array(n).fill(0); // cumulative count of Y

  let res = 0;

  for (let i = 0; i < m; i++) {
    let rowX = 0;
    let rowY = 0;

    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 'X') {
        rowX++;
      } else if (grid[i][j] === 'Y') {
        rowY++;
      }

      ox[j] += rowX;
      oy[j] += rowY;

      if (ox[j] === oy[j] && ox[j] > 0) {
        res++;
      }
    }
  }

  return res;
}
