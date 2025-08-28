// https://leetcode.com/problems/sort-matrix-by-diagonals
// You are given an n x n square matrix of integers grid. Return the matrix such that:
// The diagonals in the bottom-left triangle (including the middle diagonal) are sorted in non-increasing order.
// The diagonals in the top-right triangle are sorted in non-decreasing order.

// Example 1:
// Input: grid = [[1,7,3],[9,8,2],[4,5,6]]
// Output: [[8,2,3],[9,6,7],[4,5,1]]
// Explanation:
// The diagonals with a black arrow (bottom-left triangle) should be sorted in non-increasing order:
// [1, 8, 6] becomes [8, 6, 1].
// [9, 5] and [4] remain unchanged.
// The diagonals with a blue arrow (top-right triangle) should be sorted in non-decreasing order:
// [7, 2] becomes [2, 7].
// [3] remains unchanged.

// Example 2:
// Input: grid = [[0,1],[1,2]]
// Output: [[2,1],[1,0]]
// Explanation:
// The diagonals with a black arrow must be non-increasing, so [0, 2] is changed to [2, 0]. The other diagonals are already in the correct order.

// Example 3:
// Input: grid = [[1]]
// Output: [[1]]
// Explanation:
// Diagonals with exactly one element are already in order, so no changes are needed.

function sortMatrix(grid: number[][]): number[][] {
  const n = grid.length;
  const m = grid[0].length;
  const diagonals: Record<string, number[]> = {};

  // Group elements by their diagonal
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const key = (i - j).toString();
      if (!(key in diagonals)) {
        diagonals[key] = [];
      }
      diagonals[key].push(grid[i][j]);
    }
  }

  // Sort each diagonal
  for (const key in diagonals) {
    const k = parseInt(key);
    if (k < 0) {
      // Sort diagonals in the bottom-left triangle in non-decreasing order
      diagonals[key].sort((a, b) => a - b);
    } else {
      // Sort diagonals in the top-right triangle in non-increasing order
      diagonals[key].sort((a, b) => b - a);
    }
  }

  // Create an index dictionary to keep track of the current position in each diagonal
  const idx: Record<string, number> = {};
  for (const key in diagonals) {
    idx[key] = 0;
  }

  // Reconstruct the matrix with the sorted diagonals
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // Get the diagonal index (i - j)
      const key = (i - j).toString();
      // Assign the next element from the sorted diagonal to the matrix
      grid[i][j] = diagonals[key][idx[key]++];
    }
  }

  return grid;
}
