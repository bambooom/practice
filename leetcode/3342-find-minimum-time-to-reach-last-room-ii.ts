// https://leetcode.com/problems/find-minimum-time-to-reach-last-room-ii/
// There is a dungeon with n x m rooms arranged as a grid.
// You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes one second for one move and two seconds for the next, alternating between the two.
// Return the minimum time to reach the room (n - 1, m - 1).
// Two rooms are adjacent if they share a common wall, either horizontally or vertically.

// Example 1:
// Input: moveTime = [[0,4],[4,4]]
// Output: 7
// Explanation:
// The minimum time required is 7 seconds.
// At time t == 4, move from room (0, 0) to room (1, 0) in one second.
// At time t == 5, move from room (1, 0) to room (1, 1) in two seconds.

// Example 2:
// Input: moveTime = [[0,0,0,0],[0,0,0,0]]
// Output: 6
// Explanation:
// The minimum time required is 6 seconds.
// At time t == 0, move from room (0, 0) to room (1, 0) in one second.
// At time t == 1, move from room (1, 0) to room (1, 1) in two seconds.
// At time t == 3, move from room (1, 1) to room (1, 2) in one second.
// At time t == 4, move from room (1, 2) to room (1, 3) in two seconds.

// Example 3:
// Input: moveTime = [[0,1],[1,2]]
// Output: 4

import { PriorityQueue } from '@datastructures-js/priority-queue';

interface State {
  x: number;
  y: number;
  dist: number;
  step: number; // 1 or 2
}

function minTimeToReach(moveTime: number[][]): number {
  const rows = moveTime.length;
  const cols = moveTime[0].length;
  const minTime: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity),
  );
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false),
  );
  const directions: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const pq = new PriorityQueue<State>((a, b) => a.dist - b.dist);

  minTime[0][0] = 0;
  pq.enqueue({ x: 0, y: 0, dist: 0, step: 1 });

  while (!pq.isEmpty()) {
    const { x, y, dist, step } = pq.dequeue()!;
    if (visited[x][y]) {
      continue;
    }
    visited[x][y] = true;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX < 0 || newX >= rows || newY < 0 || newY >= cols) {
        continue;
      }
      const newDist = Math.max(dist, moveTime[newX][newY]) + step;
      if (minTime[newX][newY] > newDist) {
        minTime[newX][newY] = newDist;
        pq.enqueue({
          x: newX,
          y: newY,
          dist: newDist,
          step: step === 1 ? 2 : 1,
        });
      }
    }
  }

  return minTime[rows - 1][cols - 1];
}

// slightly faster
function minTimeToReach2(moveTime: number[][]): number {
  const rows = moveTime.length;
  const cols = moveTime[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const pq = new PriorityQueue<[number, number, number, number]>(
    (a, b) => a[2] - b[2],
  );

  // [row, col, time, step]
  pq.enqueue([0, 0, 0, 1]);
  visited[0][0] = true;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (!pq.isEmpty()) {
    const [row, col, time, step] = pq.dequeue()!;

    // Early termination when destination is reached
    if (row === rows - 1 && col === cols - 1) return time;

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        !visited[newRow][newCol]
      ) {
        const newTime = Math.max(moveTime[newRow][newCol], time) + step;
        pq.enqueue([newRow, newCol, newTime, step === 1 ? 2 : 1]);
        visited[newRow][newCol] = true;
        // Marks cells as visited when enqueuing ay reduce the number of redundant entries in the queue
      }
    }
  }

  return -1; // In case destination is unreachable
}
