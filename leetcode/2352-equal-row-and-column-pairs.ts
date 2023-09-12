// https://leetcode.com/problems/equal-row-and-column-pairs/
// #hash-map

function equalPairs(grid: number[][]): number {
  if (grid.length === 1) return 1;
  const n = grid.length;

  const rows = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const key = grid[i].join(',');
    rows.set(key, (rows.get(key) ?? 0) + 1);
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    const col = grid.map((v) => v[i]);
    const key = col.join(',');
    if (rows.has(key)) {
      count += rows.get(key) as number;
    }
  }

  return count;
}
