// https://leetcode.com/problems/triangle/
// Given a triangle array, return the minimum path sum from top to bottom.
// For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

// Example 1:
// Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
// Output: 11
// Explanation: The triangle looks like:
//    2
//   3 4
//  6 5 7
// 4 1 8 3
// The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).

// Example 2:
// Input: triangle = [[-10]]
// Output: -10

// Constraints:
// 1 <= triangle.length <= 200
// triangle[0].length == 1
// triangle[i].length == triangle[i - 1].length + 1
// -10^4 <= triangle[i][j] <= 10^4

// https://leetcode.com/problems/triangle/discuss/342223/Clean-Javascript-4-Lines-Beats-98
// calculates the minimum paths um from bottom to up
// for each row updates the value at each index by adding the minimum value of the two values below it in the next row
// finally, the top left corner of the triangle returns the minimum path sum
function minimumTotal(triangle: number[][]): number {
  if (triangle.length === 1) return triangle[0][0];

  let height = triangle.length - 2;

  for (let level = height; level >= 0; level--)
    for (let col = 0; col < triangle[level].length; col++)
      triangle[level][col] += Math.min(
        triangle[level + 1][col],
        triangle[level + 1][col + 1],
      );
  return triangle[0][0];
}

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])); // 11
