// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
// If target is not found in the array, return [-1, -1].
// You must write an algorithm with O(log n) runtime complexity.
// #binary-search

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]

function searchRange(nums: number[], target: number): number[] {
  // if (nums.length === 0) return [-1, -1];
  // if (target < nums[0] || target > nums[nums.length - 1]) return [-1, -1];

  const targetPosition = binary(nums, target);
  if (targetPosition === -1) return [-1, -1];

  let left = targetPosition,
    right = targetPosition;

  while (nums[left - 1] === target) {
    left -= 1;
  }

  while (nums[right + 1] === target) {
    right += 1;
  }

  return [left, right];
}

const binary = (nums: number[], target: number): number => {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const currentMidNum = nums[mid];
    if (currentMidNum === target) {
      return mid;
    }
    if (currentMidNum > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};
