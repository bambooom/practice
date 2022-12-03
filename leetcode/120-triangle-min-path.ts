// https://leetcode.com/problems/triangle/

// https://leetcode.com/problems/triangle/discuss/342223/Clean-Javascript-4-Lines-Beats-98
function minimumTotal(triangle: number[][]): number {
  for (let i = triangle.length - 2; i >= 0; i--)
    for (let j = 0; j < triangle[i].length; j++)
      triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
  return triangle[0][0];
}

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])); // 11
