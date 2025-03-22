// https://leetcode.com/problems/count-the-number-of-complete-components/
// You are given an integer n. There is an undirected graph with n vertices, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting vertices ai and bi.
// Return the number of complete connected components of the graph.
// A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.
// A connected component is said to be complete if there exists an edge between every pair of its vertices.

// Example 1:
// Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
// Output: 3
// Explanation: From the picture above, one can see that all of the components of this graph are complete.

// Example 2:
// Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
// Output: 1
// Explanation: The component containing vertices 0, 1, and 2 is complete since there is an edge between every pair of two vertices. On the other hand, the component containing vertices 3, 4, and 5 is not complete since there is no edge between vertices 4 and 5. Thus, the number of complete components in this graph is 1.

// https://leetcode.com/problems/count-the-number-of-complete-components/solutions/5403701/dfs-js-easy-to-understand-solution/?envType=daily-question&envId=2025-03-22
// dfs
function countCompleteComponents(n: number, edges: number[][]): number {
  const graph: number[][] = Array.from({ length: n }, () => []);
  let res = 0;

  // adjacency list
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Array(n).fill(false);
  let vertCount = 0;
  let edgeCount = 0;

  // start from given vertex, marks all reachable vertices as visited, and count the number of vertices and edges
  const dfs = (node: number): void => {
    visited[node] = true;
    vertCount++;

    for (const v of graph[node]) {
      edgeCount++;
      if (!visited[v]) {
        dfs(v);
      }
    }
  };

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      vertCount = 0;
      edgeCount = 0;
      dfs(i);
      if (vertCount * (vertCount - 1) === edgeCount) {
        // checks if every vertex in the component is connected to every other vertex
        res++;
      }
    }
  }

  return res;
}
