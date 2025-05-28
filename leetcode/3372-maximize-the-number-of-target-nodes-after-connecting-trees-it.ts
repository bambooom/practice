// https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-i/
// There exist two undirected trees with n and m nodes, with distinct labels in ranges [0, n - 1] and [0, m - 1], respectively.
// You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree. You are also given an integer k.
// Node u is target to node v if the number of edges on the path from u to v is less than or equal to k. Note that a node is always target to itself.
// Return an array of n integers answer, where answer[i] is the maximum possible number of nodes target to node i of the first tree if you have to connect one node from the first tree to another node in the second tree.
// Note that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.

// Example 1:
// Input: edges1 = [[0,1],[0,2],[2,3],[2,4]], edges2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]], k = 2
// Output: [9,7,9,8,8]
// Explanation:
// For i = 0, connect node 0 from the first tree to node 0 from the second tree.
// For i = 1, connect node 1 from the first tree to node 0 from the second tree.
// For i = 2, connect node 2 from the first tree to node 4 from the second tree.
// For i = 3, connect node 3 from the first tree to node 4 from the second tree.
// For i = 4, connect node 4 from the first tree to node 4 from the second tree.

// Example 2:
// Input: edges1 = [[0,1],[0,2],[0,3],[0,4]], edges2 = [[0,1],[1,2],[2,3]], k = 1
// Output: [6,3,3,3,3]
// Explanation:
// For every i, connect node i of the first tree with any node of the second tree.

// https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-i/solutions/6788191/ts/?envType=daily-question&envId=2025-05-28
function maxTargetNodes(
  edges1: number[][],
  edges2: number[][],
  k: number,
): number[] {
  const n = edges1.length + 1;
  const m = edges2.length + 1;

  // Create adjacency lists
  const adj1: number[][] = Array.from({ length: n }, () => []);
  const adj2: number[][] = Array.from({ length: m }, () => []);

  for (const [u, v] of edges1) {
    adj1[u].push(v);
    adj1[v].push(u);
  }
  for (const [u, v] of edges2) {
    adj2[u].push(v);
    adj2[v].push(u);
  }

  // Initialize arrays to track target nodes
  const good1 = new Array(n).fill(0);
  const good2 = new Array(m).fill(0);

  const dfs = (
    node: number, // current node being visited
    parent: number, // parent node of the current node
    dist: number, // the current distance from the root node
    root: number, // the root node of the current tree
    k: number, // the maximum distance threshold
    good: number[], // the array to track target nodes
    adj: number[][],
  ) => {
    if (dist > k) return;
    // If the distance is within the threshold, the function increments the value in the good array corresponding to the root node.
    good[root]++;

    // The function then recursively calls itself for each neighbor of the current node, passing in the updated distance and the same root node.
    for (const neighbor of adj[node]) {
      if (neighbor !== parent) {
        dfs(neighbor, node, dist + 1, root, k, good, adj);
      }
    }
  };

  // Apply DFS to both trees
  for (let i = 0; i < n; i++) {
    dfs(i, -1, 0, i, k, good1, adj1);
  }

  for (let i = 0; i < m; i++) {
    dfs(i, -1, 0, i, k - 1, good2, adj2);
  }

  const maxGood2 = Math.max(...good2); // represents the maximum number of target nodes that can be reached from any node in the second tree.
  // The good1 array is then mapped to a new array, where each element is the sum of the original value and the maximum value from good2. This represents the maximum possible target nodes for each node in the first tree if it were connected to the second tree.
  return good1.map((v) => v + maxGood2);
}
