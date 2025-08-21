// https://leetcode.com/problems/count-submatrices-with-all-ones
// Given an m x n binary matrix mat, return the number of submatrices that have all ones.

// Example 1:
// Input: mat = [[1,0,1],[1,1,0],[1,1,0]]
// Output: 13
// Explanation:
// There are 6 rectangles of side 1x1.
// There are 2 rectangles of side 1x2.
// There are 3 rectangles of side 2x1.
// There is 1 rectangle of side 2x2.
// There is 1 rectangle of side 3x1.
// Total number of rectangles = 6 + 2 + 3 + 1 + 1 = 13.

// Example 2:
// Input: mat = [[0,1,1,0],[0,1,1,1],[1,1,1,0]]
// Output: 24
// Explanation:
// There are 8 rectangles of side 1x1.
// There are 5 rectangles of side 1x2.
// There are 2 rectangles of side 1x3.
// There are 4 rectangles of side 2x1.
// There are 2 rectangles of side 2x2.
// There are 2 rectangles of side 3x1.
// There is 1 rectangle of side 3x2.
// Total number of rectangles = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24.

// https://leetcode.com/problems/count-submatrices-with-all-ones/solutions/5613301/time-o-nm-2-space-o-1/?envType=daily-question&envId=2025-08-21
function numSubmat(mat: number[][]): number {
  const Y = mat.length;
  const X = mat[0].length;

  // calculate consecutive ones from left
  for (let y = 0; y < Y; y++) {
    for (let x = 1; x < X; x++) {
      // If the current cell is 1, update its value to be the length of consecutive ones
      mat[y][x] = mat[y][x] === 0 ? 0 : mat[y][x - 1] + 1;
    }
  }

  let sum = 0;

  for (let y = 0; y < Y; y++) {
    for (let x = 0; x < X; x++) {
      // Initialize the maximum width of a submatrix with all ones
      let width = Infinity;
      // Iterate from the current row up to the top row
      for (let z = y; z >= 0 && width > 0; z--) {
        // Update the maximum width to be the minimum of the current width and the length of consecutive ones
        width = Math.min(width, mat[z][x]);
        // Add the current width to the count of submatrices with all ones
        sum += width;
      }
    }
  }

  return sum;
}

// Editorial
function numSubmat2(mat: number[][]): number {
  const m = mat.length,
    n = mat[0].length;
  let res = 0;
  const row: number[][] = new Array(m);
  for (let i = 0; i < m; i++) {
    row[i] = new Array(n).fill(0);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (j === 0) {
        row[i][j] = mat[i][j];
      } else {
        row[i][j] = mat[i][j] === 0 ? 0 : row[i][j - 1] + 1;
      }
      let cur = row[i][j];
      for (let k = i; k >= 0; k--) {
        cur = Math.min(cur, row[k][j]);
        if (cur === 0) {
          break;
        }
        res += cur;
      }
    }
  }
  return res;
}
