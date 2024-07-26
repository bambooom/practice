// https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/
// There are n cities numbered from 0 to n-1. Given the array edges where edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted edge between cities fromi and toi, and given the integer distanceThreshold.
// Return the city with the smallest number of cities that are reachable through some path and whose distance is at most distanceThreshold, If there are multiple such cities, return the city with the greatest number.
// Notice that the distance of a path connecting cities i and j is equal to the sum of the edges' weights along that path.

// Example:
// Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
// Output: 3
// Explanation: The figure above describes the graph.
// The neighboring cities at a distanceThreshold = 4 for each city are:
// City 0 -> [City 1, City 2]
// City 1 -> [City 0, City 2, City 3]
// City 2 -> [City 0, City 1, City 3]
// City 3 -> [City 1, City 2]
// Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.

// Floyd's Algorithm
// The Floyd-Warshall algorithm is a classic algorithm used to find the shortest paths between all pairs of nodes in a weighted graph. It works well for graphs with positive or negative edge weights (but no negative cycles) and has a time complexity of 𝑂(N^3) where N is the number of vertices in the graph.
// The algorithm uses dynamic programming to iteratively improve the estimated distances between all pairs of nodes until the shortest paths are found. The key idea is to incrementally update the distance between two nodes by considering whether including an intermediate node k can offer a shorter path.
// https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/?envType=daily-question&envId=2024-07-26
function findTheCity(
  n: number,
  edges: number[][],
  distanceThreshold: number,
): number {
  const dist = Array.from({ length: n }, () => Array(n).fill(10001));

  let result = 0;
  let small = n;

  for (const [u, v, w] of edges) {
    dist[u][v] = w;
    dist[v][u] = w;
  }

  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      for (let k = 0; k < n; k++) {
        dist[i][k] = Math.min(dist[i][k], dist[i][j] + dist[j][k]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    let count = 0;

    for (let j = 0; j < n; j++) {
      if (dist[i][j] <= distanceThreshold) {
        count++;
      }
    }

    if (count <= small) {
      result = i;
      small = count;
    }
  }

  return result;
}
