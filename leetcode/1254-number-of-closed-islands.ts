// https://leetcode.com/problems/number-of-closed-islands/
// #depth-first search
// Given a 2D grid consists of 0s (land) and 1s (water).
// An island is a maximal 4-directionally connected group of 0s and
// a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

// Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
// Output: 2
// Explanation: Islands in gray are closed because they are completely surrounded by water (group of 1s).

function closedIsland(grid: number[][]): number {
  let count = 0;
  const row = grid.length;
  const col = grid[0].length;

  function dfs_helper(i: number, j: number): boolean {
    if (i < 0 || j < 0 || i >= row || j >= col) return false;
    if (grid[i][j]) return true;
    grid[i][j] = 1;

    const top = dfs_helper(i - 1, j);
    const bottom = dfs_helper(i + 1, j);
    const left = dfs_helper(i, j - 1);
    const right = dfs_helper(i, j + 1);
    return top && bottom && left && right;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === 0) {
        if (dfs_helper(i, j)) count++;
      }
    }
  }

  return count;
}
