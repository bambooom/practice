// https://leetcode.com/problems/move-pieces-to-obtain-a-string
// You are given two strings start and target, both of length n. Each string consists only of the characters 'L', 'R', and '_' where:
// The characters 'L' and 'R' represent pieces, where a piece 'L' can move to the left only if there is a blank space directly to its left, and a piece 'R' can move to the right only if there is a blank space directly to its right.
// The character '_' represents a blank space that can be occupied by any of the 'L' or 'R' pieces.
// Return true if it is possible to obtain the string target by moving the pieces of the string start any number of times. Otherwise, return false.

// Example 1:
// Input: start = "_L__R__R_", target = "L______RR"
// Output: true
// Explanation: We can obtain the string target from start by doing the following moves:
// - Move the first piece one step to the left, start becomes equal to "L___R__R_".
// - Move the last piece one step to the right, start becomes equal to "L___R___R".
// - Move the second piece three steps to the right, start becomes equal to "L______RR".
// Since it is possible to get the string target from start, we return true.

// Example 2:
// Input: start = "R_L_", target = "__LR"
// Output: false
// Explanation: The 'R' piece in the string start can move one step to the right to obtain "_RL_".
// After that, no pieces can move anymore, so it is impossible to obtain the string target from start.

// Example 3:
// Input: start = "_R", target = "R_"
// Output: false
// Explanation: The piece in the string start can move only to the right, so it is impossible to obtain the string target from start.

// https://leetcode.com/problems/move-pieces-to-obtain-a-string/solutions/6114504/100-beats-short-simple/
function canChange(start: string, target: string): boolean {
  if (start === target) return true;

  let waitL = 0,
    waitR = 0;

  for (let i = 0; i < start.length; i++) {
    const curr = start[i];
    const goal = target[i];

    if (curr === 'R') {
      // if R on start, waitL not zero, return false, since R can't jump over L
      if (waitL > 0) {
        return false;
      }
      waitR++;
    }
    if (goal === 'L') {
      // L in target, waitR not zero, return false, since L can't jump over R
      if (waitR > 0) {
        return false;
      }
      waitL++;
    }
    if (goal === 'R') {
      // R in target, ig no waiting R, return false, since nothing to move
      if (waitR === 0) {
        return false;
      }
      waitR--;
    }
    if (curr === 'L') {
      // L in start, ig no waiting L, return false, since nothing to move
      if (waitL === 0) {
        return false;
      }
      waitL--;
    }
  }
  // L and R are matched then true
  return waitL === 0 && waitR === 0;
}
