// https://leetcode.com/problems/best-sightseeing-pair/
// You are given an integer array values where values[i] represents the value of the ith sightseeing spot. Two sightseeing spots i and j have a distance j - i between them.
// The score of a pair (i < j) of sightseeing spots is values[i] + values[j] + i - j: the sum of the values of the sightseeing spots, minus the distance between them.
// Return the maximum score of a pair of sightseeing spots.

// Example 1:
// Input: values = [8,1,5,2,6]
// Output: 11
// Explanation: i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11

// Example 2:
// Input: values = [1,2]
// Output: 2

function maxScoreSightseeingPair(values: number[]): number {
  let max = 0;
  let score = values[0];

  for (let i = 1; i < values.length; i++) {
    --score;
    if (score + values[i] > max) {
      max = score + values[i];
    }
    if (values[i] > score) {
      score = values[i];
    }
  }

  return max;
}

// https://leetcode.com/problems/best-sightseeing-pair/solutions/6191154/o-n-solution-beat-100-time-complexity/
// picl 2 number to calculate the best pair and the first number will be decreased by 1 everytime we check for the next number
function maxScoreSightseeingPair2(values: number[]): number {
  let num = values[0],
    max = -Infinity;
  for (let i = 1; i < values.length; i++) {
    max = Math.max(max, num + values[i] - 1);
    num = Math.max(values[i], num - 1);
  }
  return max;
}
