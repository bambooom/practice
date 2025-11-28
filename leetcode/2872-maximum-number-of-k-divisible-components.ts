// https://leetcode.com/problems/maximum-number-of-k-divisible-components/

// There is an undirected tree with n nodes labeled from 0 to n - 1. You are given the integer n and a 2D integer array edges of length n - 1, where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
// You are also given a 0-indexed integer array values of length n, where values[i] is the value associated with the ith node, and an integer k.
// A valid split of the tree is obtained by removing any set of edges, possibly empty, from the tree such that the resulting components all have values that are divisible by k, where the value of a connected component is the sum of the values of its nodes.
// Return the maximum number of components in any valid split.

// Example1:
// Input: n = 5, edges = [[0,2],[1,2],[1,3],[2,4]], values = [1,8,1,4,4], k = 6
// Output: 2
// Explanation: We remove the edge connecting node 1 with 2. The resulting split is valid because:
// - The value of the component containing nodes 1 and 3 is values[1] + values[3] = 12.
// - The value of the component containing nodes 0, 2, and 4 is values[0] + values[2] + values[4] = 6.
// It can be shown that no other valid split has more than 2 connected components.

// Example 2:
// Input: n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [3,0,6,1,5,2,1], k = 3
// Output: 3
// Explanation: We remove the edge connecting node 0 with 2, and the edge connecting node 0 with 1. The resulting split is valid because:
// - The value of the component containing node 0 is values[0] = 3.
// - The value of the component containing nodes 2, 5, and 6 is values[2] + values[5] + values[6] = 9.
// - The value of the component containing nodes 1, 3, and 4 is values[1] + values[3] + values[4] = 6.
// It can be shown that no other valid split has more than 3 connected components.

// https://leetcode.com/problems/maximum-number-of-k-divisible-components/solutions/6169568/here-comes-easiest-solution/
// DFS Traversal:
// 1. Start the traversal from the root node (node 0).
// 2. For each child node, recursively compute the sum of the subtree rooted at the child.
// 3. If the subtree sum modulo k equals 0, it can be split as a new component, and the component count is incremented.
//   Otherwise, propagate the sum to the parent node.
// 4. Handle Remaining Nodes:
// 5. After completing the traversal, check the total sum of the tree. If it is divisible by k, increment the component count.
// Final Count:
//   Return the total number of components formed.

function maxKDivisibleComponents(
  n: number,
  edges: number[][],
  values: number[],
  k: number,
): number {
  let comp = 0;

  // build adjacent list to represent the edges of the tree
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  // keep track of visited nodes
  const visited: boolean[] = new Array(n).fill(false);

  // calculate the sum of values in each component and update the number of components
  const DFS = (u: number): number => {
    visited[u] = true; // Mark the current node as visited
    let sum = 0;

    for (const v of adj[u]) {
      if (!visited[v]) {
        const vSum = DFS(v); // If the adjacent node has not been visited, recursively calculate the sum of values in its subtree

        if (vSum % k === 0) {
          comp++; // If the sum of values in the subtree is divisible by k, it can be split as a new component
        } else {
          sum += vSum; // If the sum of values in the adjacent component is not divisible by k, add it to the current component
        }
      }
    }

    sum += values[u]; // Add the value of the current node to the sum of values in the current component
    return sum;
  };

  const totalSum = DFS(0);
  if (totalSum % k === 0) {
    // If the total sum of values is divisible by k
    comp++; // Increment the number of components
  }

  return comp;
}
