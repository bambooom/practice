// https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii/description
// There exist two undirected trees with n and m nodes, labeled from [0, n - 1] and [0, m - 1], respectively.
// You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree.
// Node u is target to node v if the number of edges on the path from u to v is even. Note that a node is always target to itself.
// Return an array of n integers answer, where answer[i] is the maximum possible number of nodes that are target to node i of the first tree if you had to connect one node from the first tree to another node in the second tree.
// Note that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.

// Example 1:
// Input: edges1 = [[0,1],[0,2],[2,3],[2,4]], edges2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]]
// Output: [8,7,7,8,8]
// Explanation:
// For i = 0, connect node 0 from the first tree to node 0 from the second tree.
// For i = 1, connect node 1 from the first tree to node 4 from the second tree.
// For i = 2, connect node 2 from the first tree to node 7 from the second tree.
// For i = 3, connect node 3 from the first tree to node 0 from the second tree.
// For i = 4, connect node 4 from the first tree to node 4 from the second tree.

// Example 2:
// Input: edges1 = [[0,1],[0,2],[0,3],[0,4]], edges2 = [[0,1],[1,2],[2,3]]
// Output: [3,6,6,6,6]
// Explanation:
// For every i, connect node i of the first tree with any node of the second tree.

// Editorial
// after joining the two trees, the answer has two parts:
// - The number of nodes in the first tree that are an even distance from node i.
// - The number of nodes in the second tree that are an even distance from node i.
// To retrieve these counts quickly, we first color each tree with depth-first search: assign the root color 0 (white); every node at an even distance from the root also gets color 0, and every node at an odd distance gets color 1 (black). We record the total number of white and black nodes. For any node, the number of its target nodes equals the number of nodes that share its color.
function maxTargetNodesII(edges1: number[][], edges2: number[][]): number[] {
  const dfs = (
    node: number,
    parent: number,
    depth: number,
    children: number[][],
    color: number[],
  ): number => {
    let res = 1 - (depth % 2);
    color[node] = depth % 2;

    for (const child of children[node]) {
      if (child === parent) {
        continue;
      }
      res += dfs(child, node, depth + 1, children, color);
    }

    return res;
  };

  const build = (edges: number[][], color: number[]): number[] => {
    const n = edges.length + 1;
    const children: number[][] = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
      children[u].push(v);
      children[v].push(u);
    }

    const res = dfs(0, -1, 0, children, color);
    return [res, n - res];
  };

  const n = edges1.length + 1;
  const m = edges2.length + 1;
  const color1 = new Array(n).fill(0);
  const color2 = new Array(m).fill(0);
  // color1 and color2, storing the colors of the nodes in the two trees, along with the counts of white and black nodes in each tree.
  const count1 = build(edges1, color1);
  const count2 = build(edges2, color2);

  const res: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    // for i-th query, look up color1[i], the count of nodes with that color in the first tree gives the first part of the answer
    // Regardless of how the trees are connected, node i "sees" only one color in the second tree, so second part is the max(white2, black2)
    res[i] = count1[color1[i]] + Math.max(count2[0], count2[1]);
  }

  return res;
}

// https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii/solutions/6114800/javascript-dfs-o-m-n/?envType=daily-question&envId=2025-05-29
function maxTargetNodesII2(edges1: number[][], edges2: number[][]): number[] {
  function dfs(
    v: number,
    u: number,
    adj: number[][],
    parity: boolean[],
    even: boolean,
  ): number {
    let res = even ? 1 : 0;
    parity[v] = even;
    for (const w of adj[v]) {
      if (w == u) continue;
      res += dfs(w, v, adj, parity, !even);
    }
    return res;
  }
  function adj(edges: number[][], n: number): number[][] {
    const adjList: number[][] = Array.from({ length: n }, () => []);
    for (let i = 0; i < n - 1; i++) {
      const [u, v] = edges[i];
      adjList[u].push(v);
      adjList[v].push(u);
    }
    return adjList;
  }

  const n1 = edges1.length + 1;
  const n2 = edges2.length + 1;

  const parity1: boolean[] = Array.from({ length: n1 }, () => false);
  const parity2: boolean[] = Array.from({ length: n2 }, () => false);

  const even1 = dfs(0, -1, adj(edges1, n1), parity1, true);
  const odd1 = n1 - even1;
  const even2 = dfs(0, -1, adj(edges2, n2), parity2, true);
  const odd2 = n2 - even2;

  const res = [];
  for (let i = 0; i < n1; ++i) {
    res.push((parity1[i] ? even1 : odd1) + Math.max(even2, odd2));
  }
  return res;
}
