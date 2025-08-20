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

  // Helper function to check if a square can be formed at position (i, j)
  const checkSquare = (i: number, j: number) => {
    const a = matrix[i - 1][j - 1]; // top-left
    const b = matrix[i][j - 1]; // left
    const c = matrix[i - 1][j]; // top

    // If all three neighbors are 1, it means a square can be formed
    // The size of the square is the minimum size of the three neighbors plus 1
    if (a & b & c) {
      matrix[i][j] += Math.min(a, b, c);
      // storing the size of the largest square that can be formed at position (i, j)
      // This updated value is then used in the next iterations of the algorithm, when we're checking the neighbors of the cells below and to the right of (i, j).
      // Because we've updated the matrix in-place, the values of the neighbors that we're checking are already taking into account the sizes of the squares that can be formed above and to the left.
      // This means that when we're checking if a square can be formed at a given position, we're not just checking the current cell and its immediate neighbors - we're actually checking the entire "history" of squares that can be formed above and to the left.
    }
  };

  const rows = matrix.length;
  const cols = matrix[0].length;

  // Iterate over the matrix, starting from the second row and column
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      // If the current cell is 1, check if a square can be formed
      if (matrix[i][j]) {
        checkSquare(i, j);
      }
    }
  }

  // Sum up the sizes of all squares
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      res += matrix[i][j];
    }
  }

  return res;
}
