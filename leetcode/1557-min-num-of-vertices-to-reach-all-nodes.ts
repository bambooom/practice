// https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/
// Given a directed acyclic graph, with n vertices numbered from 0 to n-1, and an array edges where edges[i] = [fromi, toi] represents a directed edge from node fromi to node toi.
// Find the smallest set of vertices from which all nodes in the graph are reachable. It's guaranteed that a unique solution exists.
// #graph

// Any index in the map that doesn't have a value is a node that isn't reachable.
function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
  const degree = Array(n).fill(0);
  for (const [a, b] of edges) {
    degree[b]++;
  }
  const output: number[] = [];
  for (let i = 0; i < n; i++) {
    if (!degree[i]) {
      output.push(i);
    }
  }

  return output;
}
