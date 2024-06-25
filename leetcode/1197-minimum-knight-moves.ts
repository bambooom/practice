// https://leetcode.com/problems/minimum-knight-moves
// In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square [0, 0].
// A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.
// 国际象棋的马的走路规则
// Return the minimum number of steps needed to move the knight to the square [x, y]. It is guaranteed the answer exists.

// Example 1:
// Input: x = 2, y = 1
// Output: 1
// Explanation: [0, 0] → [2, 1]

// Example 2:
// Input: x = 5, y = 5
// Output: 4
// Explanation: [0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]

// https://leetcode.com/problems/minimum-knight-moves/solutions/4235696/optimized-bfs/?envType=study-plan-v2&envId=premium-algo-100
function minKnightMoves(x: number, y: number): number {
  /* eslint-disable */
  const MOVES = [
            [2, -1],    [2, 1],
    [1, -2],                    [1, 2],
                   //0,0
    [-1, -2],                   [-1, 2],
            [-2, -1],   [-2, 1]
  ];
  /* eslint-enable */
  const q: number[][] = [[0, 0]];
  const seen = new Set<string>();

  let steps = 0;
  do {
    const N = q.length;
    for (let i = 0; i < N; ++i) {
      const [r, c] = q[i];
      if (r === y && c === x) {
        return steps;
      }

      for (let [dr, dc] of MOVES) {
        const key = `${(dr += r)},${(dc += c)}`;
        if (!seen.has(key)) {
          seen.add(key);
          q.push([dr, dc]);
        }
      }
    }
    steps++;
    q.splice(0, N);
  } while (q.length > 0);

  return steps;
}

// optimized bfs
function minKnightMoves2(x: number, y: number): number {
  const MOVES = [
    [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [1, -2],
    ], // Down + Left
    [
      [-2, -1],
      [-2, 1],
      [-1, 2],
      [1, 2],
    ], // Down + Right
    [
      [2, -1],
      [2, 1],
      [-1, -2],
      [1, -2],
    ], // Up + Left
    [
      [2, -1],
      [2, 1],
      [-1, 2],
      [1, 2],
    ], // Up + Right
  ];

  const MIN = -300; // Inclusive
  const MAX = 300; // Inclusive

  const q: number[][] = [[0, 0]];
  const seen = new Set<number>();
  const RANGE = MAX - MIN;

  const steps = 0;
  do {
    const N = q.length;
    for (let i = 0; i < N; ++i) {
      const [r, c] = q[i];
      if (r === y && c === x) {
        return steps;
      }
      for (const [dr, dc] of MOVES[+(r <= y) * 2 + +(c <= x)]) {
        const key = (r + dr - MIN) * RANGE + c + dc - MIN;
        if (!seen.has(key)) {
          seen.add(key);
          q.push([r + dr, c + dc]);
        }
      }
    }
  } while (q.length > 0);

  return steps;
}
