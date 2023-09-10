// https://leetcode.com/problems/largest-perimeter-triangle/

// Given an integer array nums, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. If it is impossible to form any triangle of a non-zero area, return 0.
// triangle: a + b > c

function largestPerimeter(nums: number[]): number {
  nums.sort((a, b) => b - a); // desc
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] < nums[i + 1] + nums[i + 2]) {
      return nums[i] + nums[i + 1] + nums[i + 2];
    }
  }

  return 0;
}
