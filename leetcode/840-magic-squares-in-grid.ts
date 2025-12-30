// https://leetcode.com/problems/magic-squares-in-grid
// A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, and both diagonals all have the same sum.
// Given a row x col grid of integers, how many 3 x 3 contiguous magic square subgrids are there?
// Note: while a magic square can only contain numbers from 1 to 9, grid may contain numbers up to 15.

// Example 1:
// Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
// Output: 1
// Explanation: only one possible magic square of size 3 x 3
// [
//   [4,3,8],
//   [9,5,1],
//   [2,7,6]
// ]

// Example 2:
// Input: grid = [[8]]
// Output: 0

// Constraints:
// row == grid.length
// col == grid[i].length
// 1 <= row, col <= 10
// 0 <= grid[i][j] <= 15

// https://leetcode.com/problems/magic-squares-in-grid/solutions/5609756/brute-force-easy-to-understand/?envType=daily-question&envId=2024-08-09
// brute force to check magic square
function numMagicSquaresInside(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  if (m < 3 || n < 3) return 0;

  // check if a 3x3 subgrid is a magic square
  const isMagicSquare = (row: number, col: number): boolean => {
    // target is the sum of the first row
    const target = grid[row][col] + grid[row][col + 1] + grid[row][col + 2];
    const numSet = new Set<number>();
    let sum = 0;
    for (let i = row; i < row + 3; i++) {
      sum = 0; // row sum
      for (let j = col; j < col + 3; j++) {
        numSet.add(grid[i][j]);
        sum += grid[i][j];
      }
      if (sum !== target) {
        return false;
      }
    }

    // check if all numbers are from 1 to 9
    const nums: number[] = Array.from(numSet);
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    if (numSet.size !== 9 || min !== 1 || max !== 9) {
      return false;
    }

    // check column sum
    for (let j = col; j < col + 3; j++) {
      sum = 0;
      for (let i = row; i < row + 3; i++) {
        sum += grid[i][j];
      }
      if (sum !== target) {
        return false;
      }
    }

    // check diagonal sum
    if (
      grid[row][col] + grid[row + 1][col + 1] + grid[row + 2][col + 2] !==
      target
    ) {
      return false;
    }

    if (
      grid[row][col + 2] + grid[row + 1][col + 1] + grid[row + 2][col] !==
      target
    ) {
      return false;
    }

    return true;
  };

  let ans = 0;
  // brute force to check all 3x3 subgrids
  for (let i = 0; i < m - 2; i++) {
    for (let j = 0; j < n - 2; j++) {
      if (isMagicSquare(i, j)) {
        ans++;
      }
    }
  }
  return ans;
}
