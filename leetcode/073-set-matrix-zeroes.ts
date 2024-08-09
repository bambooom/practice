// https://leetcode.com/problems/set-matrix-zeroes/

// Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
// You must do it in place.

// Algorithm
// 1. We iterate over the matrix and we mark the first cell of a row i and first cell of a column j, if the condition in the pseudo code above is satisfied. i.e. if cell[i][j] == 0.
// 2. The first cell of row and column for the first row and first column is the same i.e. cell[0][0]. Hence, we use an additional variable to tell us if the first column had been marked or not and the cell[0][0] would be used to tell the same for the first row.
// 3. Now, we iterate over the original matrix starting from second row and second column i.e. matrix[1][1] onwards. For every cell we check if the row r or column c had been marked earlier by checking the respective first row cell or first column cell. If any of them was marked, we set the value in the cell to 0. Note the first row and first column serve as the row_set and column_set that we used in the first approach.
// 4. We then check if cell[0][0] == 0, if this is the case, we mark the first row as zero.
// 5. And finally, we check if the first column was marked, we make all entries in it as zeros.

// https://leetcode.com/problems/set-matrix-zeroes/solutions/2794073/javascript-simple-99-faster-o-1-space/
// Time complexity: O(m*n)
// Space complexity: O(1)

function setZeroes(matrix: number[][]): void {
  const rowLength = matrix[0].length;
  const colLength = matrix.length;

  let hasRowZero = false;
  let hasColZero = false;

  // check if we have zero in first row
  for (let i = 0; i < rowLength; i++) {
    if (matrix[0][i] === 0) {
      hasRowZero = true;
      break;
    }
  }
  // check if we have zero in first col
  for (let i = 0; i < colLength; i++) {
    if (matrix[i][0] === 0) {
      hasColZero = true;
      break;
    }
  }

  // check from (1,1) to mark first row and first col to 0 if we have zero
  for (let r = 1; r < colLength; r++) {
    for (let c = 1; c < rowLength; c++) {
      if (matrix[r][c] === 0) {
        matrix[0][c] = 0;
        matrix[r][0] = 0;
      }
    }
  }

  // if first row has zero, update the col at this position to 0
  for (let i = 1; i < rowLength; i++) {
    if (matrix[0][i] === 0) {
      for (let r = 1; r < colLength; r++) {
        matrix[r][i] = 0;
      }
    }
  }

  // original first row has zero, then the first row should all be zero
  if (hasRowZero) {
    matrix[0].fill(0);
  }

  // if first col has zero, update the row at this position to 0
  for (let i = 0; i < colLength; i++) {
    if (matrix[i][0] === 0) {
      matrix[i].fill(0);
    }
    if (hasColZero) {
      matrix[i][0] = 0;
    }
  }
}

// https://leetcode.com/problems/set-matrix-zeroes/solutions/4245680/detailed-solution-in-python3-go-typescript-with-o-mn-time-and-o-1-space-complexity/?envType=study-plan-v2&envId=programming-skills
function setZeroes2(matrix: number[][]): void {
  // Get the dimensions of the matrix
  const rows = matrix.length;
  const cols = matrix[0].length;

  // set a flag thatg would indicate if the first row needs to be zero or not
  let rowZero = false;

  // determine which rows and cols need to be zeroes
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === 0) {
        // place marker on first row for the colomn
        matrix[0][col] = 0;

        // place marker on first column for the row, if it is not the first row in which case
        // we mark using the flag we set up already
        if (row > 0) {
          matrix[row][0] = 0;
        } else {
          rowZero = true;
        }
      }
    }
  }

  // convert all rows except first row and all columns except first column to zeroes
  // if they are marked as zero in first row and first column
  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }

  // handle the first column as the prev loop skipped it
  if (matrix[0][0] === 0) {
    for (let row = 0; row < rows; row++) {
      matrix[row][0] = 0;
    }
  }

  // handle the first row as the prev loop skipped it
  if (rowZero) {
    for (let col = 0; col < cols; col++) {
      matrix[0][col] = 0;
    }
  }
}
