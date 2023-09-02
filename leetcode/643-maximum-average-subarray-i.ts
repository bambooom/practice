// https://leetcode.com/problems/maximum-average-subarray-i/
// #sliding-window

function findMaxAverage(nums: number[], k: number): number {
  if (k >= nums.length) {
    return nums.reduce((acc, cur) => acc + cur) / k;
  }
  if (k === 1) {
    return Math.max(...nums);
  }
  let sum = 0;
  let avg = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  avg = sum / k;

  for (let i = k; i < nums.length; i++) {
    // sliding window, 移动时不用重新计算 sum，直接去掉前面的，添加后面的值即可
    sum += nums[i] - nums[i - k];
    avg = Math.max(avg, sum / k);
  }

  return avg;
}
