// https://leetcode.com/problems/find-peak-element/
// A peak element is an element that is strictly greater than its neighbors.
// Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.
// You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
// You must write an algorithm that runs in O(log n) time.
// #binary-search
// Input: nums = [1,2,1,3,5,6,4]
// Output: 5
// Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.

function findPeakElement(nums: number[]): number {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    //for every array there should be atleast one peak exists

    const mid = Math.floor((low + high) / 2);

    if (nums[mid] < nums[mid + 1]) {
      low = mid + 1;
    } else if (nums[mid] > nums[mid + 1]) {
      high = mid;
    }
  }

  return low;
}
