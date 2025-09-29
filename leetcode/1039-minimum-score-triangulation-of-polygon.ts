// https://leetcode.com/problems/minimum-score-triangulation-of-polygon
// You have a convex n-sided polygon where each vertex has an integer value. You are given an integer array values where values[i] is the value of the ith vertex in clockwise order.
// Polygon triangulation is a process where you divide a polygon into a set of triangles and the vertices of each triangle must also be vertices of the original polygon. Note that no other shapes other than triangles are allowed in the division. This process will result in n - 2 triangles.
// You will triangulate the polygon. For each triangle, the weight of that triangle is the product of the values at its vertices. The total score of the triangulation is the sum of these weights over all n - 2 triangles.
// Return the minimum possible score that you can achieve with some triangulation of the polygon.

// Example 1:
// Input: values = [1,2,3]
// Output: 6
// Explanation: The polygon is already triangulated, and the score of the only triangle is 6.

// Example 2:
// Input: values = [3,7,4,5]
// Output: 144
// Explanation: There are two triangulations, with possible scores: 3*7*5 + 4*5*7 = 245, or 3*4*5 + 3*4*7 = 144.
// The minimum score is 144.

// Example 3:
// Input: values = [1,3,1,4,1,5]
// Output: 13
// Explanation: The minimum score triangulation is 1*1*3 + 1*1*4 + 1*1*5 + 1*1*1 = 13.

// Constraints:
// n == values.length
// 3 <= n <= 50
// 1 <= values[i] <= 100

// https://leetcode.com/problems/minimum-score-triangulation-of-polygon/solutions/2375659/dp-solution-in-javascript-recursion-dp-memo-dp-tabulation/?envType=daily-question&envId=2025-09-29
function minScoreTriangulation(values: number[]): number {
  const n = values.length;
  // Initialize a 2D array to store the minimum score for each subproblem
  const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(-1));

  const helper = (
    values: number[],
    i: number, // starting index
    j: number, // ending index
    dp: number[][],
  ): number => {
    // Base case: if the subproblem has only two vertices, the minimum score is 0
    if (i + 1 === j) {
      return 0;
    }

    // Check if the result for the current subproblem has already been computed
    if (dp[i][j] !== -1) {
      return dp[i][j];
    }

    let ans = Number.MAX_VALUE;

    // Iterate over all possible split points
    for (let k = i + 1; k < j; k++) {
      // Calculate the score for the current split point
      ans = Math.min(
        ans,
        values[i] * values[j] * values[k] +
          helper(values, i, k, dp) +
          helper(values, k, j, dp),
      );
    }
    dp[i][j] = ans;
    return dp[i][j];
  };

  // Call the helper function with the initial values and return the result
  return helper(values, 0, n - 1, dp);
}
