// https://leetcode.com/problems/diagonal-traverse
// Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

// Example 1:
// Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,4,7,5,3,6,8,9]

// Example 2:
// Input: mat = [[1,2],[3,4]]
// Output: [1,2,3,4]

// https://leetcode.com/problems/diagonal-traverse/solutions/2176309/simplest-solution-in-javascript/?envType=daily-question&envId=2025-08-25
function findDiagonalOrder(mat: number[][]): number[] {
  const rows = mat.length - 1;
  const cols = mat[0].length - 1;

  const result: number[] = [];

  let row = 0;
  let col = 0;

  // Continue iterating until all elements have been visited
  while (result.length !== (rows + 1) * (cols + 1)) {
    // Move diagonally up and right
    while (row >= 0 && col <= cols) {
      result.push(mat[row][col]);
      row--;
      col++;
    }
    // Move down to the next row
    row++;

    // If we've moved past the right edge, move back and down
    if (col > cols) {
      col--;
      row++;
    }

    // Move diagonally down and left
    while (row <= rows && col >= 0) {
      result.push(mat[row][col]);
      row++;
      col--;
    }
    // Move right to the next column
    col++;

    // If we've moved past the bottom edge, move back and right
    if (row > rows) {
      row--;
      col++;
    }
  }

  return result;
}
