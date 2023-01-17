// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
// Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
// Given the sorted rotated array nums of unique elements, return the minimum element of this array.
// You must write an algorithm that runs in O(log n) time.
// #binary-search

function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      // left is rotated part
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}
