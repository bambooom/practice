// https://leetcode.com/problems/matrix-diagonal-sum/

function diagonalSum(mat: number[][]): number {
  if (mat.length === 1) {
    return mat[0][0];
  }

  let sum = 0;
  for (let i = 0, j = mat.length - 1; i < mat.length; i++, j--) {
    if (i != j) {
      sum += mat[i][j];
    }
    sum += mat[i][i];
  }

  return sum;
}
