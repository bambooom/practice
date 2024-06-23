// the-maze-ii
// There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.
// Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and destination = [destinationrow, destinationcol], return the shortest distance for the ball to stop at the destination. If the ball cannot stop at destination, return -1.
// The distance is the number of empty spaces traveled by the ball from the start position (excluded) to the destination (included).
// You may assume that the borders of the maze are all walls (see examples).

// https://leetcode.com/problems/the-maze-ii/solutions/4146894/typescript-bfs/?envType=study-plan-v2&envId=premium-algo-100
function shortestDistance(
  maze: number[][],
  start: number[],
  destination: number[],
): number {
  const Y = maze.length - 1;
  const X = maze[0].length - 1;

  const data: number[][][] = [];
  for (let y = 0; y <= Y; ++y) {
    data[y] = [];
    for (let x = 0; x <= X; ++x) {
      data[y][x] = [Infinity, y, y, x, x];
      data[y][x][3] = x > 0 && maze[y][x - 1] === 0 ? data[y][x - 1][3] : x;
      data[y][x][1] = y > 0 && maze[y - 1][x] === 0 ? data[y - 1][x][1] : y;
    }
  }

  for (let y = Y; y >= 0; --y) {
    for (let x = X; x >= 0; --x) {
      data[y][x][4] = x < X && maze[y][x + 1] === 0 ? data[y][x + 1][4] : x;
      data[y][x][2] = y < Y && maze[y + 1][x] === 0 ? data[y + 1][x][2] : y;
    }
  }

  const q: number[][] = [[start[0], start[1], 0]];

  do {
    const N = q.length;
    for (let i = 0; i < N; ++i) {
      const [y, x, distance] = q[i];
      if (data[y][x][0] <= distance) {
        continue;
      }

      data[y][x][0] = distance;
      if (y === destination[0] && x === destination[1]) {
        continue;
      }
      let z = data[y][x][1];
      q.push([z, x, distance + y - z]);
      z = data[y][x][2];
      q.push([z, x, distance + z - y]);
      z = data[y][x][3];
      q.push([y, z, distance + x - z]);
      z = data[y][x][4];
      q.push([y, z, distance + z - x]);
    }
    q.splice(0, N);
  } while (q.length > 0);

  const distance = data[destination[0]][destination[1]][0];
  return isFinite(distance) ? distance : -1;
}
