// https://leetcode.com/problems/grid-game/
// You are given a 0-indexed 2D array grid of size 2 x n, where grid[r][c] represents the number of points at position (r, c) on the matrix. Two robots are playing a game on this matrix.
// Both robots initially start at (0, 0) and want to reach (1, n-1). Each robot may only move to the right ((r, c) to (r, c + 1)) or down ((r, c) to (r + 1, c)).
// At the start of the game, the first robot moves from (0, 0) to (1, n-1), collecting all the points from the cells on its path. For all cells (r, c) traversed on the path, grid[r][c] is set to 0. Then, the second robot moves from (0, 0) to (1, n-1), collecting the points on its path. Note that their paths may intersect with one another.
// The first robot wants to minimize the number of points collected by the second robot. In contrast, the second robot wants to maximize the number of points it collects. If both robots play optimally, return the number of points collected by the second robot.

// Example1:
// Input: grid = [[2,5,4],[1,5,1]]
// Output: 4
// Explanation: The optimal path taken by the first robot is shown in red, and the optimal path taken by the second robot is shown in blue.
// The cells visited by the first robot are set to 0.
// The second robot will collect 0 + 0 + 4 + 0 = 4 points.

// Example2:
// Input: grid = [[3,3,1],[8,5,2]]
// Output: 4
// Explanation: The optimal path taken by the first robot is shown in red, and the optimal path taken by the second robot is shown in blue.
// The cells visited by the first robot are set to 0.
// The second robot will collect 0 + 3 + 1 + 0 = 4 points.

// Example3:
// Input: grid = [[1,3,1,15],[1,3,3,1]]
// Output: 7
// Explanation: The optimal path taken by the first robot is shown in red, and the optimal path taken by the second robot is shown in blue.
// The cells visited by the first robot are set to 0.
// The second robot will collect 0 + 1 + 3 + 3 + 0 = 7 points.

// https://leetcode.com/problems/grid-game/solutions/3977845/typescript-prefix-sum-matrix-o-n-time-o-n-space/
// First Robot robot1 doesn't have to get the maximum sum, it only has to minimise the second robot's sum
// we get all the possible path for robot1 and for each path we get the max point that robot2 can get (which is the max between the groups seperated by the robot1 path)
function gridGame(grid: number[][]): number {
  const prefixSums = new Array(grid[0].length + 1).fill(0);

  for (let i = grid[0].length - 1; i >= 0; i--) {
    prefixSums[i] = grid[0][i] + prefixSums[i + 1];
  }

  let bottom = 0;
  let minResult = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < grid[0].length; i++) {
    const side = prefixSums[i + 1];
    const robot2Max = Math.max(side, bottom);
    minResult = Math.min(minResult, robot2Max);
    bottom += grid[1][i];
  }

  return minResult;
}
