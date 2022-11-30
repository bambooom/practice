// https://leetcode.com/problems/01-matrix/solution/

// dynamic programming
// The distance of a cell from 0 can be calculated if we know the nearest distance for all the neighbors, in which case the distance is the minimum distance of any neighbor + 1. And, instantly, the words that come to mind are Dynamic Programming (DP)!!
// From each 1, the minimum path to 0 could be in any direction. So, we need to check all the 4 directions. In one iteration from top to bottom, we can check left and top directions, and we need another iteration from bottom to top to check for right and bottom directions.
// - iterate over the matrix from top to bottom-left to right
// - do the back iteration in the similar manner: from bottom to top-right to left
function updateMatrix(mat: number[][]): number[][] {
  const longestPath = mat.length + mat[0].length - 2;

  // first, iterate by top left to buttom right
  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      if (mat[row][col] === 0) continue;

      // compare for the min val of this node's top and left.
      mat[row][col] = Math.min(
        mat[row - 1] ? mat[row - 1][col] + 1 : longestPath, // top
        mat[row][col - 1] != undefined ? mat[row][col - 1] + 1 : longestPath,
      ); // left
    }
  }

  // secend, iterate by buttom right to top left
  for (let row = mat.length - 1; row >= 0; row--) {
    for (let col = mat[0].length - 1; col >= 0; col--) {
      if (mat[row][col] === 0) continue;

      // compare for the min val of this node and it buttom and right.
      mat[row][col] = Math.min(
        mat[row][col], // this node
        mat[row + 1] ? mat[row + 1][col] + 1 : longestPath, // buttom
        mat[row][col + 1] != undefined ? mat[row][col + 1] + 1 : longestPath,
      ); // right
    }
  }

  return mat;
}
