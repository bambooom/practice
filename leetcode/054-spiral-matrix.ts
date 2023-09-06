// https://leetcode.com/problems/spiral-matrix/
// Given an m x n matrix, return all elements of the matrix in spiral order.

// Given that we are at (row, col), where row is the row index, and col is the column index.
// move right: (row, col + 1)
// move downwards: (row + 1, col)
// move left: (row, col - 1)
// move upwards: (row - 1, col)

// Time Complexity: O(m*n)
// Space Complexity: O(1)
function spiralOrder(matrix: number[][]): number[] {
  if (matrix.length === 0) return [];
  const res: number[] = [];

  let row1 = 0;
  let col1 = 0;
  let row2 = matrix.length - 1;
  let col2 = matrix[0].length - 1;

  while (row1 <= row2 && col1 <= col2) {
    // upper line
    for (let col = col1; col <= col2; col++) {
      res.push(matrix[row1][col]);
    }
    // right line
    for (let row = row1 + 1; row <= row2; row++) {
      res.push(matrix[row][col2]);
    }
    if (row1 < row2 && col1 < col2) {
      // bottom line, reverse
      for (let col = col2 - 1; col >= col1; col--) {
        res.push(matrix[row2][col]);
      }
      // left line, reverse
      for (let row = row2 - 1; row > row1; row--) {
        res.push(matrix[row][col1]);
      }
    }

    row1++;
    col1++;
    row2--;
    col2--;
  }

  return res;
}

// Hashset solution: https://leetcode.com/problems/spiral-matrix/solutions/3397582/typescript-solution-hashset-o-m-n/?envType=study-plan-v2&envId=programming-skills
// Time Complexity: O(m*n)
// Space Complexity: O(m*n)

function spiralOrder2(matrix: number[][]): number[] {
  const ans: number[] = [],
    visited: Set<string> = new Set<string>(),
    directionQueue = [
      [0, 1], // right
      [1, 0], // bottom
      [0, -1], // left
      [-1, 0], //top
    ];

  let laststopPosition: number[] = [0, -1];
  const numberOfElements: number = matrix.length * matrix[0].length;

  while (ans.length !== numberOfElements) {
    const direction: number[] = directionQueue.shift()!;
    // start after last stop
    laststopPosition[0] += direction[0];
    laststopPosition[1] += direction[1];
    laststopPosition = drive(laststopPosition, direction!);
    directionQueue.push(direction!);
  }

  return ans;

  function drive(lastPosition: number[], direction: number[]): number[] {
    const yDir = direction[0];
    const xDir = direction[1];
    for (
      let i = lastPosition[0], j = lastPosition[1];
      i < matrix.length && i > -1 && j < matrix[i].length && j > -1;
      i += yDir, j += xDir
    ) {
      const key = `${i}+${j}`;
      if (visited.has(key)) break;
      lastPosition = [i, j];
      ans.push(matrix[i][j]);
      visited.add(key);
    }

    return lastPosition;
  }
}
