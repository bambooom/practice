// https://leetcode.com/problems/length-of-longest-v-shaped-diagonal-segment
// You are given a 2D integer matrix grid of size n x m, where each element is either 0, 1, or 2.
// A V-shaped diagonal segment is defined as:
// The segment starts with 1.
// The subsequent elements follow this infinite sequence: 2, 0, 2, 0, ....
// The segment:
// Starts along a diagonal direction (top-left to bottom-right, bottom-right to top-left, top-right to bottom-left, or bottom-left to top-right).
// Continues the sequence in the same diagonal direction.
// Makes at most one clockwise 90-degree turn to another diagonal direction while maintaining the sequence.
// Return the length of the longest V-shaped diagonal segment. If no valid segment exists, return 0.

// Example 1:
// Input: grid = [[2,2,1,2,2],[2,0,2,2,0],[2,0,1,1,0],[1,0,2,2,2],[2,0,0,2,2]]
// Output: 5
// Explanation:
// The longest V-shaped diagonal segment has a length of 5 and follows these coordinates: (0,2) → (1,3) → (2,4), takes a 90-degree clockwise turn at (2,4), and continues as (3,3) → (4,2).

// Example 2:
// Input: grid = [[2,2,2,2,2],[2,0,2,2,0],[2,0,1,1,0],[1,0,2,2,2],[2,0,0,2,2]]
// Output: 4
// Explanation:
// The longest V-shaped diagonal segment has a length of 4 and follows these coordinates: (2,3) → (3,2), takes a 90-degree clockwise turn at (3,2), and continues as (2,1) → (1,0).

// Example 3:
// Input: grid = [[1,2,2,2,2],[2,2,2,2,0],[2,0,0,0,0],[0,0,2,2,2],[2,0,0,2,0]]
// Output: 5
// Explanation:
// The longest V-shaped diagonal segment has a length of 5 and follows these coordinates: (0,0) → (1,1) → (2,2) → (3,3) → (4,4).

// Example 4:
// Input: grid = [[1]]
// Output: 1
// Explanation:
// The longest V-shaped diagonal segment has a length of 1 and follows these coordinates: (0,0).

// editorial
function lenOfVDiagonal(grid: number[][]): number {
  const DIRS = [
    [1, 1], // down-right
    [1, -1], // down-left
    [-1, -1], // up-left
    [-1, 1], // up-right
  ];
  const m = grid.length,
    n = grid[0].length;
  // Create a memoization array to store the results of subproblems
  const memo: number[] = new Array(m * n * 8).fill(-1);

  function dfs(
    cx: number, // current x-coordinate
    cy: number, // current y-coordinate
    direction: number, // 0-3
    turn: boolean, // whether path has turned or not
    target: number, // the target value for the next cell (1 or 2)
  ): number {
    // return the length of longest diagonal path from the current cell

    // calculate next cell's coordinates
    const nx = cx + DIRS[direction][0];
    const ny = cy + DIRS[direction][1];

    /* If it goes beyond the boundary or the next node's value is not the target
     * value, then return */
    if (nx < 0 || ny < 0 || nx >= m || ny >= n || grid[nx][ny] !== target) {
      return 0;
    }

    // Calculate the index for the memoization array
    const turnInt = turn ? 1 : 0;
    const index = nx * n * 8 + ny * 8 + direction * 2 + turnInt;
    if (memo[index] !== -1) {
      return memo[index]; // return the memoized result
    }

    /* Continue walking in the original direction. */
    let maxStep = dfs(nx, ny, direction, turn, 2 - target);
    if (turn) {
      /* Clockwise rotate 90 degrees turn */
      maxStep = Math.max(
        maxStep,
        dfs(nx, ny, (direction + 1) % 4, false, 2 - target),
      );
    }

    // Memoize the result and return it
    memo[index] = maxStep + 1;
    return maxStep + 1;
  }

  let res = 0;

  // itgerate over all cells in the grid
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        // try starting a diagonal path from here
        for (let direction = 0; direction < 4; direction++) {
          res = Math.max(res, dfs(i, j, direction, true, 2) + 1);
        }
      }
    }
  }
  return res;
}
