// https://leetcode.com/problems/valid-triangle-number/
// Given an integer array nums, return the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.

// Example 1:
// Input: nums = [2,2,3,4]
// Output: 3
// Explanation: Valid combinations are:
// 2,3,4 (using the first 2)
// 2,3,4 (using the second 2)
// 2,2,3

// Example 2:
// Input: nums = [4,2,3,4]
// Output: 4

// Constraints:
// 1 <= nums.length <= 1000
// 0 <= nums[i] <= 1000

// https://leetcode.com/problems/valid-triangle-number/solutions/5677111/explained-runtime-beats-95-00/?envType=daily-question&envId=2025-09-26
function triangleNumber(nums: number[]): number {
  // sort the array in ascending order
  nums.sort((a, b) => a - b);
  let count = 0;

  // For each element as the largest side, use two pointers to find all pairs that form valid triangles
  for (let i = nums.length - 1; i >= 2; i--) {
    let left = 0;
    let right = i - 1;
    while (left < right) {
      // since nums[i] is the largest side,
      // if nums[left] + nums[right] > nums[i],
      // then nums[left] + nums[i] > nums[right] and nums[right] + nums[i] > nums[left] is valid
      if (nums[left] + nums[right] > nums[i]) {
        // all pairs between left and right are valid
        count += right - left;
        // move the right pointer to find a smaller pair
        right--;
      } else {
        left++;
      }
    }
  }

  return count;
}

// brute force, will TLE
function triangleNumber_bruteForce(nums: number[]): number {
  const isValidTriangle = (a: number, b: number, c: number) => {
    return a + b > c && a + c > b && b + c > a;
  };

  let count = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (isValidTriangle(nums[i], nums[j], nums[k])) {
          count++;
        }
      }
    }
  }
  return count;
}
