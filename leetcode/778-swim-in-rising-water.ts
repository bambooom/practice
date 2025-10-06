// https://leetcode.com/problems/swim-in-rising-water
// You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).
// It starts raining, and water gradually rises over time. At time t, the water level is t, meaning any cell with elevation less than equal to t is submerged or reachable.
// You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.
// Return the minimum time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).

// Example 1:
// Input: grid = [[0,2],[1,3]]
// Output: 3
// Explanation:
// At time 0, you are in grid location (0, 0).
// You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
// You cannot reach point (1, 1) until time 3.
// When the depth of water is 3, we can swim anywhere inside the grid.

// Example 2:
// Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
// Output: 16
// Explanation: The final route is shown.
// We need to wait until time 16 so that (0, 0) and (4, 4) are connected.

// Constraints:
// n == grid.length
// n == grid[i].length
// 1 <= n <= 50
// 0 <= grid[i][j] < n^2
// Each value grid[i][j] is unique.

// https://leetcode.com/problems/swim-in-rising-water/solutions/6629494/heap-based-approach-in-typescript/?envType=daily-question&envId=2025-10-06
// Conceptually, the time to reach each cell is max(currTime, grid[row][col]), using this principle use heaps to enqueue cells that can be reached the fastest from current cell.
// Use a min heap to reach cells that are closest to the current cell and then explore the cells closest to that cell while keeping a track of visited cells. When we reach n - 1, n - 1 time can be returned.
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

function swimInWater(grid: number[][]): number {
  const [rows, cols] = [grid.length, grid[0].length];
  const directions: number[][] = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
  ];

  // Create a min-heap to store the cells that are yet to be visited
  const heap = new MinPriorityQueue<[number, number, number]>((el) => el[0]);
  // Initialize the heap with the top-left cell of the grid
  heap.enqueue([grid[0][0], 0, 0]);

  // Create a set to keep track of the visited cells
  const visited: Set<string> = new Set<string>();

  // Loop until the heap is empty
  while (heap.size() > 0) {
    // Dequeue a cell from the heap and mark it as visited
    const [time, row, col] = heap.dequeue();
    visited.add(row + ',' + col);

    // If the dequeued cell is the bottom-right cell, return the time taken to reach it
    if (row === rows - 1 && col === cols - 1) {
      return time;
    }

    // Iterate over the possible directions
    for (const [ar, ac] of directions) {
      // Calculate the coordinates of the neighboring cell
      const [nr, nc] = [ar + row, ac + col];

      // Check if the neighboring cell is within the grid boundaries and has not been visited
      if (
        nr < 0 ||
        nc < 0 ||
        nr >= rows ||
        nc >= cols ||
        visited.has(nr + ',' + nc)
      ) {
        continue;
      }

      // Enqueue the neighboring cell in the heap with the maximum time between the current time and the value of the neighboring cell
      heap.enqueue([Math.max(time, grid[nr][nc]), nr, nc]);
    }
  }

  // If the heap becomes empty without reaching the bottom-right cell, it means that it's not possible to reach the cell
  return -1;
}
