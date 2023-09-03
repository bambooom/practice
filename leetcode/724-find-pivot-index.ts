// https://leetcode.com/problems/find-pivot-index/

function pivotIndex(nums: number[]): number {
  let left = 0;
  let right = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      left = 0;
      right =
        nums.length > 1 ? nums.slice(1).reduce((acc, cur) => acc + cur) : 0;
    } else {
      left += nums[i - 1];
      right -= nums[i];
    }
    console.log(left, right);
    if (left === right) {
      return i;
    }
  }
  return -1;
}

// console.log(pivotIndex([1, 7, 3, 6, 5, 6])); // 3
// console.log(pivotIndex([2, 1, -1])); // 0;
console.log(pivotIndex([-1, -1, 0, 1, 1, 0])); // 5
console.log(pivotIndex([0])); // 0

function pivotIndex2(nums: number[]): number {
  let left = 0;
  const right = nums.reduce((a, b) => a + b);

  for (let i = 0; i < nums.length; i++) {
    if (left === right - left - nums[i]) {
      return i;
    }
    left += nums[i];
  }

  return -1;
}
