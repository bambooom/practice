// https://leetcode.com/problems/max-points-on-a-line/
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.
// #hash-table

// basically bruta-force
function maxPoints(points: number[][]): number {
  const n = points.length;
  if (n < 3) return n;
  let max = 0;

  for (let i = 0; i < n; i++) {
    const map = new Map<string, number>();
    map.set('base', 0);
    let samePoint = 0;
    let curMax = 0;
    for (let j = i + 1; j < n; j++) {
      if (points[i][0] == points[j][0] && points[i][1] == points[j][1]) {
        samePoint++;
      } else {
        const slope = getSlope(points[i], points[j]);
        map.set(slope, (map.get(slope) || 0) + 1);
        curMax = Math.max(curMax, map.get(slope) as number);
      }
    }
    max = Math.max(max, curMax + samePoint + 1);
  }

  return max;
}

function getGCD(a: number, b: number): number {
  return b === 0 ? a : getGCD(b, a % b);
}

function getSlope(p1: number[], p2: number[]) {
  let xDiff = p1[0] - p2[0];
  let yDiff = p1[1] - p2[1];
  if (xDiff === 0) return 'y';
  if (yDiff === 0) return 'x';
  const gcd = getGCD(xDiff, yDiff);
  xDiff /= gcd;
  yDiff /= gcd;
  return `${xDiff}/${yDiff}`;
}
