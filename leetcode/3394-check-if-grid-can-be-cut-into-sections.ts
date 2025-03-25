// https://leetcode.com/problems/check-if-grid-can-be-cut-into-sections

// You are given an integer n representing the dimensions of an n x n grid, with the origin at the bottom-left corner of the grid. You are also given a 2D array of coordinates rectangles, where rectangles[i] is in the form [startx, starty, endx, endy], representing a rectangle on the grid. Each rectangle is defined as follows:
// (startx, starty): The bottom-left corner of the rectangle.
// (endx, endy): The top-right corner of the rectangle.
// Note that the rectangles do not overlap. Your task is to determine if it is possible to make either two horizontal or two vertical cuts on the grid such that:
// Each of the three resulting sections formed by the cuts contains at least one rectangle.
// Every rectangle belongs to exactly one section.
// Return true if such cuts can be made; otherwise, return false.

// Example 1:
// Input: n = 5, rectangles = [[1,0,5,2],[0,2,2,4],[3,2,5,3],[0,4,4,5]]
// Output: true
// Explanation: The grid is shown in the diagram. We can make horizontal cuts at y = 2 and y = 4. Hence, output is true.

// Example 2:
// Input: n = 4, rectangles = [[0,0,1,1],[2,0,3,4],[0,2,2,3],[3,0,4,3]]
// Output: true
// Explanation: We can make vertical cuts at x = 2 and x = 3. Hence, output is true.

// Example 3:
// Input: n = 4, rectangles = [[0,2,2,4],[1,0,3,2],[2,2,3,4],[3,0,4,2],[3,2,4,4]]
// Output: false
// Explanation:
// We cannot make two horizontal or two vertical cuts that satisfy the conditions. Hence, output is false.

function checkValidCuts(n: number, rectangles: number[][]): boolean {
  const check = (intervals: number[][]) => {
    // sort intervals by start points
    intervals.sort((a, b) => a[0] - b[0]);

    let sections = 0;
    let maxEnd = intervals[0][1];

    for (const [start, end] of intervals) {
      // merge overlapping intervals
      // if the current segment starts after the previous one, increase the cuts
      if (maxEnd <= start) {
        sections++;
      }
      // update maximum end point seen so far
      maxEnd = Math.max(maxEnd, end);
    }
    // if over 2 valid cuts, return true
    return sections >= 2;
  };

  // [x1, x2]
  const xIntervals = rectangles.map((rect) => [rect[0], rect[2]]);
  // [y1, y2]
  const yIntervals = rectangles.map((rect) => [rect[1], rect[3]]);

  return check(xIntervals) || check(yIntervals);
}
