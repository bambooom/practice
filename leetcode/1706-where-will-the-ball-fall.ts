// https://leetcode.com/problems/where-will-the-ball-fall/
// #dynamic-programming #depth-first-search #matrix #simuilation

// https://leetcode.com/problems/where-will-the-ball-fall/solutions/2764944/javascript-easy-to-understand-solution/

function findBall(grid: number[][]): number[] {
  const balls = grid[0].length;
  const ans = new Array(balls).fill(-1);
  for (let i = 0; i < ans.length; i++) {
    ans[i] = dfs(grid, 0, i);
  }
  return ans;
}

function dfs(grid: number[][], r: number, c: number): number {
  // is stuck in a V
  if (
    (grid[r][c] === 1 && grid[r][c + 1] === -1) ||
    (grid[r][c] === -1 && grid[r][c - 1] === 1)
  ) {
    return -1;
  }

  // is stuck on left wall
  if (grid[r][c] === -1 && c - 1 < 0) {
    return -1;
  }
  // is stuck on right wall
  if (grid[r][c] === 1 && c + 1 >= grid[0].length) {
    return -1;
  }

  // when ball drops to bottom :)
  if (r === grid.length - 1) {
    // drops to right
    if (grid[r][c] === 1) return c + 1;
    // drops to left
    return c - 1;
  }

  // dfs right
  if (grid[r][c] === 1) {
    return dfs(grid, r + 1, c + 1);
  }
  //  dfs left
  return dfs(grid, r + 1, c - 1);
}

// https://leetcode.com/problems/where-will-the-ball-fall/solutions/1004545/javascript-simple-solution-w-explanation-beats-100-82/
