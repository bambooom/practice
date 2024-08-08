// https://leetcode.com/problems/spiral-matrix-iii
// You start at the cell (rStart, cStart) of an rows x cols grid facing east. The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.
// You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all rows * cols spaces of the grid.
// Return an array of coordinates representing the positions of the grid in the order you visited them.

import { off } from 'process';

// Example1:
// Input: rows = 1, cols = 4, rStart = 0, cStart = 0
// Output: [[0,0],[0,1],[0,2],[0,3]]

// Example2:
// Input: rows = 5, cols = 6, rStart = 1, cStart = 4
// Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]

// https://leetcode.com/problems/spiral-matrix-iii/solutions/897620/javascript-one-pass-solution/?envType=daily-question&envId=2024-08-08
// The idea in each spiral both row and col movements will have the same offset. but may have different limits (or boundaries).
// so compute cLimit and rLimit and update the offset to the next spiral length whenever both i and j are equal to their respective limits
function spiralMatrixIII(
  rows: number,
  cols: number,
  rStart: number,
  cStart: number,
): number[][] {
  let offset = 1;
  let cLimit = cStart + offset;
  let rLimit = rStart + offset;
  let i = rStart;
  let j = cStart;
  const res: number[][] = [];

  while (res.length < rows * cols) {
    // if i and j are within the boundaries of the matrix and push to res
    if (i >= 0 && j >= 0 && i < rows && j < cols) {
      res.push([i, j]);
    }

    // if i and j are both equal to their respective limits update offset to next spiral length and direction
    if (i === rLimit && j === cLimit) {
      offset = offset < 0 ? offset - 1 : offset + 1;
      offset *= -1;
      cLimit += offset;
      rLimit += offset;
    }

    // each of the 4 possible movements through the matrix
    if (j < cLimit) j++;
    else if (i < rLimit) i++;
    else if (j > cLimit) j--;
    else if (i > rLimit) i--;
  }

  return res;
}

// https://leetcode.com/problems/spiral-matrix-iii/solutions/5605002/90-beats-in-every-languages-using-simulation-with-explanation/?envType=daily-question&envId=2024-08-08
function spiralMatrixIII2(
  rows: number,
  cols: number,
  rStart: number,
  cStart: number,
): number[][] {
  const result = [[rStart, cStart]];

  if (rows * cols === 1) return result;

  let steps = 0;
  const total = rows * cols;
  let dx = 0,
    dy = 1;

  while (result.length < total) {
    if (dx === 0) steps++;

    for (let i = 0; i < steps; i++) {
      rStart += dx;
      cStart += dy;

      if (rStart >= 0 && rStart < rows && cStart >= 0 && cStart < cols) {
        result.push([rStart, cStart]);
      }
    }

    [dx, dy] = [dy, -dx];
  }
  return result;
}
