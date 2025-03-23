// https://leetcode.com/problems/number-of-ways-to-arrive-at-destination
// You are in a city that consists of n intersections numbered from 0 to n - 1 with bi-directional roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.
// You are given an integer n and a 2D integer array roads where roads[i] = [ui, vi, timei] means that there is a road between intersections ui and vi that takes timei minutes to travel. You want to know in how many ways you can travel from intersection 0 to intersection n - 1 in the shortest amount of time.
// Return the number of ways you can arrive at your destination in the shortest amount of time. Since the answer may be large, return it modulo 10^9 + 7.

import { MinPriorityQueue } from '@datastructures-js/priority-queue';

// Example1:
// Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
// Output: 4
// Explanation: The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.
// The four ways to get there in 7 minutes are:
// - 0 ➝ 6
// - 0 ➝ 4 ➝ 6
// - 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
// - 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6

// Example 2:
// Input: n = 2, roads = [[1,0,10]]
// Output: 1
// Explanation: There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.

// [Dijkstra's algorithm
function countPaths(n: number, roads: number[][]): number {
  const adjList: number[][][] = Array.from(new Array(n), () => []);

  for (const [u, v, time] of roads) {
    adjList[u].push([v, time]);
    adjList[v].push([u, time]);
  }

  const dist = new Array(n).fill(Infinity);
  const paths = new Array(n).fill(0);

  const mod = Math.pow(10, 9) + 7;

  const dijkstra = (
    src: number,
    dist: number[],
    paths: number[],
    adjList: number[][][],
  ): void => {
    const pq = new MinPriorityQueue<[number, number]>((a) => a[0]);
    dist[src] = 0;
    paths[src] = 1;
    pq.enqueue([0, src]);
    while (!pq.isEmpty()) {
      const [uW, u] = pq.dequeue();
      // for each adjacent node number of ways will be number of ways to its parent + number of ways to itself
      for (const [v, w] of adjList[u]) {
        if (dist[v] > uW + w) {
          dist[v] = uW + w;
          pq.enqueue([dist[v], v]);
          paths[v] = paths[u];
        } else if (dist[v] === uW + w) {
          paths[v] = (paths[v] + paths[u]) % mod;
        }
      }
    }
  };

  dijkstra(0, dist, paths, adjList);
  return paths[n - 1] % mod;
}
