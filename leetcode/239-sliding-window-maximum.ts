// https://leetcode.com/problems/sliding-window-maximum/
// You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
// Return the max sliding window.

// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// Explanation:
// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

function maxSlidingWindow(nums: number[], k: number): number[] {
  if (k === 1) return nums;

  const deQueue = [];
  const res = [];

  for (let right = 0; right < nums.length; right++) {
    const num = nums[right];
    while (deQueue.length && deQueue[deQueue.length - 1] < num) {
      deQueue.pop();
    }
    deQueue.push(nums[right]);

    const left = right - k + 1;
    if (left >= 0) {
      res.push(deQueue[0]);
      // 滑动过程中，如果序列中的最大元素即退出窗口，则移除队列头部元素
      if (nums[left] === deQueue[0]) {
        deQueue.shift();
      }
    }
  }
  return res;
}
