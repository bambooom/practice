// https://leetcode.com/problems/pacific-atlantic-water-flow/
// depth-first-search

// There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
// The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
// The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
// Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

// Example 1:
// Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
// Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
// Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
// [0,4]: [0,4] -> Pacific Ocean
//        [0,4] -> Atlantic Ocean
// [1,3]: [1,3] -> [0,3] -> Pacific Ocean
//        [1,3] -> [1,4] -> Atlantic Ocean
// [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean
//        [1,4] -> Atlantic Ocean
// [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean
//        [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
// [3,0]: [3,0] -> Pacific Ocean
//        [3,0] -> [4,0] -> Atlantic Ocean
// [3,1]: [3,1] -> [3,0] -> Pacific Ocean
//        [3,1] -> [4,1] -> Atlantic Ocean
// [4,0]: [4,0] -> Pacific Ocean
//        [4,0] -> Atlantic Ocean
// Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.

// Example 2:
// Input: heights = [[1]]
// Output: [[0,0]]
// Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.

// Constraints:
// m == heights.length
// n == heights[r].length
// 1 <= m, n <= 200
// 0 <= heights[r][c] <= 10^5

// https://leetcode.com/problems/pacific-atlantic-water-flow/solutions/1018375/explanation-dfs/

/*

basic idea -->
populate cells reached from atlantic and cells reached from pacific with dfs
loop through matrix
add coords to return array if they exist in both the atlantic matrix and the pacific matrix
return result

dfs -->
1. base - return if out of bounds
2. base - return if our previous spot was larger because we are only marking spot as true
if it is larger than prev (prev) **this is tricky, we aren't checking if the water is
able to flow to this spot from a previous spot...instead we are checking if water can flow out FROM this spot
TO the "prev" spot, so really prev is kind of a confusing name, because it represents the next spot that water could flow to
2. base - if the spot is already marked as true we can just return, because it means that water from this spot can already reach ocean
3. if we've reached this point it means that our flow has not yet been interrupted from our starting point
so we CAN reach our ocean (pacific or atlantic) from the current spot, so we simply mark that in our ocean i.e. ocean[i][j] = true
4. call dfs recursively on all 4 surrounding spots

*/
function pacificAtlantic(matrix: number[][]): number[][] {
  if (matrix.length === 0) return [];
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Initialize arrays to track the cells that can flow to the Pacific and Atlantic oceans
  const atlantic: number[][] = [];
  const pacific: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    atlantic.push(new Array(numCols).fill(0));
    pacific.push(new Array(numCols).fill(0));
  }

  // Helper function to perform a depth-first search starting from a given cell
  const dfs = (
    matrix: number[][],
    i: number,
    j: number,
    prev: number,
    ocean: number[][],
  ) => {
    //checkOutOfBounds
    if (i < 0 || i > matrix.length - 1 || j < 0 || j > matrix[i].length - 1)
      return;

    // Check if the value of the current cell is less than the previous cell value
    if (matrix[i][j] < prev) return;
    // Check if the current cell has already been visited in the given ocean
    if (ocean[i][j]) return;
    // Mark the current cell as visited in the given ocean
    ocean[i][j] = 1;

    // Recursively call dfs on the neighboring cells
    dfs(matrix, i + 1, j, matrix[i][j], ocean);
    dfs(matrix, i - 1, j, matrix[i][j], ocean);
    dfs(matrix, i, j + 1, matrix[i][j], ocean);
    dfs(matrix, i, j - 1, matrix[i][j], ocean);
  };

  // Perform DFS on the top, bottom, left, and right edges of the matrix
  for (let col = 0; col < matrix[0].length; col++) {
    dfs(matrix, 0, col, Number.MIN_SAFE_INTEGER, pacific);
    dfs(matrix, numRows - 1, col, Number.MIN_SAFE_INTEGER, atlantic);
  }

  for (let row = 0; row < matrix.length; row++) {
    dfs(matrix, row, 0, Number.MIN_SAFE_INTEGER, pacific);
    dfs(matrix, row, numCols - 1, Number.MIN_SAFE_INTEGER, atlantic);
  }

  // Find the cells that can flow to both the Pacific and Atlantic oceans
  const res: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (atlantic[i][j] && pacific[i][j]) {
        res.push([i, j]);
      }
    }
  }
  return res;
}
