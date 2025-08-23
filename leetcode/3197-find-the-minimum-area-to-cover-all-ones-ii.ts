// https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii/
// You are given a 2D binary array grid. You need to find 3 non-overlapping rectangles having non-zero areas with horizontal and vertical sides such that all the 1's in grid lie inside these rectangles.
// Return the minimum possible sum of the area of these rectangles.
// Note that the rectangles are allowed to touch.

// Example 1:
// Input: grid = [[1,0,1],[1,1,1]]
// Output: 5
// Explanation:
// The 1's at (0, 0) and (1, 0) are covered by a rectangle of area 2.
// The 1's at (0, 2) and (1, 2) are covered by a rectangle of area 2.
// The 1 at (1, 1) is covered by a rectangle of area 1.

// Example 2:
// Input: grid = [[1,0,1,0],[0,1,0,1]]
// Output: 5
// Explanation:
// The 1's at (0, 0) and (0, 2) are covered by a rectangle of area 3.
// The 1 at (1, 1) is covered by a rectangle of area 1.
// The 1 at (1, 3) is covered by a rectangle of area 1.

// https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii/solutions/7111751/minimum-area-to-cover-all-ones-ii-most-efficient-java-c-c-c-python3-go-js-ts/?envType=daily-question&envId=2025-08-23
// Since rectangles must align with rows and columns, the shape of each rectangle is determined only by the minimum and maximum row/column indices of the 1s it contains.
// insight is:
//  - The area of a rectangle covering a group of 1s depends only on the bounding box of those 1s.
//  - To minimize the sum of areas, we need to split the grid into three parts (by horizontal or vertical cuts, possibly after rotations) and compute the minimum area rectangles for each part.
//  - Trying all possible splits ensures we don’t miss the optimal arrangement.
function minimumSum(grid: number[][]): number {
  // helper: calculate minimum bounding rectangle area
  const minimumArea = (B: number[][]): number => {
    if (!B.length || !B[0].length) return 0;

    let n = B.length,
      m = B[0].length;
    let left = Infinity,
      top = Infinity,
      right = -1,
      bottom = -1;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (B[i][j] === 1) {
          left = Math.min(left, j);
          top = Math.min(top, i);
          right = Math.max(right, j);
          bottom = Math.max(bottom, i);
        }
      }
    }

    if (right === -1) return 0;
    return (right - left + 1) * (bottom - top + 1);
  };

  //   Rotation Trick
  // Instead of handling all possible L-shaped partitions separately, we can rotate the grid four times (90° each)
  // and only handle the straightforward partitions (horizontal and vertical).
  // This ensures all possible rectangle arrangements are covered.
  const rotate = (B: number[][]): number[][] => {
    let n = B.length,
      m = B[0].length;
    const rotated: number[][] = Array.from({ length: m }, () =>
      Array(n).fill(0),
    );

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        rotated[j][n - 1 - i] = B[i][j];
      }
    }
    return rotated;
  };

  let res = Infinity;

  // Partition the Grid into Three Rectangles
  // Horizontal cuts: Choose two row indices i and j (i < j) to cut the grid into three parts:
  //    Top: rows [0 .. i-1]
  //    Middle: rows [i .. j-1]
  //    Bottom: rows [j .. n-1]
  // Vertical cuts: Similarly, choose two column indices to divide the grid into three vertical parts.
  for (let rot = 0; rot < 4; rot++) {
    let n = grid.length,
      m = grid[0].length;

    for (let i = 1; i < n; i++) {
      let a1 = minimumArea(grid.slice(0, i));

      for (let j = 1; j < m; j++) {
        let part2 = grid.slice(i).map((r) => r.slice(0, j));
        let part3 = grid.slice(i).map((r) => r.slice(j));
        let a2 = minimumArea(part2);
        let a3 = minimumArea(part3);
        res = Math.min(res, a1 + a2 + a3);
      }

      for (let i2 = i + 1; i2 < n; i2++) {
        let part2 = grid.slice(i, i2);
        let part3 = grid.slice(i2);
        let a2 = minimumArea(part2);
        let a3 = minimumArea(part3);
        res = Math.min(res, a1 + a2 + a3);
      }
    }
    grid = rotate(grid);
  }

  return res;
}
