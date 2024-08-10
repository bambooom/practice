// https://leetcode.com/problems/regions-cut-by-slashes
// An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a '/', '\', or blank space ' '. These characters divide the square into contiguous regions.
// Given the grid grid represented as a string array, return the number of regions.
// Note that backslash characters are escaped, so a '\' is represented as '\\'.

// Example1:
// Input: grid = [" /","/ "]
// Output: 2

// https://leetcode.com/problems/regions-cut-by-slashes/solutions/5614775/dfs-on-matrix/?envType=daily-question&envId=2024-08-10
// Convert the grid to matrix, then run DFS to find how many regions there are
// create matrix of size grid.length * 3
// fill 1s and 0s to the matrix
// run DFS to find the number of island

function regionsBySlashes(grid: string[]): number {
  const matrix = Array.from({ length: grid.length * 3 }, () =>
    Array(grid[0].length * 3),
  );

  const mapChar: Record<string, number[][]> = {
    ' ': [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    '/': [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
    ],
    '\\': [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const seq = mapChar[grid[i][j]];

      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          matrix[i * 3 + k][j * 3 + l] = seq[k][l];
        }
      }
    }
  }

  let count = 0;
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const dfs = (i: number, j: number): boolean => {
    if (matrix[i][j] !== 0) {
      return false;
    }

    matrix[i][j] = -1;

    for (const [dy, dx] of DIRECTIONS) {
      const newRow = i + dy;
      const newCol = j + dx;
      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow === matrix.length ||
        newCol === matrix[0].length ||
        matrix[newRow][newCol] !== 0
      ) {
        continue;
      }

      dfs(newRow, newCol);
    }

    return true;
  };

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (dfs(i, j)) {
        count++;
      }
    }
  }

  return count;
}

// https://leetcode.com/problems/regions-cut-by-slashes/solutions/5616428/100-with-three-java-javascript-typescript-simple-solution-easy-explanation/?envType=daily-question&envId=2024-08-10
function regionsBySlashes2(grid: string[]): number {
  const n = grid.length;
  const nn = n + 1;
  let count = 0;
  const parent: number[] = Array.from({ length: nn * nn }, (_, i) => i);

  function find(node: number): number {
    if (node !== parent[node]) {
      parent[node] = find(parent[node]); // Path compression
    }
    return parent[node];
  }

  function union(n1: number, n2: number): void {
    const root1 = find(n1);
    const root2 = find(n2);

    if (root1 !== root2) {
      parent[root2] = root1; // Union
    } else {
      count++; // A new region is found
    }
  }

  // Connect boundary nodes to a virtual node (0)
  for (let i = 0; i < nn; i++) {
    for (let j = 0; j < nn; j++) {
      if (i === 0 || j === 0 || i === n || j === n) {
        union(0, i * nn + j);
      }
    }
  }

  // Process the grid
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '/') {
        union((i + 1) * nn + j, i * nn + (j + 1));
      } else if (grid[i][j] === '\\') {
        union(i * nn + j, (i + 1) * nn + (j + 1));
      }
    }
  }

  return count;
}
