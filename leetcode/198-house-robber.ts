// https://leetcode.com/problems/house-robber/
// You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them
// is that adjacent houses have security systems connected and
// it will automatically contact the police if two adjacent houses were broken into on the same night.
// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
// #dynamic-programming

// recursive:  robFrom(i) = Max(robFrom(i + 1), nums[i] + robFrom(i + 2))
/**
 * Algorithm

1. We define a function called robFrom() which takes the index of the house that the robber currently has to examine.
    Also, this function takes the nums array which is required during the calculations.
2. At each step of our recursive call, the robber has two options. He can either rob the current house or not.
    2.1 If the robber chooses to rob the current house, then he have to skip the next house i.e robFrom(i + 2, nums). T
        he answer here would be whatever is returned by robFrom(i + 2, nums) in addition to the amount
        that the robber will get by robbing the current house i.e. nums[i].
    2.2 Otherwise, he can simply move on to the house next door and return whatever profit he will make in the sub-problem i.e. robFrom(i + 1, nums).
3. We need to find, cache, and return the maximum of these two options at each step.
4. robFrom(0, nums) will give us the answer to the entire problem.
 */
function rob(nums: number[]): number {
  const memo: { [key: number]: number } = {};

  function robFrom(idx: number): number {
    if (idx >= nums.length) return 0;
    if (idx in memo) return memo[idx];
    const max = Math.max(robFrom(idx + 1), nums[idx] + robFrom(idx + 2));
    memo[idx] = max;
    return max;
  }

  return robFrom(0);
}
