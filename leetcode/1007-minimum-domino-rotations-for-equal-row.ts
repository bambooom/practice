// https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/
// In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the ith domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)
// We may rotate the ith domino, so that tops[i] and bottoms[i] swap values.
// Return the minimum number of rotations so that all the values in tops are the same, or all the values in bottoms are the same.
// If it cannot be done, return -1.

// Example 1:
// Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
// Output: 2
// Explanation:
// The first figure represents the dominoes as given by tops and bottoms: before we do any rotations.
// If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.

// Example 2:
// Input: tops = [3,5,1,2,3], bottoms = [3,6,3,3,4]
// Output: -1
// Explanation:
// In this case, it is not possible to rotate the dominoes to make one row of values equal.

// https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/solutions/6709075/clear-solution-explanation-2-3ms-beats-83-33-100-o-n-space-o-1/?envType=daily-question&envId=2025-05-03
// To successfully unify the dominoes, the final unified number must come from the first domino, meaning it can only be either tops[0] or bottoms[0].
// For each candidate number, we iterate through all dominoes and count the number of rotations needed for the top or bottom:
// If a domino cannot match the candidate number on either top or bottom, then that candidate cannot achieve unification.
// Otherwise, we count the minimal number of rotations needed for either the top or the bottom.
// By separately calculating the rotations needed for the two candidates, we take the minimum as the answer; if neither can achieve unification, we return -1.
function minDominoRotations(tops: number[], bottoms: number[]): number {
  const candidates = [tops[0], bottoms[0]];

  // calculate the number of rotations needed to make all elements in the array equal to the target
  const rotations = (target: number) => {
    let rotateTop = 0;
    let rotateBottom = 0;

    for (let i = 0; i < tops.length; i++) {
      if (tops[i] !== target && bottoms[i] !== target) {
        return Infinity;
      }

      // Rotate the top or bottom to match the target
      if (tops[i] !== target) {
        rotateTop++;
      }

      if (bottoms[i] !== target) {
        rotateBottom++;
      }
    }

    return Math.min(rotateTop, rotateBottom);
  };

  const result = Math.min(rotations(candidates[0]), rotations(candidates[1]));
  return result === Infinity ? -1 : result;
}
