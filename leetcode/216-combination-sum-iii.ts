// https://leetcode.com/problems/combination-sum-iii

// Find all valid combinations of k numbers that sum up to n such that the following conditions are true:
// Only numbers 1 through 9 are used.
// Each number is used at most once.
// Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

// https://leetcode.com/problems/combination-sum-iii/?envType=study-plan-v2&envId=leetcode-75

function combinationSum3(k: number, n: number): number[][] {
  const nums = [...Array(9).keys()].map((i) => i + 1);
  const res: number[][] = [];

  const combinationSumHelper = (combs: number[] = [], sum = 0, idx = 0) => {
    if (sum === n && combs.length === k) {
      res.push(combs);
    }
    if (sum < n && combs.length < k) {
      for (let i = idx; i < 9; i++) {
        combinationSumHelper([...combs, nums[i]], sum + nums[i], i + 1);
      }
    }
  };

  combinationSumHelper();

  return res;
}
