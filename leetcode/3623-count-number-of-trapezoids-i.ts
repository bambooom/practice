// https://leetcode.com/problems/count-number-of-trapezoids-i
// You are given a 2D integer array points, where points[i] = [xi, yi] represents the coordinates of the ith point on the Cartesian plane.
// A horizontal trapezoid is a convex quadrilateral with at least one pair of horizontal sides (i.e. parallel to the x-axis). Two lines are parallel if and only if they have the same slope.
// Return the number of unique horizontal trapezoids that can be formed by choosing any four distinct points from points.
// Since the answer may be very large, return it modulo 10^9 + 7.

// Example 1:
// Input: points = [[1,0],[2,0],[3,0],[2,2],[3,2]]
// Output: 3
// Explanation:
// There are three distinct ways to pick four points that form a horizontal trapezoid:
// Using points [1,0], [2,0], [3,2], and [2,2].
// Using points [2,0], [3,0], [3,2], and [2,2].
// Using points [1,0], [3,0], [3,2], and [2,2].

// Example 2:
// Input: points = [[0,0],[1,0],[0,1],[2,1]]
// Output: 1
// Explanation:
// There is only one horizontal trapezoid that can be formed.

// Constraints:
// 4 <= points.length <= 10^5
// –10^8 <= xi, yi <= 10^8
// All points are pairwise distinct.

function countTrapezoids(points: number[][]): number {
  const MOD = 1000000007n; // bigint
  // Create a map to store the count of points at each y-coordinate
  const mp = new Map<number, bigint>();

  for (const [x, y] of points) {
    // Update the count in the map for each y-coordinate
    mp.set(y, (mp.get(y) ?? 0n) + 1n);
  }

  // Create an array to store the number of combinations of two points at each y-coordinate
  const seg: bigint[] = [];
  for (const k of mp.values()) {
    if (k >= 2n) {
      // Calculate the number of combinations and add it to the seg array
      seg.push(((k * (k - 1n)) / 2n) % MOD);
    }
  }

  let sum = 0n;
  let ans = 0n;
  for (const v of seg) {
    // Update the answer by multiplying the current value with the sum and taking modulo
    ans = (ans + v * sum) % MOD;
    // Update the sum by adding the current value to it
    sum = (sum + v) % MOD;
  }

  return Number(ans);
}
