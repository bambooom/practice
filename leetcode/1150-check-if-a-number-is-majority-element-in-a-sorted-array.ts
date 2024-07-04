// https://leetcode.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array/
// Given an integer array nums sorted in non-decreasing order and an integer target, return true if target is a majority element, or false otherwise.
// A majority element in an array nums is an element that appears more than nums.length / 2 times in the array.

// binary search
// simply look for the first occurence of target in the first half of the array in order
// binary search to find where the first occurence of the target element is

function isMajorityElement(nums: number[], target: number): boolean {
  const len = nums.length;
  let left = 0;
  let right = Math.floor(len / 2);

  // if halfway point is not target, it won't be the majority element
  if (nums[right] !== target) return false;
  // then using binary search to find the first occurence of the target
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (nums[left] !== target) return false;
  // if it's majority element，then from `left` to len/2 length shoule be all the same element
  return nums[left + Math.floor(len / 2)] === target;
}
