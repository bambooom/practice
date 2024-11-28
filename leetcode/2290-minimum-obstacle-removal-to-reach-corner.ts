// https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner
// You are given a 0-indexed 2D integer array grid of size m x n. Each cell has one of two values:
// 0 represents an empty cell,
// 1 represents an obstacle that may be removed.
// You can move up, down, left, or right from and to an empty cell.
// Return the minimum number of obstacles to remove so you can move from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1).

// Example1:
// Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
// Output: 2
// Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
// It can be shown that we need to remove at least 2 obstacles, so we return 2.
// Note that there may be other ways to remove 2 obstacles to create a path.

// Example2:
// Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
// Output: 0
// Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.

// https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/solutions/2086214/javascript-simple-bfs-with-updating-distance/
function minimumObstacles(grid: number[][]): number {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const distance: number[][] = Array(grid.length)
    .fill(0)
    .map(() => Array(grid[0].length).fill(Number.MAX_SAFE_INTEGER));

  return bfs(0, 0);

  function bfs(row: number, col: number): number {
    const queue: number[][] = [[row, col]];
    distance[row][col] = 0;

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;

      const originalDistance = distance[row][col];

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < grid.length &&
          newCol >= 0 &&
          newCol < grid[0].length
        ) {
          let dist = originalDistance;
          if (grid[newRow][newCol] === 1) {
            dist++;
          }
          if (distance[newRow][newCol] > dist) {
            // update distance for this neighbour node if the new distance is smaller than the previous distance
            queue.push([newRow, newCol]);
            distance[newRow][newCol] = dist;
          }
        }
      }
    }

    // return the mininum distance for last cell
    return distance[grid.length - 1][grid[0].length - 1];
  }
}
