// https://leetcode.com/problems/pacific-atlantic-water-flow/
// depth-first-search

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

  const atlantic: number[][] = [];
  const pacific: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    atlantic.push(new Array(numCols).fill(0));
    pacific.push(new Array(numCols).fill(0));
  }

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

    if (matrix[i][j] < prev) return;
    if (ocean[i][j]) return;
    ocean[i][j] = 1;

    dfs(matrix, i + 1, j, matrix[i][j], ocean);
    dfs(matrix, i - 1, j, matrix[i][j], ocean);
    dfs(matrix, i, j + 1, matrix[i][j], ocean);
    dfs(matrix, i, j - 1, matrix[i][j], ocean);
  };

  for (let col = 0; col < matrix[0].length; col++) {
    dfs(matrix, 0, col, Number.MIN_SAFE_INTEGER, pacific);
    dfs(matrix, numRows - 1, col, Number.MIN_SAFE_INTEGER, atlantic);
  }

  for (let row = 0; row < matrix.length; row++) {
    dfs(matrix, row, 0, Number.MIN_SAFE_INTEGER, pacific);
    dfs(matrix, row, numCols - 1, Number.MIN_SAFE_INTEGER, atlantic);
  }

  const res = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (atlantic[i][j] && pacific[i][j]) {
        res.push([i, j]);
      }
    }
  }
  return res;
}
