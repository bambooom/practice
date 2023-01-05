// https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
// #greedy #sorting

function findMinArrowShots(points: number[][]): number {
  points.sort((a, b) => a[0] - b[0]); // sort by the starting point
  let prev: number | null = null;
  let count = 0;

  for (const [start, end] of points) {
    if (prev === null || prev < start) {
      count++;
      prev = end;
    } else {
      prev = Math.min(prev, end);
    }
  }

  return count;
}
