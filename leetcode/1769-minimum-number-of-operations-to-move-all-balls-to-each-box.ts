// https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/description
// You have n boxes. You are given a binary string boxes of length n, where boxes[i] is '0' if the ith box is empty, and '1' if it contains one ball.
// In one operation, you can move one ball from a box to an adjacent box. Box i is adjacent to box j if abs(i - j) == 1. Note that after doing so, there may be more than one ball in some boxes.
// Return an array answer of size n, where answer[i] is the minimum number of operations needed to move all the balls to the ith box.
// Each answer[i] is calculated considering the initial state of the boxes.

// Example 1:
// Input: boxes = "110"
// Output: [1,1,3]
// Explanation: The answer for each box is as follows:
// 1) First box: you will have to move one ball from the second box to the first box in one operation.
// 2) Second box: you will have to move one ball from the first box to the second box in one operation.
// 3) Third box: you will have to move one ball from the first box to the third box in two operations, and move one ball from the second box to the third box in one operation.

// Example 2:
// Input: boxes = "001011"
// Output: [11,8,5,4,3,4]

// #prefix-sum
// https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/solutions/6236466/recursive-left-and-right-pass-using-arrays-optimised-version-of-code/
// left pass: traverse the boxes from left to right
// for each box, if the prev box contains a ball, increment the count
// update the left array with the cumulative cost of moving balls to the current box
// right pass: traverse the boxes from right to left
// for each box, if the next box contains a ball, increment the count
// update the right array with the cumulative cost of moving balls to the current box
function minOperations(boxes: string): number[] {
  const n = boxes.length;
  const ans = new Array(n).fill(0);

  // left pass
  for (let i = 1, count = 0; i < n; i++) {
    if (boxes[i - 1] === '1') {
      count++;
    }
    ans[i] = ans[i - 1] + count;
  }
  // right pass
  for (let i = n - 2, count = 0, sum = 0; i >= 0; i--) {
    if (boxes[i + 1] === '1') {
      count++;
    }
    sum += count;
    ans[i] += sum;
  }
  return ans;
}
