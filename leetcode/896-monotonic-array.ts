// https://leetcode.com/problems/monotonic-array/

function isMonotonic(nums: number[]): boolean {
  if (nums.length < 3) return true;
  const increasing = nums[nums.length - 1] > nums[0]; // using last - first to decide whethter it's increasing or decreasing
  for (let i = 1; i < nums.length; i++) {
    if (
      (increasing && nums[i] < nums[i - 1]) ||
      (!increasing && nums[i] > nums[i - 1])
    ) {
      return false;
    }
  }
  return true;
}

// one-pass simple variant
function isMonotonic2(nums: number[]): boolean {
  if (nums.length < 3) return true;
  let increasing = true;
  let decreasing = true;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] > nums[i]) {
      decreasing = false;
    }
    if (nums[i + 1] < nums[i]) {
      increasing = false;
    }
  }
  return increasing || decreasing; // there will be one to be true always to keep monitonic
}
