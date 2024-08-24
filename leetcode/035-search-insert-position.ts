// https://leetcode.com/problems/search-insert-position
// Q: sorted array, find the index of target or where to insert
// using binary-search to reach O(n*logn)

export function searchInsert(nums: number[], target: number): number {
  let low = 0,
    high = nums.length - 1;
  if (target <= nums[low]) return low;
  if (target === nums[high]) return high;
  if (target > nums[high]) return high + 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (target > nums[mid]) {
      low = mid + 1;
    } else if (target < nums[mid]) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return target > nums[low] ? low + 1 : low;
}

// console.log('test: ', searchInsert([1, 3], 2)); // 1
// console.log('test: ', searchInsert([1, 3], 3)); // 1
// console.log('test: ', searchInsert([1, 3, 5, 6], 5)); //2
// console.log('test: ', searchInsert([1, 3, 5, 6], 2)); //1
// console.log('test: ', searchInsert([1, 3, 5, 6], 7)); //4
