// https://leetcode.com/problems/course-schedule
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.

// topics: dfs, bfs, graph, topological sort

// Example 1:
// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0. So it is possible.

// Example 2:
// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

// https://leetcode.com/problems/course-schedule/solutions/2966891/topological-sort/?envType=study-plan-v2&envId=top-100-liked
// topological sort
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const adjList: number[][] = new Array(numCourses);

  for (let i = 0; i < adjList.length; i++) {
    adjList[i] = [];
  }

  for (let i = 0; i < prerequisites.length; i++) {
    const [a, b] = prerequisites[i];
    adjList[a].push(b);
  }

  const topoSort = (V: number, adj: number[][]): boolean => {
    const indegreeEdge = new Array(V).fill(0);
    const queue: number[] = [];
    const topoSorted: number[] = [];

    // build indegree
    for (let i = 0; i < V; i++) {
      for (const it of adj[i]) {
        indegreeEdge[it]++;
      }
    }

    // zero incoming edge vertext
    for (let i = 0; i < V; i++) {
      if (indegreeEdge[i] === 0) {
        queue.push(i);
      }
    }

    // topo sort
    while (queue.length) {
      const node = queue.shift() as number;

      topoSorted.push(node);

      for (const it of adj[node]) {
        indegreeEdge[it]--;
        if (indegreeEdge[it] === 0) {
          queue.push(it);
        }
      }
    }

    return topoSorted.length === V;
  };

  return topoSort(numCourses, adjList);
}

// https://leetcode.com/problems/course-schedule/solutions/857099/javascript-typescript-solution/?envType=study-plan-v2&envId=top-100-liked
function canFinish2(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from(Array(numCourses), () => []);
  const ranks: number[] = Array(numCourses).fill(0);

  prerequisites.forEach(([u, v]) => {
    graph[v].push(u);
    ranks[u]++;
  });

  const queue: number[] = [];

  ranks.forEach((r, i) => {
    if (!r) queue.push(i);
  });

  while (queue.length) {
    const f = queue.shift();
    numCourses--;

    graph[f as number].forEach((neigh) => {
      ranks[neigh]--;
      if (!ranks[neigh]) queue.push(neigh);
    });
  }

  return !numCourses;
}
