// https://leetcode.com/problems/first-missing-positive/
// Given an unsorted integer array nums, return the smallest missing positive integer.
// You must implement an algorithm that runs in O(n) time and uses constant extra space.

// Input: nums = [1,2,0]
// Output: 3
// Explanation: The numbers in the range[1, 2] are all in the array.
// ---
// Input: nums = [3, 4, -1, 1]
// Output: 2
// Explanation: 1 is in the array but 2 is missing.
// ---
// Input: nums = [7,8,9,11,12]
// Output: 1
// Explanation: The smallest positive integer 1 is missing.

// 对于一个长度为 N 的数组，其中没有出现的最小正整数只能在 [1, N+1] 中。
// 这是因为如果[1, N] 都出现了，那么答案是 N + 1，否则答案是[1, N] 中没有出现的最小正整数。
// 这样一来，我们将所有在[1, N]范围内的数放入哈希表，也可以得到最终的答案
// 我们对数组进行遍历，对于遍历到的数 x，如果它在 [1, N] 的范围内，那么就将数组中的第 x-1 个位置（注意：数组下标从 0 开始）打上「标记」。
// 在遍历结束之后，如果所有的位置都被打上了标记，那么答案是 N + 1，否则答案是最小的没有打上标记的位置加 1。
// Algo:
// - 我们将数组中所有小于等于 0 的数修改为 N+1；
// - 我们遍历数组中的每一个数 x，它可能已经被打了标记，因此原本对应的数为 |x|(为绝对值符号)。如果 ∣x∣∈[1,N]，那么我们给数组中的第 ∣x∣−1 个位置的数添加一个负号。注意如果它已经有负号，不需要重复添加；
// - 在遍历完成之后，如果数组中的每一个数都是负数，那么答案是 N+1，否则答案是第一个正数的位置加 1。

function firstMissingPositive(nums: number[]): number {
  const N = nums.length;
  for (let i = 0; i < N; i++) {
    if (nums[i] <= 0) nums[i] = N + 1;
  }
  for (let i = 0; i < N; i++) {
    const x = Math.abs(nums[i]);
    if (x >= 1 && x <= N) {
      nums[x - 1] = nums[x - 1] < 0 ? nums[x - 1] : -nums[x - 1];
    }
  }
  for (let i = 0; i < N; i++) {
    if (nums[i] >= 0) return i + 1;
  }
  return N + 1;
}
