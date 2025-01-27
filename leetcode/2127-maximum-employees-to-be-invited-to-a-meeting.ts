// https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting
// A company is organizing a meeting and has a list of n employees, waiting to be invited. They have arranged for a large circular table, capable of seating any number of employees.
// The employees are numbered from 0 to n - 1. Each employee has a favorite person and they will attend the meeting only if they can sit next to their favorite person at the table. The favorite person of an employee is not themself.
// Given a 0-indexed integer array favorite, where favorite[i] denotes the favorite person of the ith employee, return the maximum number of employees that can be invited to the meeting.

// Example1:
// Input: favorite = [2,2,1,2]
// Output: 3
// Explanation:
// The above figure shows how the company can invite employees 0, 1, and 2, and seat them at the round table.
// All employees cannot be invited because employee 2 cannot sit beside employees 0, 1, and 3, simultaneously.
// Note that the company can also invite employees 1, 2, and 3, and give them their desired seats.
// The maximum number of employees that can be invited to the meeting is 3.

// Example 2:
// Input: favorite = [1,2,0]
// Output: 3
// Explanation:
// Each employee is the favorite person of at least one other employee, and the only way the company can invite them is if they invite every employee.
// The seating arrangement will be the same as that in the figure given in example 1:
// - Employee 0 will sit between employees 2 and 1.
// - Employee 1 will sit between employees 0 and 2.
// - Employee 2 will sit between employees 1 and 0.
// The maximum number of employees that can be invited to the meeting is 3.

// https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting/solutions/6330319/beats-100-clear-and-concise-solution-better-explation-typescript-javascript/
// employees are nodes and their favorite colleagues form directed edges.
// need to identify the maximum group of employees that can form valid seating arrangements (either in chains or cycles).

function maximumInvitations(favorite: number[]): number {
  const n = favorite.length;
  const inDegree = new Array(n).fill(0);
  const queue: number[] = [];
  const longestChain = new Array(n).fill(0);

  // Step1: Calculate in-degree for each employee
  for (let i = 0; i < n; i++) {
    inDegree[favorite[i]]++;
  }

  // Step2: Topological sort for employees with 0 in-degree
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  // Step3: Process all employees with in-degree 0
  while (queue.length) {
    const curr = queue.shift()!;
    const fav = favorite[curr];
    longestChain[fav] = Math.max(longestChain[fav], longestChain[curr] + 1);
    inDegree[fav]--;

    if (inDegree[fav] === 0) {
      queue.push(fav);
    }
  }

  // Step4: Detect and process cycles
  let maxCycleSize = 0;
  let totalChainSum = 0;

  for (let i = 0; i < n; i++) {
    if (inDegree[i] > 0) {
      // still in-degree > 0 means this is a part of cycle
      let cycleSize = 0;
      let curr = i;

      do {
        inDegree[curr] = 0; // Mark this node as visited
        curr = favorite[curr];
        cycleSize++;
      } while (curr !== i);

      maxCycleSize = Math.max(maxCycleSize, cycleSize);
    }
  }

  // Step5: handle mutual favorite pairs
  for (let i = 0; i < n; i++) {
    if (favorite[favorite[i]] === i && i < favorite[i]) {
      totalChainSum += longestChain[i] + longestChain[favorite[i]] + 2;
    }
  }

  // Step6: return the maximum of the longest cycle or total mutual favorite chains
  return Math.max(maxCycleSize, totalChainSum);
}
