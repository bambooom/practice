// https://leetcode.com/problems/path-with-maximum-probability/
// You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].
// Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.
// If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

// Example1:
// Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
// Output: 0.25000
// Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.

// Example2:
// Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
// Output: 0.30000

// Example3:
// Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
// Output: 0.00000
// Explanation: There is no path between 0 and 2.

// https://leetcode.com/problems/path-with-maximum-probability/solutions/3691018/typescript-solution/?envType=daily-question&envId=2024-08-27
// Bellman-Ford
function maxProbability(
  n: number,
  edges: number[][],
  succProb: number[],
  start_node: number,
  end_node: number,
): number {
  const maxProb: number[] = new Array(n).fill(0); // store max probability traveling from start node to each node
  maxProb[start_node] = 1; // 100% probability

  let hasUpdate = true;
  while (hasUpdate) {
    hasUpdate = false;

    for (let i = 0; i < edges.length; i++) {
      const [a, b] = edges[i];
      const prob = succProb[i];

      if (maxProb[a] * prob > maxProb[b]) {
        maxProb[b] = maxProb[a] * prob;
        hasUpdate = true;
      }

      if (maxProb[b] * prob > maxProb[a]) {
        maxProb[a] = maxProb[b] * prob;
        hasUpdate = true;
      }
    }
  }

  return maxProb[end_node];
}
