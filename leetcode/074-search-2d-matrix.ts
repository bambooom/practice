// https://leetcode.com/problems/search-a-2d-matrix
// You are given an m x n integer matrix matrix with the following two properties:
// - Each row is sorted in non-decreasing order.
// - The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.
// You must write a solution in O(log(m * n)) time complexity.
// #binary-search

// O(log(m * n)) time
function search2DMatrix(matrix: number[][], target: number): boolean {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let low = 0, // (0,0)
    high = rows * cols - 1; // (rows-1, cols-1)

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    // 假设把matrix平铺开来进行 binary search， row = idx // n, col = idx % n
    const i = Math.floor(mid / cols);
    const j = mid % cols;
    if (target === matrix[i][j]) {
      return true;
    } else if (target < matrix[i][j]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
    // console.log(low, high);
  }

  return false;
}

const matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
];

console.log(search2DMatrix(matrix, 3)); // true
console.log(search2DMatrix(matrix, 13)); // false
