// https://leetcode.com/problems/design-task-manager
// There is a task management system that allows users to manage their tasks, each associated with a priority. The system should efficiently handle adding, modifying, executing, and removing tasks.
// Implement the TaskManager class:
// TaskManager(vector<vector<int>>& tasks) initializes the task manager with a list of user-task-priority triples. Each element in the input list is of the form [userId, taskId, priority], which adds a task to the specified user with the given priority.
// void add(int userId, int taskId, int priority) adds a task with the specified taskId and priority to the user with userId. It is guaranteed that taskId does not exist in the system.
// void edit(int taskId, int newPriority) updates the priority of the existing taskId to newPriority. It is guaranteed that taskId exists in the system.
// void rmv(int taskId) removes the task identified by taskId from the system. It is guaranteed that taskId exists in the system.
// int execTop() executes the task with the highest priority across all users. If there are multiple tasks with the same highest priority, execute the one with the highest taskId. After executing, the taskId is removed from the system. Return the userId associated with the executed task. If no tasks are available, return -1.
// Note that a user may be assigned multiple tasks.

// Example 1:
// Input:
// ["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]
// [[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [], [101], [5, 105, 15], []]
// Output:
// [null, null, null, 3, null, null, 5]
// Explanation
// TaskManager taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]); // Initializes with three tasks for Users 1, 2, and 3.
// taskManager.add(4, 104, 5); // Adds task 104 with priority 5 for User 4.
// taskManager.edit(102, 8); // Updates priority of task 102 to 8.
// taskManager.execTop(); // return 3. Executes task 103 for User 3.
// taskManager.rmv(101); // Removes task 101 from the system.
// taskManager.add(5, 105, 15); // Adds task 105 with priority 15 for User 5.
// taskManager.execTop(); // return 5. Executes task 105 for User 5.

// https://leetcode.com/problems/design-task-manager/solutions/6520870/java-javascript-typescript-c-c-kotlin-go-solution/?envType=daily-question&envId=2025-09-18
import { PriorityQueue } from '@datastructures-js/priority-queue';

class Task {
  userId: number;
  taskId: number;
  priority: number;

  constructor(userId: number, taskId: number, priority: number) {
    this.userId = userId;
    this.taskId = taskId;
    this.priority = priority;
  }
}
class TaskManager {
  // private USER_ID_RANGE = [1, Math.pow(10, 5)];
  private TASK_ID_RANGE = [1, Math.pow(10, 5)];
  // private PRIORITY_RANGE = [1, Math.pow(10, 9)];

  private NOT_FOUND = -1;
  private REMOVED = -2;
  private REMOVED_TASK = new Task(this.REMOVED, this.REMOVED, this.REMOVED);

  private tasks = new Array(this.TASK_ID_RANGE[1] + 1);
  private maxHeap = new PriorityQueue<Task>((first, second) =>
    this.comparator(first, second),
  );

  constructor(tasks: number[][]) {
    for (let [userId, taskId, priority] of tasks) {
      this.tasks[taskId] = new Task(userId, taskId, priority);
      this.maxHeap.enqueue(new Task(userId, taskId, priority));
    }
  }

  private comparator(first: Task, second: Task): number {
    return first.priority === second.priority
      ? second.taskId - first.taskId
      : second.priority - first.priority;
  }

  add(userId: number, taskId: number, priority: number): void {
    this.tasks[taskId] = new Task(userId, taskId, priority);
    this.maxHeap.enqueue(new Task(userId, taskId, priority));
  }

  edit(taskId: number, newPriority: number): void {
    const userId = this.tasks[taskId].userId;
    this.tasks[taskId] = new Task(userId, taskId, newPriority);
    this.maxHeap.enqueue(new Task(userId, taskId, newPriority));
  }

  rmv(taskId: number): void {
    this.tasks[taskId] = this.REMOVED_TASK;
  }

  execTop(): number {
    let userId = this.NOT_FOUND;

    while (!this.maxHeap.isEmpty() && userId === this.NOT_FOUND) {
      const current = this.maxHeap.dequeue();
      if (this.taskFound(current)) {
        userId = current.userId;
        this.tasks[current.taskId] = this.REMOVED_TASK;
      }
    }

    return userId;
  }

  private taskFound(current: Task): boolean {
    const taskId = current.taskId;
    return (
      current.userId === this.tasks[taskId].userID &&
      current.taskId === this.tasks[taskId].taskID &&
      current.priority === this.tasks[taskId].priority
    );
  }
}

/**
 * Your TaskManager object will be instantiated and called as such:
 * var obj = new TaskManager(tasks)
 * obj.add(userId,taskId,priority)
 * obj.edit(taskId,newPriority)
 * obj.rmv(taskId)
 * var param_4 = obj.execTop()
 */
