// https://leetcode.com/problems/last-day-where-you-can-still-cross/
// There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing the number of rows and columns in the matrix, respectively.
// Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells, where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered with water (i.e., changed to 1).
// You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells. You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the four cardinal directions (left, right, up, and down).
// Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.

// Example 1:
// Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
// Output: 2
// Explanation: The above image depicts how the matrix changes each day starting from day 0.
// The last day where it is possible to cross from top to bottom is on day 2.

// Example 2:
// Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
// Output: 1
// Explanation: The above image depicts how the matrix changes each day starting from day 0.
// The last day where it is possible to cross from top to bottom is on day 1.

// Example 3:
// Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
// Output: 3
// Explanation: The above image depicts how the matrix changes each day starting from day 0.
// The last day where it is possible to cross from top to bottom is on day 3.

// Constraints:
// 2 <= row, col <= 2 * 10^4
// 4 <= row * col <= 2 * 10^4
// cells.length == row * col
// 1 <= ri <= row
// 1 <= ci <= col
// All the values of cells are unique.

// https://leetcode.com/problems/last-day-where-you-can-still-cross/solutions/7452044/all-language-solution-c-java-python-rust-m1pt/?envType=daily-question&envId=2025-12-31
function latestDayToCross(row: number, col: number, cells: number[][]): number {
  const n = row * col;
  // Set the top and bottom as representatives of their own sets.
  const top = n;
  const bottom = n + 1;

  // for disjoint set data structure
  const parent: number[] = Array.from({ length: n + 2 }, (_, i) => i);
  const rank: number[] = Array(n + 2).fill(0);
  // Initialize the grid to store whether a cell is covered with water or not.
  const grid: boolean[][] = Array.from({ length: row }, () =>
    Array(col).fill(false),
  );

  // Finds the representative element of a set in the disjoint set data structure.
  const find = (x: number): number => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  // Merges two sets in the disjoint set data structure.
  const union = (a: number, b: number): void => {
    a = find(a);
    b = find(b);
    if (a === b) {
      return;
    }
    if (rank[a] < rank[b]) {
      parent[a] = b;
    } else {
      parent[b] = a;
      if (rank[a] === rank[b]) {
        rank[a]++;
      }
    }
  };

  // directions to check for neighboring cells
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];

  // Iterate over the cells array in reverse order
  for (let d = n - 1; d >= 0; d--) {
    // Get the row and column of the current cell.
    const r = cells[d][0] - 1;
    const c = cells[d][1] - 1;
    grid[r][c] = true; // Mark the current cell as covered with water.
    const id = r * col + c; // Calculate the ID of the current cell.

    // Perform union operations with the top and bottom sets if necessary.
    if (r === 0) {
      union(id, top);
    }
    if (r === row - 1) {
      union(id, bottom);
    }

    // Check neighboring cells and perform union operations if necessary.
    for (let k = 0; k < 4; k++) {
      const nr = r + dr[k];
      const nc = c + dc[k];
      // if the neighboring cell is within the grid and is covered with water
      if (nr >= 0 && nr < row && nc >= 0 && nc < col && grid[nr][nc]) {
        union(id, nr * col + nc);
      }
    }

    // Check if the representative element of the top set is the same as the representative element of the bottom set.
    if (find(top) === find(bottom)) {
      return d;
    }
  }

  // If no such day is found, return 0.
  return 0;
}
