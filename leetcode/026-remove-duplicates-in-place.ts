// remove duplicates from sorted array, in-place
// no extra memory

export function removeDuplicates(nums: number[]): number {
  if (nums.length <= 1) return nums.length;
  let unique = 1;
  let i = 1;
  while (i < nums.length) {
    if (nums[i] !== nums[i - 1]) {
      unique += 1;
      i++;
    } else {
      nums.splice(i, 1); // slower then 2
    }
  }
  return unique;
}

/**
 * Solution:
 * - In order to perform in-place operations, we use the Two indexes approach
 * - The first index updates the value in our input array while reading the data from the second index
 * - We continue the above steps until the second index reaches the end of an array
 */

export function removeDuplicates2(nums: number[]): number {
  if (nums.length <= 1) return nums.length;
  let unique = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] !== nums[i]) {
      nums[unique] = nums[i]; // update the array directly is better
      unique++;
    }
  }
  return unique;
}
