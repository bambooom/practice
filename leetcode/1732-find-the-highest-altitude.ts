// https://leetcode.com/problems/find-the-highest-altitude/

function largestAltitude(gain: number[]): number {
  let altitude = 0;
  let max = Number.MIN_VALUE;

  for (let i = 0; i < gain.length; i++) {
    altitude += gain[i];
    max = Math.max(max, altitude);
  }

  return max;
}
