// https://leetcode.com/problems/search-a-2d-matrix-ii/

// binary search
function searchMatrix(matrix: number[][], target: number): boolean {
  if (!matrix || !matrix.length) return false;

  const rows = matrix.length;
  const cols = matrix[0].length;

  function hasTarget(
    startRow: number,
    endRow: number,
    startCol: number,
    endCol: number,
  ): boolean {
    // recursion base case
    if (startRow > endRow || startCol > endCol) return false;

    // find middle of the matrix
    const middleRow = Math.floor((endRow - startRow) / 2) + startRow;
    const middleCol = Math.floor((endCol - startCol) / 2) + startCol;

    // if we found the target we solve the problem, so return true
    if (matrix[middleRow][middleCol] === target) return true;

    // it is the "devide" step, basically, we define the recurrence relation for the recursion function.
    if (matrix[middleRow][middleCol] < target) {
      // let m - is our middle point.
      // if m less than the target than all points before m also less tha target (marked by x)
      // so we only need look through cells marked by 1 and 2
      // x x x 2 2
      // x x x 2 2
      // x x m 2 2
      // 1 1 1 1 1
      // 1 1 1 1 1
      return (
        hasTarget(middleRow + 1, endRow, startCol, endCol) ||
        hasTarget(startRow, middleRow, middleCol + 1, endCol)
      );
    } else {
      // let m - is our middle point.
      // if m more than the target than all points after m also bigger than the target (marked by x)
      // so we only need look through cells marked by 1 and 2
      // 1 1 2 2 2
      // 1 1 2 2 2
      // 1 1 m x x
      // 1 1 x x x
      // 1 1 x x x
      return (
        hasTarget(startRow, endRow, startCol, middleCol - 1) ||
        hasTarget(startRow, middleRow - 1, middleCol, endCol)
      );
    }
  }

  return hasTarget(0, rows - 1, 0, cols - 1);
}

// improved binary search
// since the matrix (M) is sorted both by row and by column,
// we can actually think of each cell(M[i][j]) as being a midpoint in a longer "row",
// including all the cells to the left as well as below the current cell.

// simulation: https://leetcode.com/problems/search-a-2d-matrix-ii/solutions/1080050/js-python-java-c-binary-search-solution-w-visual-explanation/

function searchMatrix2(matrix: number[][], target: number): boolean {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }
  const rows = matrix.length;
  // const cols = matrix[0].length;
  let row = 0,
    col = matrix[0].length - 1;
  while (row < rows && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    }
    if (matrix[row][col] < target) {
      row++;
    } else {
      col--;
    }
  }
  return false;
}
