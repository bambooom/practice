// https://leetcode.com/problems/minimum-cost-path-with-edge-reversals/
// You are given a directed, weighted graph with n nodes labeled from 0 to n - 1, and an array edges where edges[i] = [ui, vi, wi] represents a directed edge from node ui to node vi with cost wi.
// Each node ui has a switch that can be used at most once: when you arrive at ui and have not yet used its switch, you may activate it on one of its incoming edges vi → ui reverse that edge to ui → vi and immediately traverse it.
// The reversal is only valid for that single move, and using a reversed edge costs 2 * wi.
// Return the minimum total cost to travel from node 0 to node n - 1. If it is not possible, return -1.

// Example 1:
// Input: n = 4, edges = [[0,1,3],[3,1,1],[2,3,4],[0,2,2]]
// Output: 5
// Explanation:
// Use the path 0 → 1 (cost 3).
// At node 1 reverse the original edge 3 → 1 into 1 → 3 and traverse it at cost 2 * 1 = 2.
// Total cost is 3 + 2 = 5.

// Example 2:
// Input: n = 4, edges = [[0,2,1],[2,1,1],[1,3,1],[2,3,3]]
// Output: 3
// Explanation:
// No reversal is needed. Take the path 0 → 2 (cost 1), then 2 → 1 (cost 1), then 1 → 3 (cost 1).
// Total cost is 1 + 1 + 1 = 3.

// Constraints:
// 2 <= n <= 5 * 10^4
// 1 <= edges.length <= 10^5
// edges[i] = [ui, vi, wi]
// 0 <= ui, vi <= n - 1
// 1 <= wi <= 1000

// Dijkstra’s algorithm
// https://leetcode.com/problems/minimum-cost-path-with-edge-reversals/solutions/7174709/minimum-cost-path-with-asymmetric-edge-w-2sdd/?envType=daily-question&envId=2026-01-27

import { MinPriorityQueue } from '@datastructures-js/priority-queue';

function minCost(n: number, edges: number[][]): number {
  // Create an empty adjacency list to represent the graph
  const graph: [number, number][][] = Array.from({ length: n }, () => []);
  // Initialize an array to store the minimum cost to reach each node
  const dist: number[] = new Array(n).fill(Infinity);
  // Create a priority queue to store the nodes to be processed
  const pq = new MinPriorityQueue<[number, number]>((a) => a[0]);

  for (let [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, 2 * w]);
  }

  // Enqueue the starting node with cost 0
  pq.enqueue([0, 0]);
  dist[0] = 0;

  // Process the nodes in the priority queue until it's empty
  while (!pq.isEmpty()) {
    // Dequeue the node with the smallest cost
    const [c, node] = pq.dequeue()!;

    if (node === n - 1) {
      return c; // If the dequeued node is the destination node, return the cost
    }

    // Update the distances and priority queue based on the neighbors of the dequeued node
    for (let [next, cost] of graph[node]) {
      if (dist[node] + cost < dist[next]) {
        dist[next] = dist[node] + cost;
        pq.enqueue([dist[next], next]);
      }
    }
  }

  // If the loop finishes without reaching the destination node, return -1
  return -1;
}
