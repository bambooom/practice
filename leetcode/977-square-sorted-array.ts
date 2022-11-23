/**
 * Time Complexity: O(NlogN), where N is the length of A.
 * Space complexity : O(N) or O(logN)
 *    The space complexity of the sorting algorithm depends on the implementation of each program language.
 *    For instance, the list.sort() function in Python is implemented with the Timsort algorithm whose space complexity is O(N).
 */
function sortedSquares(nums: number[]): number[] {
  return nums.map((n) => Math.pow(n, 2)).sort((a, b) => a - b);
}

/**
 * Two pointer approach
 * We can use two pointers to read the positive and negative parts of the array
 *  - one pointer j in the positive direction, and another i in the negative direction.
 * Now that we are reading two increasing arrays (the squares of the elements),
 * we can merge these arrays together using a two-pointer technique.
 */

function sortedSquares2(nums: number[]): number[] {
  let left = 0;
  let right = nums.length - 1;
  const result = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    let r;
    if (Math.abs(nums[left]) < Math.abs(nums[right])) {
      r = Math.abs(nums[right]);
      right--;
    } else {
      r = Math.abs(nums[left]);
      left++;
    }
    result.unshift(Math.pow(r, 2));
  }
  return result;
}

// console.log(sortedSquares2([-5, -4, -1, 0, 3, 7, 10]));
