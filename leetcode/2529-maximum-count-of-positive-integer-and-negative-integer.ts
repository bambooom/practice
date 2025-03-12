// https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer/

// Given an array nums sorted in non-decreasing order, return the maximum between the number of positive integers and the number of negative integers.
// In other words, if the number of positive integers in nums is pos and the number of negative integers is neg, then return the maximum of pos and neg.
// Note that 0 is neither positive nor negative.

function maximumCount(nums: number[]): number {
  let pos = 0;
  let neg = 0;

  for (const num of nums) {
    if (num > 0) pos++;
    else if (num < 0) neg++;
  }

  return Math.max(pos, neg);
}

// use binary search
function maximumCount2(nums: number[]): number {
  const n = nums.length;
  let low = 0;
  let high = n - 1;

  // find the last negative, then we know how many negative numbers
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const negs = low;
  low = 0;
  high = n - 1;

  // find the last zero, then we can know how many positive numbers
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] <= 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const pos = n - low;

  return Math.max(pos, negs);
}
