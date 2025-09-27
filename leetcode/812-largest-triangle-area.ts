// https://leetcode.com/problems/largest-triangle-area
// Given an array of points on the X-Y plane points where points[i] = [xi, yi], return the area of the largest triangle that can be formed by any three different points. Answers within 10^(-5) of the actual answer will be accepted.

// Example 1:
// Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
// Output: 2.00000
// Explanation: The five points are shown in the above figure. The red triangle is the largest.

// Example 2:
// Input: points = [[1,0],[0,0],[0,1]]
// Output: 0.50000

// Constraints:
// 3 <= points.length <= 50
// -50 <= xi, yi <= 50
// All the given points are unique.

// Shoelace formula, polygon area fomulas
// triangle area, sums up the signed areas of the trapezoids formed by the x-axis and the polygon edges
// = |x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)| / 2
function largestTriangleArea(points: number[][]): number {
  let res = 0;
  const n = points.length;

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        const [[xi, yi], [xj, yj], [xk, yk]] = [
          points[i],
          points[j],
          points[k],
        ];
        res = Math.max(
          res,
          Math.abs(xi * (yj - yk) + xj * (yk - yi) + xk * (yi - yj)) / 2,
        );
      }
    }
  }

  return res;
}
