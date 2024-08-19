// https://leetcode.com/problems/subsets/description/
// Given an integer array nums of unique elements, return all possible subsets (the power set).
// The solution set must not contain duplicate subsets. Return the solution in any order.

// Example 1:
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
// Example 2:
// Input: nums = [0]
// Output: [[],[0]]

//https://leetcode.com/problems/subsets/solutions/1112454/javascript-typescript-backtrack-faster-than-100/?envType=study-plan-v2&envId=top-100-liked
function subsets(nums: number[]): number[][] {
  const result: Set<Array<number>> = new Set();

  const search = (s: number[], index: number) => {
    result.add(s);

    for (let i = index; i < nums.length; i++) {
      search([...s, nums[i]], i + 1);
    }
  };

  search([], 0);

  return Array.from(result);
}

// https://leetcode.com/problems/subsets/solutions/4015586/3-line-javascript-typescript-solution-iterative-recursive/?envType=study-plan-v2&envId=top-100-liked
// iterative
const subsetsIterative = (nums: number[]): number[][] => {
  const sets: number[][] = [[]];
  for (const num of nums) sets.push(...sets.map((set) => [...set, num]));
  return sets;
};
//recursive
const subsetsRecursive = (nums: number[], start = 0): number[][] => {
  if (start === nums.length) return [[]];
  const subs = subsetsRecursive(nums, start + 1);
  return [...subs.map((sub) => [nums[start], ...sub]), ...subs];
};
