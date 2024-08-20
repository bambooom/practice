// https://leetcode.cn/problems/search-in-rotated-sorted-array/
// There is an integer array nums sorted in ascending order (with distinct values).
// Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
// Given the array `nums` after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
// You must write an algorithm with O(log n) runtime complexity.

// using binary search, When you divide the rotated array into two halves, using mid index,
// at least one of subarray should remain sorted ALWAYS.
// IF smallest <= target <= biggest
//   then target is here
// ELSE
//   then target is on the other side

function searchRotatedSorterArray(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }

    if (nums[left] <= nums[mid]) {
      // left side is sorted
      if (nums[left] <= target && target <= nums[mid]) {
        // then move right pointer so we can work with this part further
        right = mid - 1;
      } else {
        left = mid + 1;
      }

      // if pivot rotation index is in left side, then we work the right side
    } else {
      // right side is sorted
      if (nums[mid] <= target && target <= nums[right]) {
        // then move left pointer
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
