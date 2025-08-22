// https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i
// You are given a 2D binary array grid. Find a rectangle with horizontal and vertical sides with the smallest area, such that all the 1's in grid lie inside this rectangle.
// Return the minimum possible area of the rectangle.

// Example 1:
// Input: grid = [[0,1,0],[1,0,1]]
// Output: 6
// Explanation:
// The smallest rectangle has a height of 2 and a width of 3, so it has an area of 2 * 3 = 6.

// Example 2:
// Input: grid = [[1,0],[0,0]]
// Output: 1
// Explanation:
// The smallest rectangle has both height and width 1, so its area is 1 * 1 = 1.

// https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i/solutions/7108030/minimum-area-to-cover-all-ones-100-beat-efficient-java-c-c-c-python3-js-ts-go/?envType=daily-question&envId=2025-08-22
function minimumArea(grid: number[][]): number {
  let m = grid.length;
  let n = grid[0].length;
  let minRow = m, // initialized to m, which is the number of rows in the grid. This ensures that the first row that contains a 1 will always be smaller.
    maxRow = -1, // initialized to -1, which is smaller than any valid row index. This ensures that the first row that contains a 1 will always be larger.
    minCol = n, // initialized to n, which is the number of columns in the grid. This ensures that the first column that contains a 1 will always be smaller.
    maxCol = -1; //  initialized to -1, which is smaller than any valid column index. This ensures that the first column that contains a 1 will always be larger.

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        // Updates the minimum row index minRow to be the smaller of its current value and the current row index i. This effectively keeps track of the topmost row that contains a 1.
        minRow = Math.min(minRow, i);
        // Updates the maximum row index maxRow to be the larger of its current value and the current row index i. This effectively keeps track of the bottommost row that contains a 1
        maxRow = Math.max(maxRow, i);
        // Updates the minimum column index minCol to be the smaller of its current value and the current column index j. This effectively keeps track of the leftmost column that contains a 1.
        minCol = Math.min(minCol, j);
        // Updates the maximum column index maxCol to be the larger of its current value and the current column index j. This effectively keeps track of the rightmost column that contains a 1.
        maxCol = Math.max(maxCol, j);
      }
    }
  }

  return (maxRow - minRow + 1) * (maxCol - minCol + 1);
}
