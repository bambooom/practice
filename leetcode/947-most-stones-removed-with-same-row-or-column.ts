// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/
// #depth-first-search
// On a 2D plane, we place n stones at some integer coordinate points. Each coordinate point may have at most one stone.
// A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.
// Given an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, return the largest possible number of stones that can be removed.

// Example 1:
// Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
// Output: 5
// Explanation: One way to remove 5 stones is as follows:
// 1. Remove stone [2,2] because it shares the same row as [2,1].
// 2. Remove stone [2,1] because it shares the same column as [0,1].
// 3. Remove stone [1,2] because it shares the same row as [1,0].
// 4. Remove stone [1,0] because it shares the same column as [0,0].
// 5. Remove stone [0,1] because it shares the same row as [0,0].
// Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.

// Example 2:
// Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
// Output: 3
// Explanation: One way to make 3 moves is as follows:
// 1. Remove stone [2,2] because it shares the same row as [2,0].
// 2. Remove stone [2,0] because it shares the same column as [0,0].
// 3. Remove stone [0,2] because it shares the same row as [0,0].
// Stones[0, 0] and[1, 1] cannot be removed since they do not share a row / column with another stone still on the plane.

// Example 3:
// Input: stones = [[0,0]]
// Output: 0
// Explanation: [0,0] is the only stone on the plane, so you cannot remove it.

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

// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/solutions/2815018/typescript-union-find/?envType=daily-question&envId=2024-08-29
// faster solution, using union find
class GraphNode {
  constructor(public row: number, public col: number) {}
}
function removeStones2(stones: number[][]): number {
  const unions: Map<GraphNode, GraphNode> = new Map();
  const rowToNode: Map<number, GraphNode> = new Map();
  const colToNode: Map<number, GraphNode> = new Map();

  const getParent = (node: GraphNode) => {
    while (unions.get(node) != node) {
      node = unions.get(node)!;
    }
    return node;
  };

  const union = (node1: GraphNode, node2: GraphNode) => {
    unions.set(node2, node1);
  };

  for (const [row, col] of stones) {
    const node = new GraphNode(row, col);
    union(node, node);

    if (!rowToNode.has(row)) {
      rowToNode.set(row, node);
    }

    if (!colToNode.has(col)) {
      colToNode.set(col, node);
    }

    const parentA = getParent(colToNode.get(col)!);
    const parentB = getParent(rowToNode.get(row)!);
    union(node, parentA);
    union(node, parentB);

    colToNode.set(col, node);
    rowToNode.set(row, node);
  }

  const groups: Set<GraphNode> = new Set();

  unions.forEach((v) => groups.add(v));

  return stones.length - groups.size;
}
