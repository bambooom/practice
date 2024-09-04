// https://leetcode.com/problems/walking-robot-simulation
// A robot on an infinite XY-plane starts at point (0, 0) facing north. The robot can receive a sequence of these three possible types of commands:
// -2: Turn left 90 degrees.
// -1: Turn right 90 degrees.
// 1 <= k <= 9: Move forward k units, one unit at a time.
// Some of the grid squares are obstacles. The ith obstacle is at grid point obstacles[i] = (xi, yi). If the robot runs into an obstacle, then it will instead stay in its current location and move on to the next command.
// Return the maximum Euclidean distance that the robot ever gets from the origin squared (i.e. if the distance is 5, return 25).

// Note:
// North means +Y direction.
// East means +X direction.
// South means -Y direction.
// West means -X direction.
// There can be obstacle in [0,0].

// Example 1:
// Input: commands = [4,-1,3], obstacles = []
// Output: 25
// Explanation: The robot starts at (0, 0):
// 1. Move north 4 units to (0, 4).
// 2. Turn right.
// 3. Move east 3 units to (3, 4).
// The furthest point the robot ever gets from the origin is (3, 4), which squared is 32 + 42 = 25 units away.
// Example 2:
// Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
// Output: 65
// Explanation: The robot starts at (0, 0):
// 1. Move north 4 units to (0, 4).
// 2. Turn right.
// 3. Move east 1 unit and get blocked by the obstacle at (2, 4), robot is at (1, 4).
// 4. Turn left.
// 5. Move north 4 units to (1, 8).
// The furthest point the robot ever gets from the origin is (1, 8), which squared is 12 + 82 = 65 units away.

function robotSim(commands: number[], obstacles: number[][]): number {
  const movements = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const obstaclesMap = new Map<number, Set<number>>();
  obstacles.forEach(([x, y]) => {
    if (!obstaclesMap.has(x)) {
      obstaclesMap.set(x, new Set());
    }
    obstaclesMap.get(x)!.add(y);
  });

  let direction = 0;
  let x = 0;
  let y = 0;
  let max = 0;

  for (const command of commands) {
    if (command < 0) {
      direction = (direction + (command === -1 ? 1 : 3)) % 4;
      continue;
    }

    for (let i = 0; i < command; i++) {
      const nextX = x + movements[direction][0];
      const nextY = y + movements[direction][1];

      if (obstaclesMap.get(nextX)?.has(nextY)) {
        break;
      }

      x = nextX;
      y = nextY;
    }
    max = Math.max(max, Math.abs(x) ** 2 + Math.abs(y) ** 2);
  }

  return max;
}
