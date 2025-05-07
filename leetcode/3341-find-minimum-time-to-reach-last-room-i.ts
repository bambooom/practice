// https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i/
// There is a dungeon with n x m rooms arranged as a grid.
// You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes exactly one second.
// Return the minimum time to reach the room (n - 1, m - 1).
// Two rooms are adjacent if they share a common wall, either horizontally or vertically.

// Example 1:
// Input: moveTime = [[0,4],[4,4]]
// Output: 6
// Explanation:
// The minimum time required is 6 seconds.
// At time t == 4, move from room (0, 0) to room (1, 0) in one second.
// At time t == 5, move from room (1, 0) to room (1, 1) in one second.

// Example 2:
// Input: moveTime = [[0,0,0],[0,0,0]]
// Output: 3
// Explanation:
// The minimum time required is 3 seconds.
// At time t == 0, move from room (0, 0) to room (1, 0) in one second.
// At time t == 1, move from room (1, 0) to room (1, 1) in one second.
// At time t == 2, move from room (1, 1) to room (1, 2) in one second.

// Example 3:
// Input: moveTime = [[0,1],[1,2]]
// Output: 3

// shortest path + dijkstra

import { PriorityQueue } from '@datastructures-js/priority-queue';

interface State {
  x: number;
  y: number;
  dist: number;
}

/**
 * Calculates the minimum time required to reach the bottom-right corner
 * of a grid from the top-left corner, given a grid of move times.
 * Each cell in the grid represents the minimum time in seconds to start moving
 * to that room. Moving between adjacent rooms takes exactly one second.
 * Uses Dijkstra's algorithm to find the shortest path.
 *
 * @param moveTime - A 2D array where moveTime[i][j] represents the minimum
 * time in seconds when you can start moving to room (i, j).
 * @returns The minimum time to reach the room (n - 1, m - 1).
 */

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
  const pq = new PriorityQueue<State>((a, b) => a.dist - b.dist); // order by distance

  minTime[0][0] = 0; // 起点(0,0)的距离设为0
  pq.enqueue({ x: 0, y: 0, dist: 0 }); // 将起点加入优先队列

  while (!pq.isEmpty()) {
    const { x, y } = pq.dequeue()!; // 从队列取出距离最小的状态
    if (visited[x][y]) {
      continue;
    }
    visited[x][y] = true;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      // check if newX, newY is out of bounds
      if (newX < 0 || newX >= rows || newY < 0 || newY >= cols) {
        continue;
      }
      // calculate new distance
      const newDist = Math.max(minTime[x][y], moveTime[newX][newY]) + 1;
      // if new distance is smaller than current distance, update distance and enqueue new state
      if (minTime[newX][newY] > newDist) {
        minTime[newX][newY] = newDist;
        pq.enqueue({ x: newX, y: newY, dist: newDist });
      }
    }
  }

  return minTime[rows - 1][cols - 1];
}
