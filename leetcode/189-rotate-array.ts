// in-place rotate
// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output:       [5,6,7,1,2,3,4]

// Cyclic Replacements
// time: O(n), space: O(1)
function rotate(nums: number[], k: number): void {
  const len = nums.length;
  k = k % len;

  let startIdx = 0;
  let count = 0;

  while (count < len) {
    let currIdx = startIdx;
    let prev = nums[startIdx];

    // eslint-disable-next-line no-constant-condition
    while (1) {
      const nextIdx = (currIdx + k) % len;
      [nums[nextIdx], prev] = [prev, nums[nextIdx]]; // swap with next
      currIdx = nextIdx;
      count++;

      if (startIdx === currIdx) {
        break;
      }
    }

    startIdx++;
  }
}

// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// rotate(arr, 3);
// console.log(arr);

// Reverse approach
// Original List                   : 1 2 3 4 5 6 7
// After reversing all numbers     : 7 6 5 4 3 2 1
// After reversing first k numbers : 5 6 7 4 3 2 1
// After revering last n-k numbers : 5 6 7 1 2 3 4 --> Result
function rotateReverse(nums: number[], k: number): void {
  if (!nums || nums.length === 0) return;
  k = k % nums.length;
  if (k === 0) return;
  nums.reverse(); // in-place
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
}

const reverse = (arr: number[], start: number, end: number): void => {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
};
