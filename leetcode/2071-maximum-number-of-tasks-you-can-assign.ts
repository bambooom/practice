// https://leetcode.com/problems/maximum-number-of-tasks-you-can-assign/
// You have n tasks and m workers. Each task has a strength requirement stored in a 0-indexed integer array tasks, with the ith task requiring tasks[i] strength to complete. The strength of each worker is stored in a 0-indexed integer array workers, with the jth worker having workers[j] strength. Each worker can only be assigned to a single task and must have a strength greater than or equal to the task's strength requirement (i.e., workers[j] >= tasks[i]).
// Additionally, you have pills magical pills that will increase a worker's strength by strength. You can decide which workers receive the magical pills, however, you may only give each worker at most one magical pill.
// Given the 0-indexed integer arrays tasks and workers and the integers pills and strength, return the maximum number of tasks that can be completed.

// Example 1:
// Input: tasks = [3,2,1], workers = [0,3,3], pills = 1, strength = 1
// Output: 3
// Explanation:
// We can assign the magical pill and tasks as follows:
// - Give the magical pill to worker 0.
// - Assign worker 0 to task 2 (0 + 1 >= 1)
// - Assign worker 1 to task 1 (3 >= 2)
// - Assign worker 2 to task 0 (3 >= 3)

// Example 2:
// Input: tasks = [5,4], workers = [0,0,0], pills = 1, strength = 5
// Output: 1
// Explanation:
// We can assign the magical pill and tasks as follows:
// - Give the magical pill to worker 0.
// - Assign worker 0 to task 0 (0 + 5 >= 5)

// Example 3:
// Input: tasks = [10,15,30], workers = [0,10,10,10,10], pills = 3, strength = 10
// Output: 2
// Explanation:
// We can assign the magical pills and tasks as follows:
// - Give the magical pill to worker 0 and worker 1.
// - Assign worker 0 to task 0 (0 + 10 >= 10)
// - Assign worker 1 to task 1 (10 + 10 >= 15)
// The last pill is not given because it will not make any worker strong enough for the last task.

// https://leetcode.com/problems/maximum-number-of-tasks-you-can-assign/solutions/6703625/optimal-task-assignment-how-to-effectively-separate-employees-and-tasks-with-magic-pills/?envType=daily-question&envId=2025-05-01
// sort the tasks and workers, we want stronger ones to take the  more difficult taks, use binary search to determine the maximum number of tasks
function maxTaskAssign(
  tasks: number[],
  workers: number[],
  pills: number,
  strength: number,
): number {
  tasks.sort((a, b) => a - b); // tasks asending
  workers.sort((a, b) => b - a); // workers descending

  let l = 0;
  let r = Math.min(tasks.length, workers.length);

  // Helper function to do bisect
  const bisectLeft = (
    arr: number[],
    x: number,
    lo = 0,
    hi: number | null = null,
  ): number => {
    if (hi == null) hi = arr.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      arr[mid] < x ? (lo = mid + 1) : (hi = mid);
    }
    return lo;
  };

  // Helper function to check if we can assign k tasks
  const canAssign = (k: number): boolean => {
    const selectedWorkers = workers.slice(0, k).reverse();
    const selectedTasks = tasks.slice(0, k).reverse();

    let remainingPills = pills;

    for (const task of selectedTasks) {
      let index = bisectLeft(selectedWorkers, task);

      if (index < selectedWorkers.length) {
        selectedWorkers.pop();
      } else if (remainingPills > 0) {
        // if take a pill
        index = bisectLeft(selectedWorkers, task - strength);

        if (index < selectedWorkers.length) {
          selectedWorkers.splice(index, 1);
          remainingPills -= 1;
        }
      } else {
        // no more pill
        return false;
      }
    }

    return selectedWorkers.length === 0;
  };

  while (l < r) {
    const mid = r - Math.floor((r - l) / 2);
    if (canAssign(mid)) {
      l = mid; // If we can assign mid tasks, move left
    } else {
      r = mid - 1; // Otherwise, adjust right boundary
    }
  }

  return l; // Return the maximum number of tasks that can be assigned
}
