// https://leetcode.cn/problems/number-of-islands/
// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
// You may assume all four edges of the grid are all surrounded by water.

// #dfs

function numIslands(grid: string[][]): number {
  let count = 0;

  function explore(i: number, j: number): void {
    if (
      i < 0 ||
      j < 0 ||
      i >= grid.length ||
      j >= grid[i].length ||
      grid[i][j] === '0'
    ) {
      return;
    }

    grid[i][j] = '0';

    explore(i + 1, j); // down
    explore(i - 1, j); // up
    explore(i, j + 1); // right
    explore(i, j - 1); // left
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        explore(i, j);
      }
    }
  }

  return count;
}
