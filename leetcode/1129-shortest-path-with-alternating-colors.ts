// https://leetcode.com/problems/shortest-path-with-alternating-colors/
// #Breadth-first search

/**
 * Key points:
 * 1. Initially, add red and blue start point
 * 2. the visited set is used to save used edge
 *
 * @param {number} n
 * @param {number[][]} red_edges
 * @param {number[][]} blue_edges
 * @return {number[]}
 */
function shortestAlternatingPaths(
  n: number,
  red_edges: number[][],
  blue_edges: number[][],
): number[] {
  const BLUE = 'blue',
    RED = 'red',
    MAX = Number.MAX_SAFE_INTEGER;
  const queue = [
      [0, BLUE],
      [0, RED],
    ],
    ans: number[] = Array(n).fill(MAX),
    visited = new Set();
  let steps = 0;

  while (queue.length > 0) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [node, color] = queue.shift() as [number, string];
      //console.log(node, color);
      ans[node] = Math.min(ans[node], steps);
      if (color === BLUE) {
        const edges = red_edges.filter((e) => e[0] === node);
        for (const edge of edges) {
          const next = edge[1];
          if (!visited.has(edge)) {
            visited.add(edge);
            queue.push([next, RED]);
          }
        }
      }

      if (color === RED) {
        const edges = blue_edges.filter((e) => e[0] === node);
        for (const edge of edges) {
          const next = edge[1];
          if (!visited.has(edge)) {
            visited.add(edge);
            queue.push([next, BLUE]);
          }
        }
      }
    }
    steps++;
  }

  return ans.map((v) => (v === MAX ? -1 : v));
}
