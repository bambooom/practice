// https://leetcode.com/problems/robot-bounded-in-circle/
// #simulation

// https://leetcode.com/problems/robot-bounded-in-circle/solutions/1678306/well-explained-linear-solution-1-loop-javascript-python-typescript-o-n-time-o-1-space/
// only two ways the robot can come back to its original location
// 1. The robot completed all the provided operations and made a loop in one iteration.
// 2. The robot is not on the origin spot, but heading to any direction different from its initial direction(North).
//     It can complete 1 or 3 additional iterations over the provided operations to make a loop.
//   Examples:
//     - can make a loop in 4 iterations "GGRG"
//     - can make a loop in 1 iteration (gets back to the origin) "GLGLGLG"
//       You might see it heads to a different direction and will go through a different path on the next iteration, but it's still a loop
//       can make a loop in 2 iterations "GGRGR"
//   - can't make a loop "GGRGL"

// T.C: O(N)
// S.C: O(1)
function isRobotBounded(instructions: string): boolean {
  const dirs = [
    [0, 1], // up
    [1, 0], // right
    [0, -1], // down
    [-1, 0], // left
  ];
  let head = 0;
  let x = 0;
  let y = 0;

  for (const instruction of instructions) {
    if (instruction === 'G') {
      x = x + dirs[head][0];
      y = y + dirs[head][1];
    } else if (instruction === 'L') {
      head = (4 + head - 1) % 4; // Left
    } else {
      head = (4 + head + 1) % 4; // Right
    }
  }
  const isAtOrigin = x === 0 && y === 0;
  const isHeadingNorth = head === 0;

  return isAtOrigin || !isHeadingNorth;
}
