// https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous/

// You are given an integer array nums. In one operation, you can replace any element in nums with any integer.
// nums is considered continuous if both of the following conditions are fulfilled:
// - All elements in nums are unique.
// - The difference between the maximum element and the minimum element in nums equals nums.length - 1.
//
// For example, nums = [4, 2, 5, 3] is continuous, but nums = [1, 2, 3, 5, 6] is not continuous.
// Return the minimum number of operations to make nums continuous.

// binary search
function minOperations(nums: number[]): number {
  const n: number = nums.length;
  const uniqueArr = [...new Set(nums)];
  uniqueArr.sort((a, b) => a - b);

  let ans = n;

  const bisectRight = (nums: number[], target: number): number => {
    let left = 0;
    let right: number = nums.length;

    while (left < right) {
      const mid: number = Math.floor((left + right) / 2);
      if (nums[mid] <= target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  };

  for (let i = 0; i < uniqueArr.length; i++) {
    const left: number = uniqueArr[i];
    const right: number = left + n - 1;
    const j: number = bisectRight(uniqueArr, right);
    const count: number = j - i;
    ans = Math.min(ans, n - count);
  }

  return ans;
}
