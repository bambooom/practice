// https://leetcode.com/problems/find-all-people-with-secret/
// You are given an integer n indicating there are n people numbered from 0 to n - 1. You are also given a 0-indexed 2D integer array meetings where meetings[i] = [xi, yi, timei] indicates that person xi and person yi have a meeting at timei. A person may attend multiple meetings at the same time. Finally, you are given an integer firstPerson.
// Person 0 has a secret and initially shares the secret with a person firstPerson at time 0. This secret is then shared every time a meeting takes place with a person that has the secret. More formally, for every meeting, if a person xi has the secret at timei, then they will share the secret with person yi, and vice versa.
// The secrets are shared instantaneously. That is, a person may receive the secret and share it with people in other meetings within the same time frame.
// Return a list of all the people that have the secret after all the meetings have taken place. You may return the answer in any order.

// Example 1:
// Input: n = 6, meetings = [[1,2,5],[2,3,8],[1,5,10]], firstPerson = 1
// Output: [0,1,2,3,5]
// Explanation:
// At time 0, person 0 shares the secret with person 1.
// At time 5, person 1 shares the secret with person 2.
// At time 8, person 2 shares the secret with person 3.
// At time 10, person 1 shares the secret with person 5.​​​​
// Thus, people 0, 1, 2, 3, and 5 know the secret after all the meetings.

// Example 2:
// Input: n = 4, meetings = [[3,1,3],[1,2,2],[0,3,3]], firstPerson = 3
// Output: [0,1,3]
// Explanation:
// At time 0, person 0 shares the secret with person 3.
// At time 2, neither person 1 nor person 2 know the secret.
// At time 3, person 3 shares the secret with person 0 and person 1.
// Thus, people 0, 1, and 3 know the secret after all the meetings.

// Example 3:
// Input: n = 5, meetings = [[3,4,2],[1,2,1],[2,3,1]], firstPerson = 1
// Output: [0,1,2,3,4]
// Explanation:
// At time 0, person 0 shares the secret with person 1.
// At time 1, person 1 shares the secret with person 2, and person 2 shares the secret with person 3.
// Note that person 2 can share the secret at the same time as receiving it.
// At time 2, person 3 shares the secret with person 4.
// Thus, people 0, 1, 2, 3, and 4 know the secret after all the meetings.

// Constraints:
// 2 <= n <= 10^5
// 1 <= meetings.length <= 10^5
// meetings[i].length == 3
// 0 <= xi, yi <= n - 1
// xi != yi
// 1 <= timei <= 10^5
// 1 <= firstPerson <= n - 1

function findAllPeople(
  n: number,
  meetings: number[][],
  firstPerson: number,
): number[] {
  // Set to keep track of people who have the secret
  const secret = new Set<number>([0, firstPerson]);
  // Map to store the meetings for each time slot
  const timeMap = new Map<number, Map<number, number[]>>();

  for (const [x, y, t] of meetings) {
    // Check if a specific time slot in timeMap exists, and if not, create a new empty Map for that time slot
    if (!timeMap.has(t)) {
      timeMap.set(t, new Map<number, number[]>());
    }

    if (!timeMap.get(t)!.has(x)) {
      timeMap.get(t)!.set(x, [y]);
    } else {
      // If the person already exists, add the new person to the list of people associated with that person
      timeMap.get(t)!.get(x)!.push(y);
    }

    if (!timeMap.get(t)!.has(y)) {
      timeMap.get(t)!.set(y, [x]);
    } else {
      timeMap.get(t)!.get(y)!.push(x);
    }
  }

  const dfs = (
    cur: number,
    adj: Map<number, number[]>,
    visited: Set<number>,
    secret: Set<number>,
  ) => {
    visited.add(cur); // Mark the current person as visited

    // Check if the current person is not in the timeMap or the secret set
    if (!adj.has(cur) || !secret.has(cur)) {
      return;
    }

    // Iterate over the neighbors of the current person
    for (const sec of adj.get(cur)!) {
      secret.add(sec); // Add the neighbor to the secret set
      // Check if the neighbor has not been visited
      if (!visited.has(sec)) {
        dfs(sec, adj, visited, secret); // Recursively call dfs on the neighbor
      }
    }
  };

  // Sort the timeMap by time
  const sortedTimeMap = new Map(
    [...timeMap.entries()].sort((a, b) => a[0] - b[0]),
  );

  for (const [t, meets] of sortedTimeMap) {
    const visited = new Set<number>();
    for (const [x, y] of meets) {
      // Check if the first person in the meeting is not visited and is in the secret set
      if (!visited.has(x) && secret.has(x)) {
        dfs(x, meets, visited, secret); // Call dfs on the first person in the meeting
      }
    }
  }

  // Return a copy of the secret set as an array
  return [...secret];
}
