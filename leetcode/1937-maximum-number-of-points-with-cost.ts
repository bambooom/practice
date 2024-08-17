// https://leetcode.com/problems/maximum-number-of-points-with-cost/
// You are given an m x n integer matrix points (0-indexed). Starting with 0 points, you want to maximize the number of points you can get from the matrix.
// To gain points, you must pick one cell in each row. Picking the cell at coordinates (r, c) will add points[r][c] to your score.
// However, you will lose points if you pick a cell too far from the cell that you picked in the previous row. For every two adjacent rows r and r + 1 (where 0 <= r < m - 1), picking cells at coordinates (r, c1) and (r + 1, c2) will subtract abs(c1 - c2) from your score.
// Return the maximum number of points you can achieve.

// Example1:
// Input: points = [[1,2,3],[1,5,1],[3,1,1]]
// Output: 9
// Explanation:
// The blue cells denote the optimal cells to pick, 3, 5, 3, which have coordinates (0, 2), (1, 1), and (2, 0).
// You add 3 + 5 + 3 = 11 to your score.
// However, you must subtract abs(2 - 1) + abs(1 - 0) = 2 from your score.
// Your final score is 11 - 2 = 9.

// Example2:
// Input: points = [[1,5],[2,3],[4,2]]
// Output: 11
// Explanation:
// The blue cells denote the optimal cells to pick, which have coordinates (0, 1), (1, 1), and (2, 0).
// You add 5 + 3 + 4 = 12 to your score.
// However, you must subtract abs(1 - 1) + abs(1 - 0) = 1 from your score.
// Your final score is 12 - 1 = 11.

// https://leetcode.com/problems/maximum-number-of-points-with-cost/solutions/1372089/javascript-clear-explanation/
// https://leetcode.com/problems/maximum-number-of-points-with-cost/solutions/1346573/javascript-easy-to-understand-o-m-n/
// use left and right arrays
function maxPoints(points: number[][]): number {
  let prev = points[0];
  let curr = Array(points[0].length);

  // starting from second row, we're always looking one row up to find the max value we can add to any cell in the current row
  for (let i = 1; i < points.length; i++) {
    // from left to right
    // keep track of a running max that you can add to the current cell
    // the running max has to decrement each iteration since it costs for each column of distance
    for (let j = 0, maxAdd = 0; j < points[0].length; j++) {
      maxAdd = Math.max(maxAdd - 1, prev[j]);
      curr[j] = points[i][j] + maxAdd;
    }

    // from right to left, same idea
    // for each cell, take the max(best sum from previous loop, best sum from current loop)
    for (let j = points[0].length - 1, maxAdd = 0; j >= 0; j--) {
      maxAdd = Math.max(maxAdd - 1, prev[j]);
      curr[j] = Math.max(curr[j], points[i][j] + maxAdd);
    }

    prev = curr;
    curr = Array(points[0].length);
  }

  return Math.max(...prev);
}
