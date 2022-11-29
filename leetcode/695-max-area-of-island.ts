// https://leetcode.com/problems/max-area-of-island/

// recursive, time O(r * c) Space O(r * c)
function maxAreaOfIsland(grid: number[][]): number {
  const seen = new Set();
  const row = grid.length;
  const col = grid[0].length;

  function area(r: number, c: number): number {
    if (
      r < 0 ||
      r >= row ||
      c < 0 ||
      c >= col ||
      grid[r][c] === 0 ||
      seen.has(`${r}, ${c}`)
    ) {
      return 0;
    }

    seen.add(`${r}, ${c}`);
    return (
      1 + area(r - 1, c) + area(r + 1, c) + area(r, c - 1) + area(r, c + 1)
    );
  }

  let max = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      max = Math.max(area(i, j), max);
    }
  }
  return max;
}

const input = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];

console.log(maxAreaOfIsland(input));
