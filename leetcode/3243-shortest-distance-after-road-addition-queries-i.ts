// https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i/

// You are given an integer n and a 2D integer array queries.
// There are n cities numbered from 0 to n - 1. Initially, there is a unidirectional road from city i to city i + 1 for all 0 <= i < n - 1.
// queries[i] = [ui, vi] represents the addition of a new unidirectional road from city ui to city vi. After each query, you need to find the length of the shortest path from city 0 to city n - 1.
// Return an array answer where for each i in the range [0, queries.length - 1], answer[i] is the length of the shortest path from city 0 to city n - 1 after processing the first i + 1 queries.

// https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i/solutions/6087071/video-beats-100/
// dfs
function shortestDistanceAfterQueries(
  n: number,
  queries: number[][],
): number[] {
  const distances: number[] = Array(n)
    .fill(0)
    .map((_, i) => n - 1 - i);

  const graph: number[][] = Array(n)
    .fill(0)
    .map(() => []);
  for (let i = 0; i < n - 1; i++) {
    graph[i + 1].push(i);
  }

  const answer: number[] = [];

  function updateDistance(
    graph: number[][],
    current: number,
    distances: number[],
  ): void {
    const newDist = distances[current] + 1;

    for (const neighbor of graph[current]) {
      if (distances[neighbor] <= newDist) {
        continue;
      }

      distances[neighbor] = newDist;
      updateDistance(graph, neighbor, distances);
    }
  }

  for (const [source, target] of queries) {
    graph[target].push(source);
    distances[source] = Math.min(distances[source], distances[target] + 1);
    updateDistance(graph, source, distances);
    answer.push(distances[0]);
  }

  return answer;
}

// BFS
function shortestDistanceAfterQueries2(
  n: number,
  queries: number[][],
): number[] {
  const adj: number[][] = Array(n)
    .fill(0)
    .map((_, i) => [i + 1]);

  const shortestPath = (): number => {
    const q: [number, number][] = [[0, 0]]; // node, length
    const visit = new Set<number>();
    visit.add(0);

    while (q.length > 0) {
      const [cur, length] = q.shift()!;

      if (cur === n - 1) {
        return length;
      }

      for (const nei of adj[cur]) {
        if (!visit.has(nei)) {
          q.push([nei, length + 1]);
          visit.add(nei);
        }
      }
    }

    return -1;
  };

  const res: number[] = [];

  for (const [src, dst] of queries) {
    adj[src].push(dst);
    res.push(shortestPath());
  }

  return res;
}
