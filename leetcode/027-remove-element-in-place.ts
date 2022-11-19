// remove val from nums, return the left k nums

export function removeElement(nums: number[], val: number): number {
  if (nums.length === 0) return 0;
  let lastIdx = nums.length - 1;
  while (nums[lastIdx] === val) {
    lastIdx--;
  }
  for (let i = 0; i < lastIdx; i++) {
    if (nums[i] === val && i !== lastIdx) {
      [nums[i], nums[lastIdx]] = [nums[lastIdx], nums[i]];
      while (nums[lastIdx] === val) {
        lastIdx--;
      }
    }
  }
  return lastIdx + 1;
}

// Better solution: two-pointers
export function removeElement2(nums: number[], val: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    if (nums[left] === val) {
      nums[left] = nums[right];
      right--;
    } else {
      left++;
    }
  }

  return left;
}

// console.log(removeElement2([3, 2, 2, 3], 3));
// console.log(removeElement2([0, 1, 2, 2, 3, 0, 4, 2], 2));
