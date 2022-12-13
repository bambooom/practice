// https://leetcode.com/problems/shortest-path-in-binary-matrix/
// #Breadth-first search
// Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.
// A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:
// - All the visited cells of the path are 0.
// - All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
// The length of a clear path is the number of visited cells of this path.

function shortestPathBinaryMatrix(grid: number[][]): number {
  const N = grid.length;
  if (N === 0 || grid[0][0] !== 0 || grid[N - 1][N - 1] !== 0) {
    return -1;
  }
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const queue = [[0, 0, 1]]; // [row, col, path]
  while (queue.length) {
    const [row, col, path] = queue.shift() as number[];

    if (row === N - 1 && col === N - 1) return path; // reached destination

    for (const [dx, dy] of directions) {
      // traverse adjacents
      const x = row + dx;
      const y = col + dy;

      // if invalid, continue
      if (x < 0 || x >= N) continue;
      if (y < 0 || y >= N) continue;
      if (grid[x][y] !== 0) continue;

      queue.push([x, y, path + 1]); // add new path to queue
      grid[x][y] = 1; // mark visited
    }
  }

  return -1;
}
