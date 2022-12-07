// https://leetcode.com/problems/rotate-image/
// rotate nxn matrix by 90 degress

// Do not return anything, modify matrix in-place instead.

// 4-way swap method
function rotate(matrix: number[][]): void {
  const n = matrix.length;
  const depth = ~~(n / 2);

  for (let i = 0; i < depth; i++) {
    const len = n - 2 * i - 1,
      opp = n - 1 - i;
    for (let j = 0; j < len; j++) {
      const tmp = matrix[i][i + j];
      matrix[i][i + j] = matrix[opp - j][i];
      matrix[opp - j][i] = matrix[opp][opp - j];
      matrix[opp][opp - j] = matrix[i + j][opp];
      matrix[i + j][opp] = tmp;
    }
  }
}

// Reverse on Diagonal and then Reverse Left to Right

//	1 2 3      1 4 7      7 4 1
//	4 5 6  =>  2 5 8  =>  8 5 2
//	7 8 9      3 6 9      9 6 3

// Time complexity: O(n^2)
// Space complexity: O(1)

const rotate2 = function (matrix: number[][]) {
  const n = matrix.length;

  function transpose(matrix: number[][]) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const temp = matrix[j][i];
        matrix[j][i] = matrix[i][j];
        matrix[i][j] = temp;
      }
    }
  }

  function rotate(matrix: number[][]) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n / 2; j++) {
        const temp = matrix[i][j];
        matrix[i][j] = matrix[i][n - 1 - j];
        matrix[i][n - 1 - j] = temp;
      }
    }
  }

  transpose(matrix);
  rotate(matrix);
};
