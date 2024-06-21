// https://leetcode.com/problems/number-of-islands-ii
// You are given an empty 2D binary grid grid of size m x n. The grid represents a map where 0's represent water and 1's represent land. Initially, all the cells of grid are water cells (i.e., all the cells are 0's).
// We may perform an add land operation which turns the water at position into a land. You are given an array positions where positions[i] = [ri, ci] is the position (ri, ci) at which we should operate the ith operation.
// Return an array of integers answer where answer[i] is the number of islands after turning the cell (ri, ci) into a land.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example 1:
// Input: m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
// Output: [1,1,2,3]
// Explanation:
// Initially, the 2d grid is filled with water.
// - Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land. We have 1 island.
// - Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land. We still have 1 island.
// - Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land. We have 2 islands.
// - Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land. We have 3 islands.

// https://leetcode.com/problems/number-of-islands-ii/solutions/4236993/not-a-union-find-solution-passes-all-tests/?envType=study-plan-v2&envId=premium-algo-100
// Approach:
// - create m x n matrix
// - islandCount = 0;
// - walk through positions
// - get neighbors of position
//     if position surrounded by water
//         islandCount++
//         matrix[position] = islandCount
//     else get number of different land nodes
//         1 node type -> islandCount-=0
//         2 node type -> islandCount-=1
//         3 node type -> islandCount-=2 etc...
//         matrix[position] = islandCount
//         set other connected node types = islandCount
// - output[neighborPosition] = islandCount;
// - return positions;
function numIslands2(m: number, n: number, positions: number[][]): number[] {
  const grid: number[][] = Array.from({ length: m }, (_) =>
    Array.from({ length: n }, (_) => 0),
  );
  const output: number[] = [];
  let islandCount = 0;
  let islandLabel = 0;

  const neighborPositions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  for (let p = 0; p < positions.length; p++) {
    const [r1, c1] = positions[p];

    if (grid[r1][c1]) {
      output.push(islandCount);
      continue;
    }

    const neighborTypes = new Set();
    let neighborTypeCount = 0;
    let minNeighbor = Number.MAX_VALUE;
    for (let ni = 0; ni < neighborPositions.length; ni++) {
      const [dr, dc] = neighborPositions[ni];
      const [r2, c2] = [r1 + dr, c1 + dc];

      if (r2 < 0 || r2 >= m || c2 < 0 || c2 >= n) continue;

      const neighborValue = grid[r2][c2];
      if (neighborValue && !neighborTypes.has(neighborValue)) {
        neighborTypeCount++;
        neighborTypes.add(neighborValue);
        minNeighbor = Math.min(minNeighbor, neighborValue);
      }
    }

    if (neighborTypes.size === 0) {
      islandCount++;
      islandLabel++;
      grid[r1][c1] = islandLabel;
    } else {
      islandCount -= neighborTypes.size - 1;
      grid[r1][c1] = minNeighbor;
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          if (neighborTypes.has(grid[i][j])) {
            grid[i][j] = minNeighbor;
          }
        }
      }
    }

    output.push(islandCount);
  }

  return output;
}

// https://leetcode.com/problems/number-of-islands-ii/solutions/3094968/ez-solution-in-ts/?envType=study-plan-v2&envId=premium-algo-100
// union-find problem
// Instantiate a disjoint set and invoke the union function for new islands with neighbors. Then count the number of the forest roots pointing to islands:

class UF {
  public vertices: Array<number>;

  constructor(n: number) {
    this.vertices = Array.from({ length: n }, (_, i) => i);
  }

  union(x: number, y: number) {
    const p1 = this.find(x);
    const p2 = this.find(y);
    if (p1 !== p2) this.vertices[p1] = p2;
  }

  private find(x: number): number {
    const parent = this.vertices[x];
    return x === parent ? x : this.find(parent);
  }
}

function numIslands22(
  rows: number,
  cols: number,
  positions: number[][],
): number[] {
  const uf = new UF(rows * cols);
  const getVertexId = (col: number, row: number): number => col + row * cols;
  const surroundings = (col: number, row: number): number[] =>
    [
      [col - 1, row],
      [col, row - 1],
      [col + 1, row],
      [col, row + 1],
    ]
      .filter(([col, row]) => 0 <= col && col < cols && 0 <= row && row < rows)
      .map(([col, row]) => getVertexId(col, row));

  const islands = Array.from({ length: rows * cols }, () => false);

  return positions.map(([row, col]) => {
    const vx = getVertexId(col, row);
    islands[vx] = true;
    surroundings(col, row)
      .filter((id) => islands[id])
      .forEach((id) => uf.union(id, vx));
    return uf.vertices.filter((id, i) => id === i && islands[id]).length;
  });
}
