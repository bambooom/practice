// https://leetcode.com/problems/maximum-width-ramp/
// A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i.
// Given an integer array nums, return the maximum width of a ramp in nums. If there is no ramp in nums, return 0.

// Example 1:
// Input: nums = [6,0,8,2,1,5]
// Output: 4
// Explanation: The maximum width ramp is achieved at(i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.

// Example 2:
// Input: nums = [9,8,1,0,1,9,4,0,4,1]
// Output: 7
// Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.

// https://leetcode.com/problems/maximum-width-ramp/solutions/5893649/explained-step-by-step-o-n-working-10-10-2024/
function maxWidthRamp(nums: number[]): number {
  const stack: number[] = [];

  // build a decreasing stack of indices
  // this stack will contain indices of potential left boundaries of a ramp
  for (let i = 0; i < nums.length; i++) {
    // only push an index if the stack is empty or the current number is < the last number in the stack
    // this ensures the stack remains in decreasing order of values
    if (stack.length === 0 || nums[stack[stack.length - 1]] > nums[i]) {
      stack.push(i);
    }
  }

  let ans = Number.MIN_SAFE_INTEGER;

  // iterate through the array
  // this will help us find the widest ramp for each potential right boundary
  for (let i = nums.length - 1; i >= 0; i--) {
    // while stack is not empty and the current number is >= the number at the top of the stack
    while (stack.length > 0 && nums[i] >= nums[stack[stack.length - 1]]) {
      // pop the index from stack
      const idx = stack.pop()!;
      // update the answer with the max width found
      ans = Math.max(ans, i - idx);
    }
  }

  return ans;
}
