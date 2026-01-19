// https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/
// Given a m x n matrix mat and an integer threshold, return the maximum side-length of a square with a sum less than or equal to threshold or return 0 if there is no such square.

// Example 1:
// Input: mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
// Output: 2
// Explanation: The maximum side length of square with sum less than 4 is 2 as shown.

// Example 2:
// Input: mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
// Output: 0

// Constraints:
// m == mat.length
// n == mat[i].length
// 1 <= m, n <= 300
// 0 <= mat[i][j] <= 10^4
// 0 <= threshold <= 10^5

// https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/solutions/6766122/try-to-beat-my-performance-by-andreev-de-o6uy/?envType=daily-question&envId=2026-01-19
function maxSideLength(mat: number[][], threshold: number): number {
  if (mat[0].length === 1) return 1;

  const M = mat.length;
  const N = mat[0].length;
  const prefixSum: number[][] = Array.from({ length: M }, () =>
    Array(N).fill(0),
  );

  // Calculate the prefix sum for each row.
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      prefixSum[i][j] = mat[i][j] + (prefixSum[i - 1]?.[j] ?? 0);
    }
  }

  // Calculate the prefix sum for each column.
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      prefixSum[i][j] += prefixSum[i][j - 1] ?? 0;
    }
  }

  let maxSideLength = 0;

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let low = 0;
      let high = Math.min(i, j);

      // Perform a binary search to find the maximum side length of a square with a sum less than or equal to the threshold.
      while (low <= high) {
        const mid = low + ((high - low) >> 1);
        const curRow = i - mid;
        const curCol = j - mid;
        const sum =
          prefixSum[i][j] +
          (prefixSum[curRow - 1]?.[curCol - 1] ?? 0) -
          (prefixSum[i][curCol - 1] ?? 0) -
          (prefixSum[curRow - 1]?.[j] ?? 0);

        if (sum <= threshold) {
          // If the sum of the square is less than or equal to the threshold, update the maxSideLength.
          maxSideLength = Math.max(maxSideLength, i - curRow + 1);
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
    }
  }

  return maxSideLength;
}
