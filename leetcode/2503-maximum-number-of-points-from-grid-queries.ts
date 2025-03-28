// https://leetcode.com/problems/maximum-number-of-points-from-grid-queries
// You are given an m x n integer matrix grid and an array queries of size k.
// Find an array answer of size k such that for each integer queries[i] you start in the top left cell of the matrix and repeat the following process:
// If queries[i] is strictly greater than the value of the current cell that you are in, then you get one point if it is your first time visiting this cell, and you can move to any adjacent cell in all 4 directions: up, down, left, and right.
// Otherwise, you do not get any points, and you end this process.
// After the process, answer[i] is the maximum number of points you can get. Note that for each query you are allowed to visit the same cell multiple times.
// Return the resulting array answer.

// Example 1:
// Input: grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
// Output: [5,8,1]
// Explanation: The diagrams above show which cells we visit to get points for each query.

// Example 2:
// Input: grid = [[5,2,1],[1,1,2]], queries = [3]
// Output: [0]
// Explanation: We can not get any points because the value of the top left cell is already greater than or equal to 3.

// https://leetcode.com/problems/maximum-number-of-points-from-grid-queries/solutions/6587833/typescript-approach-using-disjoint-o-mnlog-mn-klogk-time/?envType=daily-question&envId=2025-03-28
// The main idea is to recognize that for a given query value q, you can only traverse cells whose value is strictly less than q. Since you start at the top‐left cell (0,0), the maximum number of points you can earn is exactly the number of unique cells reachable from (0,0) using 4‑directional moves while staying within cells having values < q.
// A direct BFS for every query would be too slow when there are many queries. Instead, we can process the grid cells in increasing order of their value and build the reachable region incrementally using a union–find (DSU) structure.
// Then, if we process the queries in sorted order, we can “add” all cells with value < q (by merging with already‐added neighboring cells) and quickly answer: if (0,0) has been added, the answer is the size of its connected component; otherwise, it’s 0.

// Disjoint Set Union
class DSU {
  parent: number[];
  size: number[];

  constructor(n: number) {
    this.parent = new Array(n);
    this.size = new Array(n);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): void {
    let rootA = this.find(x);
    let rootB = this.find(y);
    if (rootA === rootB) {
      return;
    }
    if (this.size[rootA] < this.size[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }
    this.parent[rootB] = rootA;
    this.size[rootA] += this.size[rootB];
  }
}

function maxPoints(grid: number[][], queries: number[]): number[] {
  const m = grid.length;
  const n = grid[0].length;
  const totalCells = m * n;

  // create a list of cells with their values and coordinates
  const cells: { val: number; r: number; c: number }[] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      cells.push({ val: grid[i][j], r: i, c: j });
    }
  }
  // Sort this list in ascending order by the cell value.
  cells.sort((a, b) => a.val - b.val);

  // sort the queries in ascending order
  const queryArr = queries.map((q, idx) => ({ q, idx }));
  queryArr.sort((a, b) => a.q - b.q);

  // initialize the DSU structure
  const dsu = new DSU(totalCells);
  // keep track of added cells, marks if a cell is actived (i.e., its value is < current query)
  const added = new Array(totalCells).fill(false);
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const ans = new Array(queries.length).fill(0);
  let pointer = 0;

  // For each sorted query, add all cells (from the sorted list) with value < q.
  for (const { q, idx } of queryArr) {
    while (pointer < cells.length && cells[pointer].val < q) {
      const { r, c } = cells[pointer];
      const cellIndex = r * n + c;
      added[cellIndex] = true;

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        const nIndex = nr * n + nc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && added[nIndex]) {
          // For each newly added cell, union it with any already added neighbors (up, down, left, right).
          dsu.union(cellIndex, nIndex);
        }
      }
      pointer++;
    }
    // if (0,0) is added, the answer for that query is the size of the connected component containing (0,0). Otherwise, the answer is 0.
    if (added[0]) {
      const root0 = dsu.find(0);
      ans[idx] = dsu.size[root0];
    } else {
      ans[idx] = 0;
    }
  }

  return ans;
}
