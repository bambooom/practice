function searchMatrix(matrix: number[][], target: number): boolean {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let low = 0, // (0,0)
    high = rows * cols - 1; // (rows-1, cols-1)

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const i = Math.floor(mid / cols);
    const j = mid % cols;
    if (target === matrix[i][j]) {
      return true;
    } else if (target < matrix[i][j]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
    console.log(low, high);
  }

  return false;
}

const matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60],
];

console.log(searchMatrix(matrix, 3)); // true
console.log(searchMatrix(matrix, 13)); // false
