// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/

function dfs(
  adjList: Map<number, number[]>,
  visited: Set<number>,
  startNode: number,
) {
  visited.add(startNode);

  if (!adjList.get(startNode)) return;
  const vertices = adjList.get(startNode) as number[];
  for (let i = 0; i < vertices.length; i++) {
    if (!visited.has(vertices[i])) {
      dfs(adjList, visited, vertices[i]);
    }
  }
}

function countComponents(n: number, edges: number[][]): number {
  if (n === 0) return 0;
  let count = 0;
  const adjList: Map<number, number[]> = new Map();
  const visited: Set<number> = new Set();
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    adjList.set(a, [...(adjList.get(a) || []), b]);
    adjList.set(b, [...(adjList.get(b) || []), a]);
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      count++;
      dfs(adjList, visited, i);
    }
  }

  return count;
}
