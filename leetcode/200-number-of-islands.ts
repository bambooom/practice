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

// https://leetcode.com/problems/number-of-islands/solutions/3106855/typescript-solution-using-a-queue/?envType=study-plan-v2&envId=top-100-liked
// queue

function numIslandsTwo(grid: string[][]): number {
  const h = grid.length;
  const w = grid[0].length;

  let islands = 0;
  const queue: [number, number][] = [];

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const exploring = grid[i][j];

      if (exploring === '1') {
        islands++;
        queue.unshift([i, j]);

        while (queue.length) {
          const [x, y] = queue.pop()!;

          if (y < 0 || x < 0 || x >= h || y >= w) {
            continue;
          }

          if (grid[x][y] === '1') {
            grid[x][y] = '0';

            queue.unshift([x - 1, y]);
            queue.unshift([x, y + 1]);
            queue.unshift([x + 1, y]);
            queue.unshift([x, y - 1]);
          }
        }
      }
    }
  }

  return islands;
}
