// https://leetcode.com/problems/the-maze
// There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.
// Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and destination = [destinationrow, destinationcol], return true if the ball can stop at the destination, otherwise return false.
// You may assume that the borders of the maze are all walls (see examples).

// https://leetcode.com/problems/the-maze/solutions/3914641/easy-to-understand-solution-with-graph-breadth-first-search-bfs-solution/?envType=study-plan-v2&envId=premium-algo-100
// We can think of the game map as a graph, but since the ball will not stop rolling until it reaches the border or a wall, when we build the adjecency list for each node, for each direction, we must keep going until we reach an obstacle. Give that, we can solve this problem using Breadth First Search (BFS), which has an added bonus of guaranteeing that the first time we reach the destination, it'll be the fastest route as well.
// OBS.: We should use memoization in order to not take looping paths into account.
//
// Approach:
// 1. Create a Set of strings to store the tiles we already walked. Since TypeScript cannot correctly judge whether or not an array is already in a Set, we will use the string representation of the array to store it memo = new Set<string>().
// 2. Initialize a queue with the starting tile in the map const q = [start]
// 3. While there are elements in the queue,
//   a. Get the first position from the queue
//   b. If the position is equal to the destination, return true (we can reach the goal)
//   c. If not, if we already visited this tile, continue on to the next position in the queue
//   d. Add the current position to the visited set
//   e. Add all the adjacent tiles the ball can reach in each direction. I have created an auxiliary function to calculate it, but if you prefer to do it directly in the while loop, that should work as well.
// 4. If we have reach the end of the queue, this means that even though the ball might be able to roll through the goal tile, it cannot stop in the destination position. Return false
function hasPath(
  maze: number[][],
  start: number[],
  destination: number[],
): boolean {
  const M = maze.length; // rows
  const N = maze[0].length; // cols

  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const getValidMoves = (pRow: number, pCol: number): number[][] => {
    const moves: number[][] = [];
    for (const [r, c] of directions) {
      let row = pRow,
        col = pCol;
      if (
        row + r < 0 ||
        row + r >= M ||
        col + c < 0 ||
        col + c >= N ||
        maze[row + r][col + c] === 1
      ) {
        continue;
      }

      while (
        row + r >= 0 &&
        row + r < M &&
        col + c >= 0 &&
        col + c < N &&
        maze[row + r][col + c] === 0
      ) {
        row += r;
        col += c;
      }

      moves.push([row, col]);
    }

    return moves;
  };

  const memo = new Set<string>();
  const queue: number[][] = [start];

  while (queue.length) {
    const [row, col] = queue.shift()!;

    if (row === destination[0] && col === destination[1]) {
      return true;
    }

    if (memo.has(`${row},${col}`)) {
      continue;
    }

    memo.add(`${row},${col}`);
    queue.push(...getValidMoves(row, col));
  }

  return false;
}
