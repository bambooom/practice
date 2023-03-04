// https://leetcode.com/problems/combination-sum/
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.
// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.
// #backtracking

// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.

// Input: candidates = [2, 3, 5], target = 8
// Output: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]

// Input: candidates = [2], target = 1
// Output: []

// https://leetcode.com/problems/combination-sum/solutions/662307/javascript-clean-backtracking-solution/
// need review....
function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  function permute(arr: number[] = [], sum = 0, idx = 0) {
    if (sum > target) return;
    if (sum === target) result.push(arr);

    for (let i = idx; i < candidates.length; i++) {
      // each time add one more candidates
      permute([...arr, candidates[i]], sum + candidates[i], i);
    }
  }
  permute();
  return result;
}

// https://leetcode.com/problems/combination-sum/solutions/1378325/javascript-solution-with-detailed-explanation/
