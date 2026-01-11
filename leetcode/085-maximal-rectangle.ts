// https://leetcode.com/problems/maximal-rectangle/description
// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

// Example 1:
// Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// Output: 6
// Explanation: The maximal rectangle is shown in the above picture.

// Example 2:
// Input: matrix = [["0"]]
// Output: 0

// Example 3:
// Input: matrix = [["1"]]
// Output: 1

// Constraints:
// rows == matrix.length
// cols == matrix[i].length
// 1 <= rows, cols <= 200
// matrix[i][j] is '0' or '1'.

// https://leetcode.com/problems/maximal-rectangle/solutions/5676515/explanation-runtime-beats-9259-by-r9n-ktgt/?envType=daily-question&envId=2026-01-11
function maximalRectangle(matrix: string[][]): number {
  if (matrix.length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  const heights: number[] = new Array(cols).fill(0); // heights of consecutive 1s at each column
  let maxArea = 0;

  // calculates the maximum area of a rectangle that can be formed from a given array of heights.
  const calculateArea = (heights: number[]): number => {
    const stack: number[] = [];
    let maxArea = 0;
    heights.push(0); // sentinel to ensure all heights are processed

    for (let i = 0; i < heights.length; i++) {
      while (
        stack.length > 0 &&
        heights[stack[stack.length - 1]] > heights[i] //current height is smaller than the height at the top of the stack
      ) {
        const height = heights[stack.pop()!]; // height at the top of the stack
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
      }
      stack.push(i);
    }

    return maxArea;
  };

  // iterate over row
  for (let i = 0; i < rows; i++) {
    // iterate over column
    for (let j = 0; j < cols; j++) {
      // update heights array
      heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
    }

    // calculate max area for the current row (histogram)
    maxArea = Math.max(maxArea, calculateArea(heights));
  }

  return maxArea;
}
