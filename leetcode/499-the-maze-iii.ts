// https://leetcode.com/problems/the-maze-iii/
// There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction. There is also a hole in this maze. The ball will drop into the hole if it rolls onto the hole.
// Given the m x n maze, the ball's position ball and the hole's position hole, where ball = [ballrow, ballcol] and hole = [holerow, holecol], return a string instructions of all the instructions that the ball should follow to drop in the hole with the shortest distance possible. If there are multiple valid instructions, return the lexicographically minimum one. If the ball can't drop in the hole, return "impossible".
// If there is a way for the ball to drop in the hole, the answer instructions should contain the characters 'u' (i.e., up), 'd' (i.e., down), 'l' (i.e., left), and 'r' (i.e., right).
// The distance is the number of empty spaces traveled by the ball from the start position (excluded) to the destination (included).
// You may assume that the borders of the maze are all walls (see examples).

// https://leetcode.com/problems/the-maze-iii/solutions/1588599/javascript-bfs/?envType=study-plan-v2&envId=premium-algo-100
function findShortestWay(
  maze: number[][],
  ball: number[],
  hole: number[],
): string {
  const queue = [
    {
      row: ball[0],
      col: ball[1],
      distance: 0,
      path: '',
    },
  ];
  const seen: Record<string, number> = {
    [`${ball[0]}-${ball[1]}`]: 0,
  };

  let minToHole = Infinity;
  const paths: string[] = [];

  const directions = ['d', 'u', 'l', 'r'] as const;
  type Directions = (typeof directions)[number];

  const rollToNextPosition = (
    direction: Directions,
    row: number,
    col: number,
    maze: number[][],
    hole: number[],
  ) => {
    const moves = {
      l: [0, -1],
      r: [0, 1],
      u: [-1, 0],
      d: [1, 0],
    };
    const move = moves[direction];

    let distance = 0;

    // check next move
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const newRow = row + move[0];
      const newCol = col + move[1];

      if (
        newRow < 0 ||
        newRow > maze.length - 1 ||
        newCol < 0 ||
        newCol > maze[0].length - 1 ||
        maze[newRow][newCol] === 1
      ) {
        return {
          nr: row,
          nc: col,
          nd: distance,
        };
      }

      distance++;

      row = newRow;
      col = newCol;
      if (row === hole[0] && col === hole[1]) {
        return {
          nr: row,
          nc: col,
          nd: distance,
        };
      }
    }
  };

  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) {
      const { row, col, distance, path } = queue.shift()!;

      for (const direction of directions) {
        // eslint-disable-next-line prefer-const
        let { nr, nc, nd } = rollToNextPosition(
          direction,
          row,
          col,
          maze,
          hole,
        );

        if (nd === 0) continue;

        nd += distance;

        if (`${nr}-${nc}` in seen && seen[`${nr}-${nc}`] < nd) continue;

        if (nr === hole[0] && nc === hole[1]) {
          if (nd < minToHole) {
            minToHole = nd;
            paths.length = 0;
            paths.push(path + direction);
          } else if (nd === minToHole) {
            paths.push(path + direction);
          }

          continue;
        }

        seen[`${nr}-${nc}`] = nd;
        queue.push({ row: nr, col: nc, distance: nd, path: path + direction });
      }
    }
  }

  return paths.length > 0 ? paths.sort()[0] : 'impossible';
}
