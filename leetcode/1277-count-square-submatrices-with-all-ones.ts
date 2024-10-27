// https://leetcode.com/problems/count-square-submatrices-with-all-ones
// Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.

// Example 1:
// Input: matrix =
// [
//   [0,1,1,1],
//   [1,1,1,1],
//   [0,1,1,1]
// ]
// Output: 15
// Explanation:
// There are 10 squares of side 1.
// There are 4 squares of side 2.
// There is  1 square of side 3.
// Total number of squares = 10 + 4 + 1 = 15.

// Example 2:
// Input: matrix =
// [
//   [1,0,1],
//   [1,1,0],
//   [1,1,0]
// ]
// Output: 7
// Explanation:
// There are 6 squares of side 1.
// There is 1 square of side 2.
// Total number of squares = 6 + 1 = 7.

// https://leetcode.com/problems/count-square-submatrices-with-all-ones/solutions/5972616/explained-step-by-step-beats-100-working-27-10-2024/
// dynamic programming
function countSquares(matrix: number[][]): number {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // create DP table with same dimensions as matrix
  const dp: number[][] = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));

  let ans = 0;
  // initialize first column of DP table
  for (let i = 0; i < rows; i++) {
    dp[i][0] = matrix[i][0];
    ans += dp[i][0];
  }
  // initialize first row of DP table
  for (let j = 1; j < cols; j++) {
    dp[0][j] = matrix[0][j];
    ans += dp[0][j];
  }

  // fill in DP table for remaining cells
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][j] === 1) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
      ans += dp[i][j];
    }
  }

  return ans;
}

// https://leetcode.com/problems/count-square-submatrices-with-all-ones/solutions/847274/javascript-typescript-solution/
// seems faster solution

function countSquares2(matrix: number[][]): number {
  let res = 0;

  const checkSquare = (i: number, j: number) => {
    const a = matrix[i - 1][j - 1];
    const b = matrix[i][j - 1];
    const c = matrix[i - 1][j];

    if (a & b & c) {
      matrix[i][j] += Math.min(a, b, c);
    }
  };

  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][j]) {
        checkSquare(i, j);
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      res += matrix[i][j];
    }
  }

  return res;
}
