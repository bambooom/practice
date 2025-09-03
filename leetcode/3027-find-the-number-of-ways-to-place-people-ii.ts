// https://leetcode.com/problems/find-the-number-of-ways-to-place-people-ii/
// You are given a 2D array points of size n x 2 representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].
// We define the right direction as positive x-axis (increasing x-coordinate) and the left direction as negative x-axis (decreasing x-coordinate). Similarly, we define the up direction as positive y-axis (increasing y-coordinate) and the down direction as negative y-axis (decreasing y-coordinate)
// You have to place n people, including Alice and Bob, at these points such that there is exactly one person at every point. Alice wants to be alone with Bob, so Alice will build a rectangular fence with Alice's position as the upper left corner and Bob's position as the lower right corner of the fence (Note that the fence might not enclose any area, i.e. it can be a line). If any person other than Alice and Bob is either inside the fence or on the fence, Alice will be sad.
// Return the number of pairs of points where you can place Alice and Bob, such that Alice does not become sad on building the fence.
// Note that Alice can only build a fence with Alice's position as the upper left corner, and Bob's position as the lower right corner. For example, Alice cannot build either of the fences in the picture below with four corners (1, 1), (1, 3), (3, 1), and (3, 3), because:
// With Alice at (3, 3) and Bob at (1, 1), Alice's position is not the upper left corner and Bob's position is not the lower right corner of the fence.
// With Alice at (1, 3) and Bob at (1, 1), Bob's position is not the lower right corner of the fence.

// Example 1:
// Input: points = [[1,1],[2,2],[3,3]]
// Output: 0
// Explanation: There is no way to place Alice and Bob such that Alice can build a fence with Alice's position as the upper left corner and Bob's position as the lower right corner. Hence we return 0.

// Example 2:
// Input: points = [[6,2],[4,4],[2,6]]
// Output: 2
// Explanation: There are two ways to place Alice and Bob such that Alice will not be sad:
// - Place Alice at (4, 4) and Bob at (6, 2).
// - Place Alice at (2, 6) and Bob at (4, 4).
// You cannot place Alice at (2, 6) and Bob at (6, 2) because the person at (4, 4) will be inside the fence.

// Example 3:
// Input: points = [[3,1],[1,3],[1,1]]
// Output: 2
// Explanation: There are two ways to place Alice and Bob such that Alice will not be sad:
// - Place Alice at (1, 1) and Bob at (3, 1).
// - Place Alice at (1, 3) and Bob at (1, 1).
// You cannot place Alice at (1, 3) and Bob at (3, 1) because the person at (1, 1) will be on the fence.
// Note that it does not matter if the fence encloses any area, the first and second fences in the image are valid.

// Constraints:
// 2 <= n <= 1000
// points[i].length == 2
// -10^9 <= points[i][0], points[i][1] <= 10^9
// All points[i] are distinct.

function numberOfPairsII(points: number[][]): number {
  // Sort the points by x-coordinate and then by y-coordinate in descending order
  points.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
  let cnt = 0; // count of pairs

  for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i]; // current point
    let bot = -Infinity, // Initialize the bottom of the range
      top = y0; // Initialize the top of the range

    // Iterate over the remaining points
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[j]; // Next point
      // Check if the next point is within the range
      if (y1 <= top && y1 > bot) {
        cnt++; // Increment the count
        bot = y1; // Update the bottom of the range
        if (y1 === top) top--; // Update the top of the range if necessary
      }
    }
  }
  return cnt;
}

// Editorial
function numberOfPairsII2(points: number[][]): number {
  const col = new Map<number, number>();
  const row = new Map<number, number>();
  const coordinatesMap = new Map<[number, number], [number, number]>();

  for (const [x, y] of points) {
    col.set(x, 0);
    row.set(y, 0);
  }

  function mapKeysToOrder(m: Map<number, number>) {
    const sortedKeys = Array.from(m.keys()).sort((a, b) => a - b);
    sortedKeys.forEach((key, index) => {
      m.set(key, index + 1);
    });
  }

  mapKeysToOrder(col);
  mapKeysToOrder(row);

  const nc = col.size + 1;
  const nr = row.size + 1;

  const m: number[][] = Array.from({ length: nc }, () => new Array(nr).fill(0));

  for (const point of points) {
    const [c, r] = [col.get(point[0])!, row.get(point[1])!];
    coordinatesMap.set(point as [number, number], [c, r]);
    m[c][r] = 1;
  }

  const prefixSum = Array.from({ length: nc }, () => new Array(nr).fill(0));

  for (let i = 1; i < nc; i++) {
    for (let j = 1; j < nr; j++) {
      prefixSum[i][j] =
        prefixSum[i - 1][j] +
        prefixSum[i][j - 1] -
        prefixSum[i - 1][j - 1] +
        m[i][j];
    }
  }

  let ans = 0;

  points.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (points[i][1] >= points[j][1]) {
        const [c1, r1] = coordinatesMap.get(points[i] as [number, number])!;
        const [c2, r2] = coordinatesMap.get(points[j] as [number, number])!;

        const cnt =
          prefixSum[c2][r1] -
          prefixSum[c1 - 1][r1] -
          prefixSum[c2][r2 - 1] +
          prefixSum[c1 - 1][r2 - 1];

        if (cnt === 2) ans++;
      }
    }
  }

  return ans;
}
