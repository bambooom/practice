// https://leetcode.com/problems/wiggle-sort/
// Given an integer array nums, reorder it such that nums[0] <= nums[1] >= nums[2] <= nums[3]....
// 折线型排序，一高一低一高一低
// You may assume the input array always has a valid answer.

// Input: nums = [3,5,2,1,6,4]
// Output: [3,5,1,6,2,4]
// Explanation: [1,6,2,5,3,4] is also accepted.

/**
 Do not return anything, modify nums in-place instead.
 */

/**
 *  Approach 1: Sorting
 *  Time: O(nlogn)
 *  Space: O(1)
 *
 * An intuitive approach is to sort the nums array,
 * and then for every element at an odd index, say i
 * we do a swap with its adjacent element at index i + 1.
 *
 * */
function wiggleSort(nums: number[]): void {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i += 2) {
    [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
  }
}

/**
 *  Approach 2: Greedy
 *  Time: O(nlogn)
 *
 * For any odd index i, we need to ensure the
 * nums[i-1] <= nums[i] and nums[i+1] <= nums[i]
 *
 * 如果 nums[0] <= nums[1]，这俩就已经 sorted 不需要动
 * 如果 nums[0] > nums[1], then swap them
 * 继续看 nums[2]，如果 nums[1] >= nums[2]，那么前三个就已经 sorted 不需要动
 * 如果不是，就需要 swap nums[1] 和 nums[2] 才能达到 wiggly sorted
 *
 * Solution：
 * check for each index i.
 * If i is even, nums[i] should be smaller than or equal to nums[i + 1]. If it is larger, i.e., nums[i] > nums[i + 1], we swap nums[i] and nums[i + 1].
 * Similarly, if i is odd, nums[i] should be greater than or equal to nums[i + 1]. If it is smaller, i.e., nums[i] < nums[i + 1], we swap nums[i] and nums[i + 1].
 * */

function wiggleSort2(nums: number[]): void {
  for (let i = 0; i < nums.length - 1; i++) {
    if (i % 2 === 0) {
      // even
      if (nums[i] > nums[i + 1]) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
      }
    } else {
      if (nums[i] < nums[i + 1]) {
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
      }
    }
  }
}
