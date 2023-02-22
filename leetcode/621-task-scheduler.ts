// https://leetcode.com/problems/task-scheduler/
// #hash-table #greedy #heap

// Example 1:
// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8
// Explanation:
// A -> B -> idle -> A -> B -> idle -> A -> B
// There is at least 2 units of time between any two same tasks.

// Example 2:
// Input: tasks = ["A","A","A","B","B","B"], n = 0
// Output: 6
// Explanation: On this case any permutation of size 6 would work since n = 0.
// ["A","A","A","B","B","B"]
// ["A","B","A","B","A","B"]
// ["B","B","B","A","A","A"]
// ...
// And so on.

// Example 3:
// Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
// Output: 16
// Explanation:
// One possible solution is
// A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A

// https://leetcode.com/problems/task-scheduler/solutions/401103/simple-javascript-idle-slots-1-pass-with-detailed-description/
// resultCount = (maxOccurrences - 1) * (n + 1) + (numMaxTasks);
function leastInterval(tasks: string[], n: number): number {
  // the map will be our tracking mechanism
  const m = new Map();

  // the max occurrences
  let maxVal = 0;

  // the number of tasks that has the max occurrences
  let maxValCount = 0;

  for (const k of tasks) {
    const tVal = m.has(k) ? m.get(k) + 1 : 1;
    m.set(k, tVal);
    // set our maxVal and number of maxVal tasks only if we have a new max
    if (tVal > maxVal) {
      maxVal = tVal;
      maxValCount = 1;
      // otherwise, increment number of maxVal tasks
    } else if (tVal === maxVal) {
      maxValCount++;
    }
  }
  // our formula, handle the edge case
  return Math.max(tasks.length, (maxVal - 1) * (n + 1) + maxValCount);
}

// https://leetcode.com/problems/task-scheduler/solutions/1874475/easy-solution-with-writeup/
// https://leetcode.com/problems/task-scheduler/solutions/918027/o-n-time-o-1-space-javascript-solution-with-clear-explanation/
