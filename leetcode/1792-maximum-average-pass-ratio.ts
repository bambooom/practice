// https://leetcode.com/problems/maximum-average-pass-ratio/
// There is a school that has classes of students and each class will be having a final exam. You are given a 2D integer array classes, where classes[i] = [passi, totali]. You know beforehand that in the ith class, there are totali total students, but only passi number of students will pass the exam.
// You are also given an integer extraStudents. There are another extraStudents brilliant students that are guaranteed to pass the exam of any class they are assigned to. You want to assign each of the extraStudents students to a class in a way that maximizes the average pass ratio across all the classes.
// The pass ratio of a class is equal to the number of students of the class that will pass the exam divided by the total number of students of the class. The average pass ratio is the sum of pass ratios of all the classes divided by the number of the classes.
// Return the maximum possible average pass ratio after assigning the extraStudents students. Answers within 10-5 of the actual answer will be accepted.

// Example 1:
// Input: classes = [[1,2],[3,5],[2,2]], extraStudents = 2
// Output: 0.78333
// Explanation: You can assign the two extra students to the first class. The average pass ratio will be equal to(3 / 4 + 3 / 5 + 2 / 2) / 3 = 0.78333.

// Example 2:
// Input: classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
// Output: 0.53485

// https://leetcode.com/problems/maximum-average-pass-ratio/solutions/6147602/1792-maximum-average-pass-ratio/
// maxpriorityqueue

import { MaxPriorityQueue } from '@datastructures-js/priority-queue';

function maxAverageRatio(classes: number[][], extraStudents: number): number {
  // Create a max priority queue to prioritize classes based on the gain in pass ratio when adding a student
  const pq = new MaxPriorityQueue<[number, number]>(([p, t]) => {
    // Calculate the gain in pass ratio when adding a student to a class
    const gain = (p + 1) / (t + 1) - p / t;
    return gain;
  });

  for (const [p, t] of classes) {
    pq.enqueue([p, t]);
  }

  // Assign extra students to classes with the highest gain in pass ratio
  while (extraStudents--) {
    // Dequeue the class with the highest gain
    const [p, t] = pq.dequeue();

    // Add a student to the class and enqueue it back into the priority queue
    pq.enqueue([p + 1, t + 1]);
  }

  // Get the updated classes from the priority queue
  const updatedClasses = pq.toArray();
  // Calculate the sum of pass ratios for all classes
  const sumRatio = updatedClasses.reduce((acc, [p, t]) => acc + p / t, 0);
  // Return the average pass ratio
  return sumRatio / updatedClasses.length;
}
