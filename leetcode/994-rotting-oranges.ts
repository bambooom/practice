// https://leetcode.com/problems/rotting-oranges/
// You are given an m x n grid where each cell can have one of three values:

// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

// Apprioach 1 - Breadth-First Search (BFS)
// time O(mn) space O(mn)
function orangesRotting(grid: number[][]): number {
  let minutes = 0;
  const directions: { x: number; y: number }[] = [
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];

  const freshArray: string[] = [];
  const rottenArray: string[] = [];

  grid.forEach((row, rowIndex) => {
    row.forEach((val, gridIndex) => {
      if (val === 1) {
        freshArray.push(rowIndex.toString(10) + gridIndex.toString(10));
      } else if (val === 2) {
        rottenArray.push(rowIndex.toString(10) + gridIndex.toString(10));
      }
    });
  });

  const rot = (i: string, j: string) => {
    const val = i + j;
    const index = freshArray.indexOf(val);
    if (index !== -1) {
      const removed: string[] = freshArray.splice(index, 1);
      rottenArray.push(removed[0]);
    }
  };

  let flag = 0;
  while (freshArray.length > 0 && freshArray.length !== flag) {
    flag = freshArray.length;
    minutes++;
    rottenArray.forEach((rotten) => {
      const i = parseInt(rotten[0]);
      const j = parseInt(rotten[1]);
      directions.forEach(({ x, y }) =>
        rot((i + x).toString(10), (j + y).toString(10)),
      );
    });
  }

  return freshArray.length > 0 ? -1 : minutes;
}

const orangesRotting2 = function (grid: number[][]) {
  // get rows and cols length
  const rows = grid.length,
    cols = grid[0].length;

  // define neighbor directions for rows and cols
  const rowDirections = [1, -1, 0, 0],
    colDirections = [0, 0, 1, -1];

  // define our que as row, col tuples
  let queue: [number, number][] = [],
    // initialize minute and #of fresh oranges
    minute = 0,
    fresh = 0;

  // loop thorugh matrix
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // if we find rot, we push to queue
      if (grid[r][c] === 2) {
        queue.push([r, c]);
      }

      // if orange is fresh
      else if (grid[r][c] === 1) {
        // we found a fresh orange
        fresh++;
      }
    }
  }

  // loop through while there are fresh oranges and a queue
  while (fresh && queue.length) {
    // look at next
    const next: [number, number][] = [];

    // go through quue
    for (const [row, col] of queue) {
      // looking at neighbors
      for (let i = 0; i < rowDirections.length; i++) {
        const rowNeighbor = row + rowDirections[i],
          colNeighbor = col + colDirections[i];

        // checks to see if in bounds or if there are fresh oranges as neighbors
        if (
          rowNeighbor < rows &&
          rowNeighbor >= 0 &&
          colNeighbor < cols &&
          colNeighbor >= 0 &&
          grid[rowNeighbor][colNeighbor] === 1
        ) {
          // one less fresh orange
          fresh--;

          // update this to be a rotten orange in grid
          grid[rowNeighbor][colNeighbor] = 2;

          // add to next
          next.push([rowNeighbor, colNeighbor]);
        }
      }
    }

    // after looking at all directions, increment our timer
    minute++;

    // update our queue
    queue = next;
  }

  // if we still have fresh oranges, -1 else return time
  return fresh ? -1 : minute;
};

// Approach 2 - in-place BFS
