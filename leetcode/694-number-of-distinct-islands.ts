// https://leetcode.com/problems/number-of-distinct-islands
// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.)
// You may assume all four edges of the grid are surrounded by water.
// An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.
// Return the number of distinct islands.

// https://leetcode.com/problems/number-of-distinct-islands/solutions/5118091/bfs-while-storing-distinct-coordinates-for-island-in-a-hash/?envType=study-plan-v2&envId=premium-algo-100

function numDistinctIslands(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited: Set<string> = new Set();
  const islands: Set<string> = new Set();

  const bfs = (row: number, col: number): void => {
    const queue: number[][] = [[row, col, 0, 0]];
    const distincCoordinates: number[][] = [];
    visited.add(`${row},${col}`);

    while (queue.length > 0) {
      const [row, col, distinctRow, distinctCol]: number[] = queue.shift()!;
      distincCoordinates.push([distinctRow, distinctCol]);

      // check above
      if (
        row - 1 >= 0 &&
        !visited.has(`${row - 1},${col}`) &&
        grid[row - 1][col] === 1
      ) {
        visited.add(`${row - 1},${col}`);
        queue.push([row - 1, col, distinctRow - 1, distinctCol]);
      }
      // check below
      if (
        row + 1 < rows &&
        !visited.has(`${row + 1},${col}`) &&
        grid[row + 1][col] === 1
      ) {
        visited.add(`${row + 1},${col}`);
        queue.push([row + 1, col, distinctRow + 1, distinctCol]);
      }
      // check left
      if (
        col - 1 >= 0 &&
        !visited.has(`${row},${col - 1}`) &&
        grid[row][col - 1] === 1
      ) {
        visited.add(`${row},${col - 1}`);
        queue.push([row, col - 1, distinctRow, distinctCol - 1]);
      }
      // check right
      if (
        col + 1 < cols &&
        !visited.has(`${row},${col + 1}`) &&
        grid[row][col + 1] === 1
      ) {
        visited.add(`${row},${col + 1}`);
        queue.push([row, col + 1, distinctRow, distinctCol + 1]);
      }
    }
    const entry = distincCoordinates.sort((a, b) => a[0] - b[0]).toString();
    islands.add(entry);
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1 && !visited.has(`${row},${col}`)) {
        bfs(row, col);
      }
    }
  }
  return islands.size;
}
