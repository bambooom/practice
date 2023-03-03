// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/
// #depth-first-search

// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/solutions/1995332/javascript-simple-dfs-solution-w-comments-dfs/
function removeStones(stones: number[][]): number {
  const visited: Set<string> = new Set();
  let valid = 0;

  // find and remove stones that have same row and col
  const traverse = (row: number, col: number): void => {
    const key = `${row}-${col}`;

    if (visited.has(key)) {
      return;
    }
    visited.add(key);

    for (const [x, y] of stones) {
      // if row or col is same, should be removed
      if (row === x || col === y) {
        traverse(x, y);
      }
    }
  };

  for (const [x, y] of stones) {
    const key = `${x}-${y}`;

    if (visited.has(key)) continue;

    traverse(x, y);
    valid++;
  }

  // subtract number of valid nodes from total number of stones
  return stones.length - valid;
}

// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/solutions/1432071/javascript-dfs-with-explanation/
