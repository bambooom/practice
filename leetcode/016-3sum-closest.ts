// https://leetcode.com/problems/3sum-closest/

// Given an integer array nums of length n and an integer target,
// find three integers in nums such that the sum is closest to target.
// Return the sum of the three integers.

// two pointer approach
// time O(n^2) space O(1)
function threeSumClosest(nums: number[], target: number): number {
  if (nums.length <= 3) return nums.reduce((acc, cur) => acc + cur, 0);

  nums.sort((a, b) => a - b); // ascending order
  let minDis = Number.MAX_SAFE_INTEGER;
  let result = 0;

  for (let i = 0; i < nums.length - 2; i++) {
    let j = i + 1; // left
    let k = nums.length - 1; // right

    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];
      if (sum === target) {
        return sum;
      }
      const distance = Math.abs(sum - target);
      if (distance < minDis) {
        minDis = distance;
        result = sum;
      }
      if (sum < target) {
        j++;
      } else {
        k--;
      }
    }
  }

  return result;
}
