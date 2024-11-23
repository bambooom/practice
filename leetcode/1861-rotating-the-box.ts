// https://leetcode.com/problems/rotating-the-box

// You are given an m x n matrix of characters box representing a side-view of a box. Each cell of the box is one of the following:
// A stone '#'
// A stationary obstacle '*'
// Empty '.'
// The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.
// It is guaranteed that each stone in box rests on an obstacle, another stone, or the bottom of the box.
// Return an n x m matrix representing the box after the rotation described above.

function rotateTheBox(box: string[][]): string[][] {
  const ROWS = box.length;
  const COLS = box[0].length;

  const res: string[][] = Array(COLS)
    .fill(0)
    .map(() => Array(ROWS).fill('.'));

  for (let r = 0; r < ROWS; r++) {
    let i = COLS - 1;
    for (let c = COLS - 1; c >= 0; c--) {
      if (box[r][c] === '#') {
        res[i][ROWS - r - 1] = '#';
        i--;
      } else if (box[r][c] === '*') {
        // obstacle
        res[c][ROWS - r - 1] = '*';
        i = c - 1; // make index to be obstacle - 1, on the up of the obstacle
      }
    }
  }

  return res;
}
