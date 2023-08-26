// #twp pointers
// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]

// this is not space optional, using extra array with non-zeros
// space O(n), time O(n)
function moveZeroes(nums: number[]): void {
  if (!nums || nums.length <= 1) return;
  const nonZero = nums.filter((n) => n !== 0);
  for (let i = 0; i < nums.length; i++) {
    if (i < nonZero.length) {
      nums[i] = nonZero[i];
    } else {
      nums[i] = 0;
    }
  }
}

// two pointer approach, found non zero and update the nums in-place
// spce O(1), time O(n)
function moveZeroes2(nums: number[]): void {
  if (!nums || nums.length <= 1) return;
  let lastNonZeroIdx = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[lastNonZeroIdx] = nums[i];
      lastNonZeroIdx++;
    }
  }
  for (let i = lastNonZeroIdx; i < nums.length; i++) {
    nums[i] = 0;
  }
}

// using swap
// All elements before the slow pointer (lastNonZeroFoundAt) are non-zeroes.
// All elements between the current and slow pointer are zeroes.
function moveZeroes3(nums: number[]): void {
  if (!nums || nums.length <= 1) return;
  let lastNonZeroIdx = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      // swap
      [nums[lastNonZeroIdx], nums[i]] = [nums[i], nums[lastNonZeroIdx]];
      lastNonZeroIdx++;
    }
  }
}

const arr = [0, 1, 2, 0, 3, 0, 0, 4, 5, 0, 7];
moveZeroes3(arr);
console.log(arr);
