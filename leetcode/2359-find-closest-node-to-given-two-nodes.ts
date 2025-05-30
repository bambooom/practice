// https://leetcode.com/problems/find-closest-node-to-given-two-nodes
// You are given a directed graph of n nodes numbered from 0 to n - 1, where each node has at most one outgoing edge.
// The graph is represented with a given 0-indexed array edges of size n, indicating that there is a directed edge from node i to node edges[i]. If there is no outgoing edge from i, then edges[i] == -1.
// You are also given two integers node1 and node2.
// Return the index of the node that can be reached from both node1 and node2, such that the maximum between the distance from node1 to that node, and from node2 to that node is minimized. If there are multiple answers, return the node with the smallest index, and if no possible answer exists, return -1.
// Note that edges may contain cycles.

// Example 1:
// Input: edges = [2,2,3,-1], node1 = 0, node2 = 1
// Output: 2
// Explanation: The distance from node 0 to node 2 is 1, and the distance from node 1 to node 2 is 1.
// The maximum of those two distances is 1. It can be proven that we cannot get a node with a smaller maximum distance than 1, so we return node 2.

// Example 2:
// Input: edges = [1,2,-1], node1 = 0, node2 = 2
// Output: 2
// Explanation: The distance from node 0 to node 2 is 2, and the distance from node 2 to itself is 0.
// The maximum of those two distances is 2. It can be proven that we cannot get a node with a smaller maximum distance than 2, so we return node 2.

// https://leetcode.com/problems/find-closest-node-to-given-two-nodes/solutions/3097946/breadth-first-search-ts-best-time-and-space-complexity-at-time-of-positng/?envType=daily-question&envId=2025-05-30
// BFS to find the shortest path in an unweighted graph.
// Find all the paths for both given nodes first in a recursive BFS, then look for the smallest distances for each of the nodes.
function closestMeetingNode(
  edges: number[],
  node1: number,
  node2: number,
): number {
  const n = edges.length;
  const dist1: number[] = new Array(n).fill(Infinity);
  const dist2: number[] = new Array(n).fill(Infinity);

  const bfs = (startNode: number, edges: number[], dist: number[]) => {
    const n = edges.length;
    const q: number[] = [startNode];

    const visited: boolean[] = new Array(n).fill(false);
    dist[startNode] = 0;

    while (q.length > 0) {
      const node = q.shift()!;

      if (visited[node]) continue;
      visited[node] = true;

      const nextNode = edges[node];
      if (nextNode !== -1 && !visited[nextNode]) {
        dist[nextNode] = dist[node] + 1;
        q.push(nextNode);
      }
    }
  };

  bfs(node1, edges, dist1);
  bfs(node2, edges, dist2);

  let minDistNode = -1;
  let currMinDist = Infinity;

  for (let currNode = 0; currNode < n; currNode++) {
    if (currMinDist > Math.max(dist1[currNode], dist2[currNode])) {
      minDistNode = currNode;
      currMinDist = Math.max(dist1[currNode], dist2[currNode]);
    }
  }

  return minDistNode;
}
