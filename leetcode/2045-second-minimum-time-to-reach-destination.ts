// https://leetcode.com/problems/second-minimum-time-to-reach-destination/

// https://leetcode.com/problems/second-minimum-time-to-reach-destination/solutions/5546162/100-beats-in-every-language/?envType=daily-question&envId=2024-07-28
// 看不懂
function secondMinimum(
  n: number,
  edges: number[][],
  time: number,
  change: number,
): number {
  // build adjacency list
  const graph: number[][] = Array.from({ length: n + 1 }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const dist1 = new Array(n + 1).fill(-1); // store minimun
  const dist2 = new Array(n + 1).fill(-1); // store second minimun
  dist1[1] = 0;

  const queue = [[1, 1]];

  // perform BFS
  // - For each current node, calculate the travel time considering the traffic light changes.
  // - If the current time falls under a red light, wait until it turns green before proceeding.
  // - Update firstDist and secondDist for the neighbors of the current node as needed.
  while (queue.length > 0) {
    const [x, freq] = queue.shift()!;
    const t = freq === 1 ? dist1[x] : dist2[x];

    let newTime;
    if (Math.floor(t / change) % 2 !== 0) {
      newTime = change * (Math.floor(t / change) + 1) + time;
    } else {
      newTime = t + time;
    }

    for (const y of graph[x]) {
      if (dist1[y] === -1) {
        dist1[y] = newTime;
        queue.push([y, 1]);
      } else if (dist2[y] === -1 && dist1[y] !== newTime) {
        if (y === n) {
          // check valid and return
          return newTime;
        }
        dist2[y] = newTime;
        queue.push([y, 2]);
      }
    }
  }

  return 0;
}

// https://leetcode.com/problems/second-minimum-time-to-reach-destination/solutions/5546096/algorithm-for-second-minimum-path-in-a-signalized-graph/?envType=daily-question&envId=2024-07-28
// The goal is to find the second minimum time to travel from node 1 to node n in a graph with traffic lights that switch between green and red. The second minimum time is the smallest value that is strictly larger than the minimum time. The key idea is to use a breadth-first search (BFS) algorithm to explore all possible paths and determine the two shortest times to reach each node.
