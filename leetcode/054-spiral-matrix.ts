// https://leetcode.com/problems/spiral-matrix/
// Given an m x n matrix, return all elements of the matrix in spiral order.

// Time Complexity: O(m*n)
// Space Complexity: O(1)
function spiralOrder(matrix: number[][]): number[] {
  if (matrix.length === 0) return [];
  const res: number[] = [];

  let row1 = 0;
  let col1 = 0;
  let row2 = matrix.length - 1;
  let col2 = matrix[0].length - 1;

  while (row1 <= row2 && col1 <= col2) {
    // upper line
    for (let col = col1; col <= col2; col++) {
      res.push(matrix[row1][col]);
    }
    // right light
    for (let row = row1 + 1; row <= row2; row++) {
      res.push(matrix[row][col2]);
    }
    if (row1 < row2 && col1 < col2) {
      // bottom line, reverse
      for (let col = col2 - 1; col >= col1; col--) {
        res.push(matrix[row2][col]);
      }
      // left line, reverse
      for (let row = row2 - 1; row > row1; row--) {
        res.push(matrix[row][col1]);
      }
    }

    row1++;
    col1++;
    row2--;
    col2--;
  }

  return res;
}
