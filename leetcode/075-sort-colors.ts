// https://leetcode.com/problems/sort-colors/
// #two-pointers
// Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
// We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
// You must solve this problem without using the library's sort function.

// Example 1:
// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]

// Example 2:
// Input: nums = [2,0,1]
// Output: [0,1,2]

/**
 * Do not return anything, modify nums in-place instead.
 */
// bubble sort
function sortColors(nums: number[]): void {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
}

/**
 * Dutch National Flag Problem
 * Algorithm
- Initialise the rightmost boundary of zeros : p0 = 0. During the algorithm execution nums[idx < p0] = 0.
- Initialise the leftmost boundary of twos : p2 = n - 1. During the algorithm execution nums[idx > p2] = 2.
- Initialise the index of current element to consider : curr = 0.
- While curr <= p2 :
  - If nums[curr] = 0 : swap currth and p0th elements and move both pointers to the right.
  - If nums[curr] = 2 : swap currth and p2th elements. Move pointer p2 to the left.
  - If nums[curr] = 1 : move pointer curr to the right.
 */

function sortColors2(nums: number[]): void {
  let p0 = 0;
  let curr = 0;
  let p2 = nums.length - 1;

  while (curr <= p2) {
    if (nums[curr] === 0) {
      [nums[curr], nums[p0]] = [nums[p0], nums[curr]];
      p0++;
      curr++;
    } else if (nums[curr] === 2) {
      [nums[curr], nums[p2]] = [nums[p2], nums[curr]];
      p2--;
    } else {
      curr++;
    }
  }
}
