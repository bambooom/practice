// https://leetcode.com/problems/special-positions-in-a-binary-matrix/description
// Given an m x n binary matrix mat, return the number of special positions in mat.
// A position (i, j) is called special if mat[i][j] == 1 and all other elements in row i and column j are 0 (rows and columns are 0-indexed).

// Example 1:
// Input: mat = [[1,0,0],[0,0,1],[1,0,0]]
// Output: 1
// Explanation: (1, 2) is a special position because mat[1][2] == 1 and all other elements in row 1 and column 2 are 0.

// Example 2:
// Input: mat = [[1,0,0],[0,1,0],[0,0,1]]
// Output: 3
// Explanation: (0, 0), (1, 1) and (2, 2) are special positions.

// Constraints:
// m == mat.length
// n == mat[i].length
// 1 <= m, n <= 100
// mat[i][j] is either 0 or 1.

function numSpecial(mat: number[][]): number {
  const m = mat.length;
  const n = mat[0].length;
  const row: number[] = new Array(m).fill(0);
  const col: number[] = new Array(n).fill(0);

  // count the number of 1s in each row and column
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1) {
        row[i]++;
        col[j]++;
      }
    }
  }

  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // if the current cell is 1 and the number of 1s in the row and column is 1, it's a special position
      if (mat[i][j] === 1 && row[i] === 1 && col[j] === 1) {
        ans++;
      }
    }
  }

  return ans;
}
