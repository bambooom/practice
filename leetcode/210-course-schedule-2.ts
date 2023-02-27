// https://leetcode.com/problems/course-schedule-ii/
// #depth-first #breadth-first #graph #topological-sort

// Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,2,1,3]
// Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
// So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].

// topological sort: https://en.wikipedia.org/wiki/Topological_sorting
// Kahn's algorithm:
// choosing vertices in the same order as the eventual topological sort.
// First, find a list of "start nodes" which have no incoming edges and insert them into a set S;
// at least one such node must exist in a non-empty acyclic graph.

// @todo: not so clear about this approach
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const order: number[] = [];
  const queue: number[] = [];
  const graph: Map<number, number[]> = new Map();
  const indegree: number[] = Array(numCourses).fill(0);

  for (const [e, v] of prerequisites) {
    // build graph map
    if (graph.has(v)) {
      (graph.get(v) as number[]).push(e);
    } else {
      graph.set(v, [e]);
    }
    // build indegree array
    indegree[e]++;
  }

  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const v = queue.shift() as number;
    if (graph.has(v)) {
      for (const e of graph.get(v) as number[]) {
        indegree[e]--;
        if (indegree[e] === 0) queue.push(e);
      }
    }
    order.push(v);
  }

  return numCourses === order.length ? order : [];
}

// DFS: https://leetcode.com/problems/course-schedule-ii/solutions/1026664/clean-javascript-dfs-solution/
