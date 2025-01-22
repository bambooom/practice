// https://leetcode.com/problems/map-of-highest-peak/description/
// You are given an integer matrix isWater of size m x n that represents a map of land and water cells.
// If isWater[i][j] == 0, cell (i, j) is a land cell.
// If isWater[i][j] == 1, cell (i, j) is a water cell.
// You must assign each cell a height in a way that follows these rules:
// The height of each cell must be non-negative.
// If the cell is a water cell, its height must be 0.
// Any two adjacent cells must have an absolute height difference of at most 1. A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).
// Find an assignment of heights such that the maximum height in the matrix is maximized.
// Return an integer matrix height of size m x n where height[i][j] is cell (i, j)'s height. If there are multiple solutions, return any of them.

// Example 1:
// Input: isWater = [[0,1],[0,0]]
// Output: [[1,0],[2,1]]
// Explanation: The image shows the assigned heights of each cell.
// The blue cell is the water cell, and the green cells are the land cells.

// Example 2:
// Input: isWater = [[0,0,1],[1,0,0],[0,0,0]]
// Output: [[1,1,0],[0,1,1],[1,2,2]]
// Explanation: A height of 2 is the maximum possible height of any assignment.
// Any height assignment that has a maximum height of 2 while still meeting the rules will also be accepted.

// BFS
function highestPeak(isWater: number[][]): number[][] {
  const m = isWater.length;
  const n = isWater[0].length;

  let queue: number[][] = []; // water cells
  for (let y = 0; y < m; y++) {
    for (let x = 0; x < n; x++) {
      if (isWater[y][x]) {
        queue.push([y, x]);
      }
    }
  }

  let height = 0;
  const result: number[][] = Array.from({ length: m }, () => []);
  let newQueue: number[][] = [];

  while (queue.length) {
    for (const [y, x] of queue) {
      if (result[y][x] !== undefined) {
        continue;
      }
      result[y][x] = height;
      if (x >= 1 && result[y][x - 1] === undefined) {
        newQueue.push([y, x - 1]);
      }
      if (x + 1 < n && result[y][x + 1] === undefined) {
        newQueue.push([y, x + 1]);
      }
      if (y >= 1 && result[y - 1][x] === undefined) {
        newQueue.push([y - 1, x]);
      }
      if (y + 1 < m && result[y + 1][x] === undefined) {
        newQueue.push([y + 1, x]);
      }
    }
    [queue, newQueue] = [newQueue, queue];
    newQueue.splice(0);
    height++;
  }

  return result;
}

// https://leetcode.com/problems/map-of-highest-peak/solutions/6313071/no-bfs-simple-loop-detailed-explanation/
// no BFS, simple loop, faster than BFS
// propagating heights across the grid in two passes, ensuring that every cell considers its neighbors both from the previous and subsequent directions.
// The order of these passes is flexible. You could choose:
//  - Top-to-bottom and left-to-right followed by bottom-to-top and right-to-left (used in the explanation below).
//  - Or reverse the order: Bottom-to-top and right-to-left followed by top-to-bottom and left-to-right.
function highestPeak2(isWater: number[][]): number[][] {
  const R = isWater.length;
  const C = isWater[0].length;
  const height = Array.from({ length: R }, () =>
    Array(C).fill(Number.MAX_VALUE),
  );

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (isWater[i][j]) height[i][j] = 0;
      else {
        if (i > 0) height[i][j] = Math.min(height[i][j], height[i - 1][j] + 1);
        if (j > 0) height[i][j] = Math.min(height[i][j], height[i][j - 1] + 1);
      }
    }
  }

  for (let i = R - 1; i >= 0; i--) {
    for (let j = C - 1; j >= 0; j--) {
      if (i < R - 1)
        height[i][j] = Math.min(height[i][j], height[i + 1][j] + 1);
      if (j < C - 1)
        height[i][j] = Math.min(height[i][j], height[i][j + 1] + 1);
    }
  }

  return height;
}
