// https://leetcode.com/problems/type-of-triangle/
// You are given a 0-indexed integer array nums of size 3 which can form the sides of a triangle.
// A triangle is called equilateral if it has all sides of equal length.
// A triangle is called isosceles if it has exactly two sides of equal length.
// A triangle is called scalene if all its sides are of different lengths.
// Return a string representing the type of triangle that can be formed or "none" if it cannot form a triangle.

// Example 1:
// Input: nums = [3,3,3]
// Output: "equilateral"
// Explanation: Since all the sides are of equal length, therefore, it will form an equilateral triangle.

// Example 2:
// Input: nums = [3,4,5]
// Output: "scalene"
// Explanation:
// nums[0] + nums[1] = 3 + 4 = 7, which is greater than nums[2] = 5.
// nums[0] + nums[2] = 3 + 5 = 8, which is greater than nums[1] = 4.
// nums[1] + nums[2] = 4 + 5 = 9, which is greater than nums[0] = 3.
// Since the sum of the two sides is greater than the third side for all three cases, therefore, it can form a triangle.
// As all the sides are of different lengths, it will form a scalene triangle.

function triangleType(nums: number[]): string {
  const [a, b, c] = nums.sort((a, b) => a - b);
  if (a + b <= c) return 'none';
  if (a === b && b === c) return 'equilateral';
  if (a === b || b === c) return 'isosceles';
  return 'scalene';
}

// no sorting
function triangleType2(nums: number[]): string {
  const [a, b, c] = nums; //here i assigned values to this variables to easy calculation

  if (a + b <= c || a + c <= b || b + c <= a) {
    return 'none'; // Not a valid triangle
  }

  // Classify the triangle
  if (a === b && b === c) {
    return 'equilateral'; // All sides are equal
  }
  if (a === b || b === c || a === c) {
    return 'isosceles'; // Two sides are equal
  }

  return 'scalene'; // All sides are different
}
