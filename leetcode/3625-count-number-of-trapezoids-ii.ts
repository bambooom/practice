// https://leetcode.com/problems/count-number-of-trapezoids-ii/
// You are given a 2D integer array points where points[i] = [xi, yi] represents the coordinates of the ith point on the Cartesian plane.
// Return the number of unique trapezoids that can be formed by choosing any four distinct points from points.
// A trapezoid is a convex quadrilateral with at least one pair of parallel sides. Two lines are parallel if and only if they have the same slope.

// Example 1:
// Input: points = [[-3,2],[3,0],[2,3],[3,2],[2,-3]]
// Output: 2
// Explanation:
// There are two distinct ways to pick four points that form a trapezoid:
// The points [-3,2], [2,3], [3,2], [2,-3] form one trapezoid.
// The points [2,3], [3,2], [3,0], [2,-3] form another trapezoid.

// Example 2:
// Input: points = [[0,0],[1,0],[0,1],[2,1]]
// Output: 1
// Explanation:
// There is only one trapezoid which can be formed.

// Constraints:
// 4 <= points.length <= 500
// –1000 <= xi, yi <= 1000
// All points are pairwise distinct.

function countTrapezoidsII(points: number[][]): number {
  // t map is used to store information about the trapezoids that have their left side parallel to the x-axis
  // The keys of the t map are calculated based on the slope and intercept of the line formed by the points.
  // The values of the t map store the count of trapezoids with the same key.
  const t: Map<number, Map<number, number>> = new Map();
  // v map is used to store information about the trapezoids that have their left side parallel to the y-axis.
  // The keys of the v map are calculated similarly to the t map, but with a different calculation for the key values.
  const v: Map<number, Map<number, number>> = new Map();
  const n = points.length;

  // Increments the count of a specific key-value pair in a map.
  const add = (
    map: Map<number, Map<number, number>>,
    key: number,
    des: number,
  ) => {
    if (!map.has(key)) {
      map.set(key, new Map());
    }
    const inner = map.get(key)!;
    inner.set(des, (inner.get(des) ?? 0) + 1);
  };

  // Calculates the greatest common divisor of two numbers.
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const tmp = a % b;
      a = b;
      b = tmp;
    }
    return a;
  };

  // Calculates the total count of trapezoids based on the values in a map.
  const count = (map: Map<number, Map<number, number>>): number => {
    let ans = 0;

    for (const inner of map.values()) {
      let total = 0;
      for (const val of inner.values()) {
        total += val;
      }

      let rem = total;
      for (const val of inner.values()) {
        rem -= val;
        ans += val * rem;
      }
    }

    return ans;
  };

  // Iterate over all pairs of points.
  for (let i = 0; i < n; i++) {
    const [x1, y1] = points[i];

    for (let j = i + 1; j < n; j++) {
      const [x2, y2] = points[j];

      let dx = x2 - x1;
      let dy = y2 - y1;

      // If the coordinates are in the opposite quadrants, swap them.
      if (dx < 0 || (dx === 0 && dy < 0)) {
        dx = -dx;
        dy = -dy;
      }

      const g = gcd(dx, Math.abs(dy));
      // Normalize the slope and intercept.
      const sx = dx / g;
      const sy = dy / g;

      // Calculate the intercept of the line.
      const des = sx * y1 - sy * x1;

      // Calculate the key values for the t and v maps.
      const key1 = (sx << 12) | (sy + 2000);
      const key2 = (dx << 12) | (dy + 2000);

      add(t, key1, des);
      add(v, key2, des);
    }
  }

  // Calculate the total count of trapezoids from the t map.
  const tCount = count(t);

  // Calculate the total count of trapezoids from the v map, divided by 2 (rounded down).
  const vCount = Math.floor(count(v) / 2);

  // Return the difference between the counts.
  return tCount - vCount;
}
