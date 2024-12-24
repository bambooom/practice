// https://leetcode.com/problems/find-minimum-diameter-after-merging-two-trees/description
// There exist two undirected trees with n and m nodes, numbered from 0 to n - 1 and from 0 to m - 1, respectively. You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree.
// You must connect one node from the first tree with another node from the second tree with an edge.
// Return the minimum possible diameter of the resulting tree.
// The diameter of a tree is the length of the longest path between any two nodes in the tree.

// Example1:
// Input: edges1 = [[0,1],[0,2],[0,3]], edges2 = [[0,1]]
// Output: 3
// Explanation:
// We can obtain a tree of diameter 3 by connecting node 0 from the first tree with any node from the second tree.

// Example2:
// Input: edges1 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], edges2 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]]
// Output: 5
// Explanation:
// We can obtain a tree of diameter 5 by connecting node 0 from the first tree with node 0 from the second tree.

// https://leetcode.com/problems/find-minimum-diameter-after-merging-two-trees/solutions/5394476/javascript-solution/
function minimumDiameterAfterMerge(
  edges1: number[][],
  edges2: number[][],
): number {
  // calculate tree diameters, use DFS
  const getDiameter = (edges: number[][]) => {
    const adj = new Map<number, number[]>(); // <node, children>

    for (const [s, e] of edges) {
      adj.set(s, [...(adj.get(s) || []), e]);
      adj.set(e, [...(adj.get(e) || []), s]);
    }

    let bestNode = -1;
    let maxDist = 0;

    const dfs = (node: number, curDist: number, visited: Set<number>) => {
      if (curDist >= maxDist) {
        bestNode = node;
        maxDist = curDist;
      }
      visited.add(node);
      if (adj.has(node)) {
        // in case of [] edges
        for (const next of adj.get(node)!) {
          if (!visited.has(next)) {
            dfs(next, curDist + 1, visited);
          }
        }
      }
    };

    dfs(0, 0, new Set());
    dfs(bestNode, 0, new Set());
    return maxDist;
  };

  const d1 = getDiameter(edges1);
  const d2 = getDiameter(edges2);
  return Math.max(d1, d2, Math.ceil(d1 / 2) + Math.ceil(d2 / 2) + 1);
}
