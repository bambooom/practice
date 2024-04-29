// https://leetcode.com/problems/sparse-matrix-multiplication
// Given two sparse matrices mat1 of size m x k and mat2 of size k x n, return the result of mat1 x mat2. You may assume that multiplication is always possible.

// Naive solution: matrix multiplication 按定义来
// Time: O(m * k * n)
// Space: O(1)
function multiply(mat1: number[][], mat2: number[][]): number[][] {
  // product
  const ans = Array(mat1.length)
    .fill(0)
    .map((x) => Array(mat2[0].length).fill(0));

  mat1.forEach((rowElements, rowIndex) => {
    rowElements.forEach((rowElement, elementIndex) => {
      // If current element of mat1 is non-zero then iterate over all columns of mat2.
      if (rowElement) {
        mat2[elementIndex].forEach((colElement, colIndex) => {
          ans[rowIndex][colIndex] += rowElement * colElement;
        });
      }
    });
  });

  return ans;
}
