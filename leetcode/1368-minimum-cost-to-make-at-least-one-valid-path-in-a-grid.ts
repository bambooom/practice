//https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/description/
// Given an m x n grid. Each cell of the grid has a sign pointing to the next cell you should visit if you are currently in this cell. The sign of grid[i][j] can be:

// 1 which means go to the cell to the right. (i.e go from grid[i][j] to grid[i][j + 1])
// 2 which means go to the cell to the left. (i.e go from grid[i][j] to grid[i][j - 1])
// 3 which means go to the lower cell. (i.e go from grid[i][j] to grid[i + 1][j])
// 4 which means go to the upper cell. (i.e go from grid[i][j] to grid[i - 1][j])
// Notice that there could be some signs on the cells of the grid that point outside the grid.

// You will initially start at the upper left cell (0, 0). A valid path in the grid is a path that starts from the upper left cell (0, 0) and ends at the bottom-right cell (m - 1, n - 1) following the signs on the grid. The valid path does not have to be the shortest.
// You can modify the sign on a cell with cost = 1. You can modify the sign on a cell one time only.
// Return the minimum cost to make the grid have at least one valid path.

// Example1:
// Input: grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
// Output: 3
// Explanation: You will start at point (0, 0).
// The path to (3, 3) is as follows. (0, 0) --> (0, 1) --> (0, 2) --> (0, 3) change the arrow to down with cost = 1 --> (1, 3) --> (1, 2) --> (1, 1) --> (1, 0) change the arrow to down with cost = 1 --> (2, 0) --> (2, 1) --> (2, 2) --> (2, 3) change the arrow to down with cost = 1 --> (3, 3)
// The total cost = 3.

// https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/solutions/6296562/simple-bfs/
// BFS
function minCostValidPath(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const graph = Array.from({ length: m * n }, () => new Map<number, number>());

  // Initialize graph
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const cur = i * n + j;
      let up, down, left, right;
      if (i > 0) {
        up = (i - 1) * n + j;
        graph[cur].set(up, grid[i][j] !== 4 ? 1 : 0);
      }
      if (i < m - 1) {
        down = (i + 1) * n + j;
        graph[cur].set(down, grid[i][j] !== 3 ? 1 : 0);
      }
      if (j > 0) {
        left = i * n + j - 1;
        graph[cur].set(left, grid[i][j] !== 2 ? 1 : 0);
      }
      if (j < n - 1) {
        right = i * n + j + 1;
        graph[cur].set(right, grid[i][j] !== 1 ? 1 : 0);
      }
    }
  }

  // Using BFS to calculate the minimum distance
  const queue = [{ node: 0, weight: 0 }];
  const distance: number[] = new Array(m * n).fill(Infinity);
  distance[0] = 0;

  while (queue.length) {
    const { node, weight } = queue.shift()!;

    for (const [key, value] of graph[node]) {
      const newWeight = weight + value;

      if (distance[key] > newWeight) {
        distance[key] = newWeight;
        queue.push({ node: key, weight: newWeight });
      }
    }
  }

  return distance[distance.length - 1];
}

// https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/solutions/6298588/solution-with-explanation-beats-90-100-in-both-time-and-space/
// 详细解释
const DIRECTIONS = [
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
];

function minCostValidPath2(grid: number[][]): number {
  // Store the number of rows and columns
  const m = grid.length; // Number of rows
  const n = grid[0].length; // Number of columns

  // Create a 2D array to store the cost of reaching each cell
  const cost: number[][] = Array.from({ length: m }, () =>
    Array(n).fill(Infinity),
  );
  // Set the cost of reaching the starting cell to 0 as it the starting point
  cost[0][0] = 0;

  // Initialize the deque with the starting
  const deque: { x: number; y: number; c: number }[] = [];
  // Add the starting cell to the deque
  deque.push({ x: 0, y: 0, c: 0 });

  while (deque.length > 0) {
    const { x, y, c } = deque.shift()!;

    for (let i = 0; i < 4; i++) {
      const { dx, dy } = DIRECTIONS[i];
      // The nearby cell
      const nx = x + dx;
      const ny = y + dy;

      // We skip the cell if it is out of bounds
      if (nx < 0 || nx >= m || ny < 0 || ny >= n) {
        continue;
      }

      // Calculate the cost of reaching the nearby cell
      // The cost to reach this cell is the cost of current cell + 1 if we need to modify the sign otherwise it is 0
      const newCost = c + (grid[x][y] === i + 1 ? 0 : 1);

      // Skip the cell if the cost to reach this cell is greater than the cost we have already calculated
      if (newCost >= cost[nx][ny]) {
        continue;
      }

      // Update the cost of reaching the nearby cell
      cost[nx][ny] = newCost;

      // If the sign of the cell is the same as the direction we are moving,
      // we add the cell to the front of the deque
      // Because we want to explore the cells with lower cost first
      if (grid[x][y] === i + 1) {
        deque.unshift({ x: nx, y: ny, c: newCost });
      } else {
        deque.push({ x: nx, y: ny, c: newCost });
      }
    }
  }

  // Return the cost of reaching the last cell
  return cost[m - 1][n - 1];
}
