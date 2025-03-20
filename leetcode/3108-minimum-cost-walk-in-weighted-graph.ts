// https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph
// There is an undirected weighted graph with n vertices labeled from 0 to n - 1.
// You are given the integer n and an array edges, where edges[i] = [ui, vi, wi] indicates that there is an edge between vertices ui and vi with a weight of wi.
// A walk on a graph is a sequence of vertices and edges. The walk starts and ends with a vertex, and each edge connects the vertex that comes before it and the vertex that comes after it. It's important to note that a walk may visit the same edge or vertex more than once.
// The cost of a walk starting at node u and ending at node v is defined as the bitwise AND of the weights of the edges traversed during the walk. In other words, if the sequence of edge weights encountered during the walk is w0, w1, w2, ..., wk, then the cost is calculated as w0 & w1 & w2 & ... & wk, where & denotes the bitwise AND operator.
// You are also given a 2D array query, where query[i] = [si, ti]. For each query, you need to find the minimum cost of the walk starting at vertex si and ending at vertex ti. If there exists no such walk, the answer is -1.
// Return the array answer, where answer[i] denotes the minimum cost of a walk for query i.

// Example 1:
// Input: n = 5, edges = [[0,1,7],[1,3,7],[1,2,1]], query = [[0,3],[3,4]]
// Output: [1,-1]
// Explanation: To achieve the cost of 1 in the first query, we need to move on the following edges: 0->1 (weight 7), 1->2 (weight 1), 2->1 (weight 1), 1->3 (weight 7).
// In the second query, there is no walk between nodes 3 and 4, so the answer is -1.

// Example 2:
// Input: n = 3, edges = [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], query = [[1,2]]
// Output: [0]
// Explanation: To achieve the cost of 0 in the first query, we need to move on the following edges: 1->2 (weight 1), 2->1 (weight 6), 1->2 (weight 1).

// union find and dfs
// https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph/solutions/4985868/clean-efficient-and-short-typescript-solution-dfs-and-union-find/?envType=daily-question&envId=2025-03-20
function minimumCost(
  n: number,
  edges: number[][],
  query: number[][],
): number[] {
  // adjacency list
  const adj: number[][][] = Array.from({ length: n }, () => []);
  const groups = new Array(n).fill(0); // group ID of node i
  const costs: number[] = []; // minimum cost of walks within group i

  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }

  const dfs = (u: number, count: number): number => {
    // if node u is already visited, return -1
    if (groups[u] !== 0) {
      return -1;
    }

    groups[u] = count;
    // Recursively traverse neighbors of node u and calculate minimum cost of walks
    return adj[u].reduce((acc, [e, w]) => acc & w & dfs(e, count), -1);
  };

  // Traverse each node and assign group IDs
  for (let i = 0; i < n; i++) {
    costs[i + 1] = dfs(i, i + 1);
  }

  const result: number[] = [];

  for (const [s, t] of query) {
    // s === t, same node, cost is 0
    // s and t are in the same group, return the minimum cost of walks within that group
    // s and t are in different groups, return -1, no path exists
    result.push(s === t ? 0 : groups[s] === groups[t] ? costs[groups[s]] : -1);
  }

  return result;
}
