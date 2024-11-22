// https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows/description
// You are given an m x n binary matrix matrix.
// You can choose any number of columns in the matrix and flip every cell in that column (i.e., Change the value of the cell from 0 to 1 or vice versa).
// Return the maximum number of rows that have all values equal after some number of flips.

// Example 1:

// Input: matrix = [[0,1],[1,1]]
// Output: 1
// Explanation: After flipping no values, 1 row has all values equal.
// Example 2:

// Input: matrix = [[0,1],[1,0]]
// Output: 2
// Explanation: After flipping values in the first column, both rows have equal values.
// Example 3:

// Input: matrix = [[0,0,0],[0,0,1],[1,1,0]]
// Output: 2
// Explanation: After flipping values in the first two columns, the last two rows have equal values.

// https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows/solutions/6070318/beats-100-video-full-explain-simple-short/
// when we can flip any column, two rows can become equal if they are either identical or complete opposites
// key to recognize pattern
function maxEqualRowsAfterFlips(matrix: number[][]): number {
  const patFraq = new Map<string, number>();

  for (const row of matrix) {
    const pattern =
      row[0] === 0 ? row.join('') : row.map((bit) => bit ^ 1).join('');

    patFraq.set(pattern, (patFraq.get(pattern) || 0) + 1);
  }

  return Math.max(...patFraq.values());
}
