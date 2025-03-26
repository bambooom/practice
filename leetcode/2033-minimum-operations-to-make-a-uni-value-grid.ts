// https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid/
// You are given a 2D integer grid of size m x n and an integer x. In one operation, you can add x to or subtract x from any element in the grid.
// A uni-value grid is a grid where all the elements of it are equal.
// Return the minimum number of operations to make the grid uni-value. If it is not possible, return -1.

// Example 1:
// Input: grid = [[2,4],[6,8]], x = 2
// Output: 4
// Explanation: We can make every element equal to 4 by doing the following:
// - Add x to 2 once.
// - Subtract x from 6 once.
// - Subtract x from 8 twice.
// A total of 4 operations were used.

// Example 2:
// Input: grid = [[1,5],[2,3]], x = 1
// Output: 5
// Explanation: We can make every element equal to 3.

// Example 3:
// Input: grid = [[1,2],[3,4]], x = 2
// Output: -1
// Explanation: It is impossible to make every element equal.

function minOperations(grid: number[][], x: number): number {
  const flattened = grid.flat().sort((a, b) => a - b);
  const remainder = flattened[0] % x;

  // check if all elements have the same remainder when divided by x
  for (const num of flattened) {
    if (num % x !== remainder) return -1;
  }

  // find median as target value
  const median = flattened[Math.floor(flattened.length / 2)];

  return flattened.reduce((acc, num) => acc + Math.abs(num - median) / x, 0);
}
