// https://leetcode.com/problems/course-schedule-iv/
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course ai first if you want to take course bi.
// For example, the pair [0, 1] indicates that you have to take course 0 before you can take course 1.
// Prerequisites can also be indirect. If course a is a prerequisite of course b, and course b is a prerequisite of course c, then course a is a prerequisite of course c.
// You are also given an array queries where queries[j] = [uj, vj]. For the jth query, you should answer whether course uj is a prerequisite of course vj or not.
// Return a boolean array answer, where answer[j] is the answer to the jth query.

// Example1:
// Input: numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
// Output: [false,true]
// Explanation: The pair [1, 0] indicates that you have to take course 1 before you can take course 0.
// Course 0 is not a prerequisite of course 1, but the opposite is true.

// Example 2:
// Input: numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]
// Output: [false,false]
// Explanation: There are no prerequisites, and each course is independent.

// Example3:
// Input: numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
// Output: [true,true]

// https://leetcode.com/problems/course-schedule-iv/solutions/6333724/100-16ms-time-o-n-2-q-space-o-n-2/
// DFS
function checkIfPrerequisite(
  numCourses: number,
  prerequisites: number[][],
  queries: number[][],
): boolean[] {
  const mergeRows = (target: boolean[], source: boolean[]): boolean[] => {
    const N = source.length;
    for (let i = 0; i < N; ++i) {
      target[i] ||= source[i];
    }
    return target;
  };

  const dfs = (
    ins: Uint8Array,
    outs: number[][],
    matrix: boolean[][],
    vertex: number,
  ) => {
    for (const next of outs[vertex]) {
      if (matrix[next].length === 0) {
        matrix[next] = Array.from(matrix[vertex]);
      } else {
        matrix[next] = mergeRows(matrix[next], matrix[vertex]);
      }

      matrix[next][vertex] = true;
      if (--ins[next] === 0) {
        dfs(ins, outs, matrix, next);
      }
    }
  };

  // initialize outgoing edges
  const outs = new Array<number[]>(numCourses);
  for (let i = 0; i < numCourses; i++) {
    outs[i] = [];
  }

  // populate indegress and outgoing edges
  const ins = new Uint8Array(numCourses);
  for (let i = 0; i < prerequisites.length; ++i) {
    ++ins[prerequisites[i][1]];
    outs[prerequisites[i][0]].push(prerequisites[i][1]);
  }

  // populate prerequisite matrix
  const matrix = new Array(numCourses).fill([]);
  for (let i = 0; i < numCourses; ++i) {
    if (ins[i] == 0 && matrix[i].length == 0) {
      matrix[i] = new Array(numCourses).fill(false);
      dfs(ins, outs, matrix, i);
    }
  }

  // populate answers
  const answer = new Array<boolean>(queries.length);
  for (let i = 0; i < queries.length; ++i) {
    answer[i] = matrix[queries[i][1]][queries[i][0]] == true;
  }

  return answer;
}
