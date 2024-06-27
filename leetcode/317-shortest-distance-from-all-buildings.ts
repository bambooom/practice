// https://leetcode.com/problems/shortest-distance-from-all-buildings
// You are given an m x n grid grid of values 0, 1, or 2, where:
// - each 0 marks an empty land that you can pass by freely,
// - each 1 marks a building that you cannot pass through, and
// - each 2 marks an obstacle that you cannot pass through.
// You want to build a house on an empty land that reaches all buildings in the shortest total travel distance. You can only move up, down, left, and right.

// Return the shortest travel distance for such a house. If it is not possible to build such a house according to the above rules, return -1.
// The total travel distance is the sum of the distances between the houses of the friends and the meeting point.
// The distance is calculated using Manhattan Distance, where distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.

// Example1:
// Input: grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]
// Output: 7
// Explanation: Given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2).
// The point (1,2) is an ideal empty land to build a house, as the total travel distance of 3+3+1=7 is minimal.
// So return 7.

// https://leetcode.com/problems/shortest-distance-from-all-buildings/solutions/4695276/clean-solution/?envType=study-plan-v2&envId=premium-algo-100
function shortestDistanceFromAllBuildings(grid: number[][]): number {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const m = grid.length;
  const n = grid[0].length;
  const total: number[][] = new Array(m).fill(0).map(() => {
    return new Array(n).fill(0);
  });

  const isInbound = (row: number, col: number): boolean => {
    return row >= 0 && row < m && col >= 0 && col < n;
  };

  let min = Number.MAX_VALUE;

  const bfs = (
    row: number,
    col: number,
    grid: number[][],
    reachVal: number, // 负数，来标记已经 reach 到的值的个数
  ) => {
    min = Number.MAX_VALUE;
    const queue: number[][] = [[row, col]]; // start point
    let steps = 0;
    while (queue.length > 0) {
      steps++;
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const [pRow, pCol] = queue.shift()!;
        for (const dir of directions) {
          const [nRow, nCol] = [pRow + dir[0], pCol + dir[1]];
          if (isInbound(nRow, nCol) && grid[nRow][nCol] === reachVal) {
            grid[nRow][nCol] = reachVal - 1;
            total[nRow][nCol] += steps;
            queue.push([nRow, nCol]);
            min = Math.min(min, total[nRow][nCol]); // 更新最小的total steps
          }
        }
      }
    }
  };

  let k = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        bfs(i, j, grid, k--);
      }
    }
  }

  return min === Number.MAX_VALUE ? -1 : min;
}
