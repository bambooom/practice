// https://leetcode.com/problems/walls-and-gates/
// You are given an m x n grid rooms initialized with these three possible values.
// -1 is A wall or an obstacle. 0 is A gate.
// INF Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
// Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

// Exampl1:
// Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
// Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

/**
 Do not return anything, modify rooms in-place instead.
 */
// BFS: https://leetcode.com/problems/walls-and-gates/solutions/5315153/typescript-bfs/?envType=study-plan-v2&envId=premium-algo-100
function wallsAndGates(rooms: number[][]): void {
  const rows = rooms.length;
  const cols = rooms[0].length;

  const getNeighbors = (
    row: number,
    col: number,
    rows: number,
    cols: number,
  ): number[][] => {
    const res: number[][] = [];

    if (row > 0) res.push([row - 1, col]);
    if (row < rows - 1) res.push([row + 1, col]);
    if (col > 0) res.push([row, col - 1]);
    if (col < cols - 1) res.push([row, col + 1]);

    return res;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // BFS from each gate
      if (rooms[r][c] === 0) {
        // we need to track what's seen on a per-BFS basis
        const seen = new Set<string>();
        const queue = new Array<[[number, number], number]>([[r, c], 0]);
        while (queue.length) {
          const [[row, col], distance] = queue.shift()!;
          // enqueue all neighbors and mark as seen before updateing this
          getNeighbors(row, col, rows, cols).map(([row, col]) => {
            if (
              !seen.has(`${row}_${col}`) &&
              rooms[row][col] !== -1 &&
              rooms[row][col] !== 0 // means is empty
            ) {
              queue.push([[row, col], distance + 1]);
              seen.add(`${row}_${col}`);
            }
          });
          if (rooms[row][col] !== 0 && rooms[row][col] !== -1) {
            rooms[row][col] = Math.min(rooms[row][col], distance); // update min distance
          }
        }
      }
    }
  }
}
