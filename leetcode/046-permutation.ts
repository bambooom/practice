// https://leetcode.com/problems/permutations/
// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  /**
   * The goal is break down the problem by finding permutations in subarrays.
   * So we will maintain a subarray of fixed elements and a subarray for
   * exploring permutations.
   *
   *                  [1], [2, 3]    [1, 2], [3]    [1, 2, 3]
   * [], [1, 2, 3] -> [2], [1, 3] -> [1, 3], [2] -> [1, 3, 2]
   *                  [3], [1, 2]    [2, 1], [1]    [2, 1, 3]
   *                                 [2, 3], [1]    [2, 3, 1]
   *                                 [3, 1], [2]    [3, 1, 2]
   *                                 [3, 2], [1]    [3, 2, 1]
   */

  function dfs(curr: number[], rest: number[]) {
    // base case. Found a permutation because there's nothing else to explore.
    if (rest.length === 0) {
      result.push(curr);
      return;
    }
    for (let i = 0; i < rest.length; i++) {
      dfs([...curr, rest[i]], [...rest.slice(0, i), ...rest.slice(i + 1)]);
    }
  }

  dfs([], nums);

  return result;
}
