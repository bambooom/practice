// https://leetcode.com/problems/flood-fill/

// We perform the algorithm explained in the problem description:
// paint the starting pixels, plus adjacent pixels of the same color, and so on.
// this is called depth-first search
function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  color: number,
): number[][] {
  const oldColor = image[sr][sc];
  if (oldColor === color) return image;
  const row = image.length;
  const col = image[0].length;

  function paint(i: number, j: number) {
    if (image[i][j] === oldColor) {
      image[i][j] = color;
      if (i > 0) paint(i - 1, j);
      if (i + 1 < row) paint(i + 1, j);
      if (j > 0) paint(i, j - 1);
      if (j + 1 < col) paint(i, j + 1);
    }
  }

  paint(sr, sc);
  return image;
}
