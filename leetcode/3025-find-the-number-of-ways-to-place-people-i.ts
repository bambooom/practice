// https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i/
// You are given a 2D array points of size n x 2 representing integer coordinates of some points on a 2D plane, where points[i] = [xi, yi].
// Count the number of pairs of points (A, B), where
// A is on the upper left side of B, and
// there are no other points in the rectangle (or line) they make (including the border).
// Return the count.

// Example 1:
// Input: points = [[1,1],[2,2],[3,3]]
// Output: 0
// Explanation:
// There is no way to choose A and B so A is on the upper left side of B.

// Example 2:
// Input: points = [[6,2],[4,4],[2,6]]
// Output: 2
// Explanation:
// The left one is the pair (points[1], points[0]), where points[1] is on the upper left side of points[0] and the rectangle is empty.
// The middle one is the pair (points[2], points[1]), same as the left one it is a valid pair.
// The right one is the pair (points[2], points[0]), where points[2] is on the upper left side of points[0], but points[1] is inside the rectangle so it's not a valid pair.

// Example 3:
// Input: points = [[3,1],[1,3],[1,1]]
// Output: 2
// Explanation:
// The left one is the pair (points[2], points[0]), where points[2] is on the upper left side of points[0] and there are no other points on the line they form. Note that it is a valid state when the two points form a line.
// The middle one is the pair (points[1], points[2]), it is a valid pair same as the left one.
// The right one is the pair (points[1], points[0]), it is not a valid pair as points[2] is on the border of the rectangle.

// Constraints:
// 2 <= n <= 50
// points[i].length == 2
// 0 <= points[i][0], points[i][1] <= 50
// All points[i] are distinct.

function numberOfPairs(points: number[][]): number {
  // sorting the points by x ascending and y descending
  points.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  const n = points.length;
  let result = 0;

  for (let i = 0; i < n; i++) {
    // Initialize the top and bottom y-coordinates for the current point
    let top = points[i][1];
    let bot = -Infinity;

    // Check the points to the right of the current point
    for (let j = i + 1; j < n; j++) {
      // Get the y-coordinate of the current point to the right
      let y = points[j][1];

      // If the y-coordinate is within the range [bot, top], increment the result and update bot
      if (bot < y && y <= top) {
        result++;
        bot = y;

        // If bot equals top, we can stop checking points to the right
        if (bot === top) break;
      }
    }
  }

  return result;
}

// editorial
function numberOfPairs2(points: number[][]): number {
  let ans = 0;
  let n = points.length;
  for (let i = 0; i < points.length; i++) {
    const pointA = points[i];
    for (let j = 0; j < points.length; j++) {
      const pointB = points[j];
      if (i === j || !(pointA[0] <= pointB[0] && pointA[1] >= pointB[1])) {
        continue;
      }

      if (points.length === 2) {
        ans++;
        continue;
      }

      let illegal = false;

      for (const pointTmp of points) {
        if (pointA === pointTmp || pointB === pointTmp) {
          continue;
        }

        const isXContained =
          pointTmp[0] >= pointA[0] && pointTmp[0] <= pointB[0];
        const isYContained =
          pointTmp[1] <= pointA[1] && pointTmp[1] >= pointB[1];

        illegal = isXContained && isYContained;

        if (illegal) {
          break;
        }
      }

      if (!illegal) {
        ans++;
      }
    }
  }

  return ans;
}
