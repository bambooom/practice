// https://leetcode.com/problems/count-sub-islands
// You are given two m x n binary matrices grid1 and grid2 containing only 0's (representing water) and 1's (representing land). An island is a group of 1's connected 4-directionally (horizontal or vertical). Any cells outside of the grid are considered water cells.
// An island in grid2 is considered a sub-island if there is an island in grid1 that contains all the cells that make up this island in grid2.
// Return the number of islands in grid2 that are considered sub-islands.

// https://leetcode.com/problems/count-sub-islands/solutions/5700260/easy-dfs/
// DFS
function countSubIslands(grid1: number[][], grid2: number[][]): number {
  const ROWS = grid2.length;
  const COLS = grid2[0].length;

  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const visited: boolean[][] = Array.from({ length: ROWS }, () => Array(COLS));

  const dfs = (
    row: number,
    col: number,
    areas: [number, number][],
  ): [number, number][] => {
    if (grid2[row][col] !== 1) {
      return areas;
    }

    if (visited[row][col]) {
      return areas;
    }
    visited[row][col] = true;
    areas.push([row, col]);

    for (const [dy, dx] of DIRECTIONS) {
      const newRow = row + dy;
      const newCol = col + dx;
      if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
        areas = dfs(newRow, newCol, areas);
      }
    }

    return areas;
  };

  const isSubIsland = (areas: [number, number][]): boolean => {
    for (const [row, col] of areas) {
      if (grid1[row][col] !== 1) {
        return false;
      }
    }
    return true;
  };

  let subIsland = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const areas: [number, number][] = dfs(row, col, []);
      if (areas.length === 0) continue;
      subIsland += isSubIsland(areas) ? 1 : 0;
    }
  }
  return subIsland;
}

// https://leetcode.com/problems/count-sub-islands/solutions/5700166/flood-fill-time-o-mn-space-o-mn/
// faster and less memory
function countSubIslands2(grid1: number[][], grid2: number[][]): number {
  const DIRS = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  const LAND = 1;
  const WATER = 0;

  const Y = grid1.length;
  const X = grid1[0].length;

  // starts at the coordinates (y, x) and checks all adjacent cells in the four directions (up, down, left, right). If the value of the adjacent cell is the same as the original value (startVal), it pushes the coordinates of the adjacent cell onto a stack and continues the search. The function returns a boolean value indicating whether the filled area is a sub-island or not.
  function fill(
    grid1: number[][],
    grid2: number[][],
    y: number,
    x: number,
    val: number,
  ): boolean {
    const Y = grid2.length;
    const X = grid2[0].length;
    const startVal = grid2[y][x];
    const stack = [[y, x]];

    grid2[y][x] = val;
    let isSub = true;
    do {
      [y, x] = stack.pop()!;
      isSub &&= grid1[y][x] == startVal;
      for (const [dy, dx] of DIRS) {
        const y2 = y + dy;
        const x2 = x + dx;
        if (
          y2 >= 0 &&
          y2 < Y &&
          x2 >= 0 &&
          x2 < X &&
          grid2[y2][x2] == startVal
        ) {
          grid2[y2][x2] = val;
          stack.push([y2, x2]);
        }
      }
    } while (stack.length > 0);

    return isSub;
  }

  let numSubs = 0;
  for (let y = 0; y < Y; ++y) {
    for (let x = 0; x < X; ++x) {
      numSubs += +(grid2[y][x] === LAND && fill(grid1, grid2, y, x, WATER));
    }
  }

  return numSubs;
}
