// https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/
// #bfs

// Algorithm
// 1. Initialize an empty queue queue to store all the nodes to be visited.
// 2. Add entrance and its distance 000 to queue and mark entrance as visited.
// 3. While we don't reach an exit and queue still has cells, pop the first cell from queue. Suppose its distance from entrance is curr_distance. We check its neighboring cells in all four directions, if it has an unvisited neighbor cell:
//   - If this neighbor cell is an exit, return its distance from the starting position, curr_distance + 1, as the nearest distance.
//   - Otherwise, we mark it as visited, and add it to queue along with its distance curr_distance + 1.
// 4. If we finish the iteration and no exit is found, return -1.

// https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/solutions/2834714/javascript-neat-bfs/?envType=study-plan-v2&envId=leetcode-75
function nearestExit(maze: string[][], entrance: number[]): number {
  const [y0, x0] = entrance;
  maze[y0][x0] = '@';
  const queue = [[y0, x0, 0]];

  while (queue.length) {
    const [y, x, step] = queue.shift()!;
    for (const [dy, dx] of [
      [-1, 0], // up
      [0, -1], // left
      [1, 0], // down
      [0, 1], // right
    ]) {
      const ny = y + dy,
        nx = x + dx;
      if (!maze[ny] || !maze[ny][nx]) {
        if (step) return step;
      } else if (maze[ny][nx] === '.') {
        queue.push([ny, nx, step + 1]);
        maze[ny][nx] = '*';
      }
    }
  }

  return -1;
}

// https://leet-codes.blogspot.com/2022/11/nearest-exit-from-entrance-in-maze.html
const dx = [1, -1, 0, 0],
  dy = [0, 0, 1, -1];
const initialize2DArrayNew = (n: number, m: number) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    const tmp = Array(m).fill(Number.MAX_SAFE_INTEGER);
    data.push(tmp);
  }
  return data;
};
const nearestExit2 = (g: string[][], entrance: number[]): number => {
  const [n, m, ex, ey] = [g.length, g[0].length, entrance[0], entrance[1]];
  const dis = initialize2DArrayNew(n, m);
  const q: number[][] = [];
  for (let i = 0; i < n; i++) {
    // find all exits
    for (let j = 0; j < m; j++) {
      if ((i == ex && j == ey) || g[i][j] == '+') continue;
      if (i == 0 || i == n - 1 || j == 0 || j == m - 1) {
        q.push([i, j]);
        dis[i][j] = 0; // reset to 0 for calculating the min path
      }
    }
  }
  while (q.length) {
    // bfs
    const cur = q.shift()!;
    const [x, y] = cur;
    for (let k = 0; k < 4; k++) {
      const xx = x + dx[k];
      const yy = y + dy[k];
      if (xx < 0 || xx >= n || yy < 0 || yy >= m || g[xx][yy] == '+') continue; // out of bound or wall
      if (dis[xx][yy] > dis[x][y] + 1) {
        // update min path
        dis[xx][yy] = dis[x][y] + 1;
        q.push([xx, yy]);
      }
    }
  }
  const res = dis[ex][ey];
  return res == Number.MAX_SAFE_INTEGER ? -1 : res;
};
