// https://leetcode.com/problems/increment-submatrices-by-one/
// You are given a positive integer n, indicating that we initially have an n x n 0-indexed integer matrix mat filled with zeroes.
// You are also given a 2D integer array query. For each query[i] = [row1i, col1i, row2i, col2i], you should do the following operation:
// Add 1 to every element in the submatrix with the top left corner (row1i, col1i) and the bottom right corner (row2i, col2i). That is, add 1 to mat[x][y] for all row1i <= x <= row2i and col1i <= y <= col2i.
// Return the matrix mat after performing every query.

// Example 1:
// Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
// Output: [[1,1,0],[1,2,1],[0,1,1]]
// Explanation: The diagram above shows the initial matrix, the matrix after the first query, and the matrix after the second query.
// - In the first query, we add 1 to every element in the submatrix with the top left corner (1, 1) and bottom right corner (2, 2).
// - In the second query, we add 1 to every element in the submatrix with the top left corner (0, 0) and bottom right corner (1, 1).

// Example 2:
// Input: n = 2, queries = [[0,0,1,1]]
// Output: [[1,1],[1,1]]
// Explanation: The diagram above shows the initial matrix and the matrix after the first query.
// - In the first query we add 1 to every element in the matrix.

// Constraints:
// 1 <= n <= 500
// 1 <= queries.length <= 10^4
// 0 <= row1i <= row2i < n
// 0 <= col1i <= col2i < n

// https://leetcode.com/problems/increment-submatrices-by-one/solutions/7347238/all-language-solutions0msbeat-100all-in-81k3b/?envType=daily-question&envId=2025-11-14
// For every query (r1, c1, r2, c2), instead of updating all cells inside the rectangle, we mark:
// +1 at the top-left corner
// -1 just to the right and just below the rectangle
// +1 at the bottom-right overflow corner
// These marks describe how values should change across the matrix.
// After processing all queries, we take prefix sums

// The values in the matrix are calculated by summing the values from the diff array and the previous values in the matrix. For example, the value at mat[1][1] is calculated as diff[1][1] + mat[0][1] + mat[1][0] + mat[0][0], which is 1 + 0 + 1 + 1 = 3.
function rangeAddQueries(n: number, queries: number[][]): number[][] {
  // To optimize this, we use a 2D difference array, which allows us to represent a rectangle increment using only constant-time updates on its corners.
  const diff: number[][] = Array.from({ length: n + 1 }, () =>
    Array(n + 1).fill(0),
  );

  for (let [row1, col1, row2, col2] of queries) {
    diff[row1][col1] += 1;
    diff[row1][col2 + 1] -= 1; // By subtracting 1 from the cells just below and to the right of the rectangle, we ensure that the increment is properly propagated to the surrounding cells, accounting for the overflow.
    diff[row2 + 1][col1] -= 1;
    diff[row2 + 1][col2 + 1] += 1;
  }

  const mat: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x1 = i === 0 ? 0 : mat[i - 1][j];
      const x2 = j === 0 ? 0 : mat[i][j - 1];
      const x3 = i === 0 || j === 0 ? 0 : mat[i - 1][j - 1];
      mat[i][j] = diff[i][j] + x1 + x2 - x3;
    }
  }

  return mat;
}
