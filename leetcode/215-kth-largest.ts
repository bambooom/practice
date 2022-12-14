// https://leetcode.com/problems/kth-largest-element-in-an-array/
// #quick-select
// Given an integer array nums and an integer k, return the kth largest element in the array.

// - Choose a random pivot.
// - Use a partition algorithm to place the pivot into its perfect position pos in the sorted array,
//  move smaller elements to the left of pivot, and larger or equal ones - to the right.
// - Compare pos and N - k to choose the side of array to proceed recursively.

// Time complexity : O(N) in the average case, O(N^2) in the worst case.
// Space complexity : O(1)

function findKthLargest(nums: number[], k: number): number {
  // the final position of the kth largest number in a sorted array
  const finalIdx = nums.length - k;
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // choose a random pivot between left and right
    const pivot = Math.floor(Math.random() * (right - left + 1)) + left;
    // find the pos for pivot in sorted array
    const pivotIdx = helper(pivot, left, right);
    if (pivotIdx === finalIdx) {
      return nums[finalIdx];
    } else if (pivotIdx < finalIdx) {
      left = pivotIdx + 1;
    } else {
      right = pivotIdx - 1;
    }
  }

  return nums[finalIdx];

  function helper(pivot: number, start: number, end: number): number {
    // move pivot to end
    swap(pivot, end);

    let i = start;
    let j = start;

    // move smaller numbers to th beginning of the array
    while (j < end) {
      if (nums[j] <= nums[end]) {
        swap(i, j);
        i++;
      }
      j++;
    }
    // swap pivot to its final position
    swap(i, end);
    return i;
  }

  function swap(i: number, j: number) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
}
