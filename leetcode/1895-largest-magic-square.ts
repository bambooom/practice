// https://leetcode.com/problems/largest-magic-square/
// A k x k magic square is a k x k grid filled with integers such that every row sum, every column sum, and both diagonal sums are all equal. The integers in the magic square do not have to be distinct. Every 1 x 1 grid is trivially a magic square.
// Given an m x n integer grid, return the size (i.e., the side length k) of the largest magic square that can be found within this grid.

// Example 1:
// Input: grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
// Output: 3
// Explanation: The largest magic square has a size of 3.
// Every row sum, column sum, and diagonal sum of this magic square is equal to 12.
// - Row sums: 5+1+6 = 5+4+3 = 2+7+3 = 12
// - Column sums: 5+5+2 = 1+4+7 = 6+3+3 = 12
// - Diagonal sums: 5+4+3 = 6+4+2 = 12

// Example 2:
// Input: grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
// Output: 2

// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 50
// 1 <= grid[i][j] <= 10^6

// https://leetcode.com/problems/largest-magic-square/solutions/7503490/100-medium-problem-with-easy-approach-wi-kmrd/?envType=daily-question&envId=2026-01-18
function largestMagicSquare(grid: number[][]): number {
  const r = grid.length;
  const c = grid[0].length;
  const rowSum: number[][] = Array.from({ length: r + 1 }, () =>
    Array(c + 1).fill(0),
  );
  const colSum: number[][] = Array.from({ length: r + 1 }, () =>
    Array(c + 1).fill(0),
  );
  const diagSum: number[][] = Array.from({ length: r + 1 }, () =>
    Array(c + 1).fill(0),
  );
  const antiDiagSum: number[][] = Array.from({ length: r + 1 }, () =>
    Array(c + 1).fill(0),
  );

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const x = grid[i][j];
      // Update the sums based on the values in the grid
      rowSum[i + 1][j + 1] = rowSum[i + 1][j] + x;
      colSum[i + 1][j + 1] = colSum[i][j + 1] + x;
      diagSum[i + 1][j + 1] = diagSum[i][j] + x;
      antiDiagSum[i + 1][j] = antiDiagSum[i][j + 1] + x;
    }
  }

  // Checks if a magic square of size k can be formed within the grid.
  const isMagic = (k: number): boolean => {
    // Iterate over all possible positions of the top-left corner of the square
    for (let i = 0; i <= r - k; i++) {
      for (let j = 0; j <= c - k; j++) {
        // Calculate the sum of the diagonal
        const s = diagSum[i + k][j + k] - diagSum[i][j];
        // Calculate the sum of the anti-diagonal
        const anti = antiDiagSum[i + k][j] - antiDiagSum[i][j + k];
        if (s !== anti) {
          continue; // If the sums are not equal, continue to the next position
        }

        let valid = true;
        // Check if the sums of the rows and columns are equal to the diagonal sum
        for (let m = 0; m < k; m++) {
          const row = rowSum[i + m + 1][j + k] - rowSum[i + m + 1][j];
          const col = colSum[i + k][j + m + 1] - colSum[i][j + m + 1];
          // If any row or column sum is not equal to the diagonal sum, set valid to false and break the loop
          if (row !== s || col !== s) {
            valid = false;
            break;
          }
        }
        // If all sums are equal, return true
        if (valid) {
          return true;
        }
      }
    }

    return false;
  };

  // Try all possible sizes of the magic square, starting from the largest possible size and working down to 2
  for (let k = Math.min(r, c); k >= 2; k--) {
    if (isMagic(k)) {
      return k;
    }
  }

  return 1;
}
