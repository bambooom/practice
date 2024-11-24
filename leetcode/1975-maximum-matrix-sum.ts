// https://leetcode.com/problems/maximum-matrix-sum/
// You are given an n x n integer matrix. You can do the following operation any number of times:
// - Choose any two adjacent elements of matrix and multiply each of them by -1.
// Two elements are considered adjacent if and only if they share a border.
// Your goal is to maximize the summation of the matrix's elements. Return the maximum sum of the matrix's elements using the operation mentioned above.

// Example1:
// Input: matrix = [[1,-1],[-1,1]]
// Output: 4
// Explanation: We can follow the following steps to reach sum equals 4:
// - Multiply the 2 elements in the first row by -1.
// - Multiply the 2 elements in the first column by -1.

// Example2:
// Input: matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
// Output: 16
// Explanation: We can follow the following step to reach sum equals 16:
// - Multiply the 2 last elements in the second row by -1.

function maxMatrixSum(matrix: number[][]): number {
  // intuition: if we have odd number of negatives, we'll have 1 negative at the end
  // if we have event number of negatives, then we can make all of them positive
  // for odd number of negatives, we can make the min number in matrix the negative number

  const ROWS = matrix.length;
  const COLS = matrix[0].length;

  let minNum = Infinity;
  let numNegatives = 0;
  let sum = 0;

  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLS; y++) {
      const num = matrix[x][y];

      if (num < 0) {
        numNegatives = (numNegatives + 1) % 2;
      }

      const absNum = Math.abs(num);

      sum += absNum;
      minNum = Math.min(minNum, absNum);
    }
  }

  return numNegatives % 2 === 0 ? sum : sum - minNum * 2;
}
