// https://leetcode.com/problems/combination-sum-ii/
// Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
// #backtracking

// Input: candidates = [10,1,2,7,6,1,5], target = 8
// Output:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]

function combinationSum2(candidates: number[], target: number): number[][] {
  if (!candidates || candidates.length == 0) return [];
  const res: number[][] = [];
  candidates.sort((a, b) => a - b);

  function helper(curSum: number, cur: number[], index: number) {
    if (curSum === target) {
      res.push([...cur]);
      return;
    }
    for (let i = index; i < candidates.length; i++) {
      // skip same candidate number
      if (i !== index && candidates[i] == candidates[i - 1]) {
        continue; //already return, go next loop(not recursion)
      }
      // if sum is larger than target, target sum not possible, return
      if (curSum > target) return;

      cur.push(candidates[i]);
      helper(curSum + candidates[i], cur, i + 1);
      cur.pop();
    }
  }
  helper(0, [], 0);
  return res;
}

const combinationSum22 = function (
  candidates: number[],
  target: number,
): number[][] {
  // No candidates, means no results
  if (!candidates) {
    return [];
  }

  // Empty set is the only solution for target 0
  if (target === 0) {
    return [[]];
  }

  // Sort the candidates array as otherwise we could
  // come up with solution [3,2,2] instead of [2,2,3]
  candidates.sort((a, b) => {
    return a - b;
  });

  // Store all possible combinations in here
  const paths: number[][] = [];

  // The recursive part.
  // t is what we're looking for. This will become smaller, deeper in to the recursive calls
  // p is where we will record our current path
  // i is the index of the numbers we're considering. Once we get stuck with the 2's
  // we will increase i to try other combinations

  const find = function (t: number, p: number[], i: number) {
    // check std out to  get a feel for the order in which we encounter 2,3,6,7
    // console.log('considering:', t , p, i);

    if (t === 0) {
      // we found a valid path, so store that in the paths.
      paths.push(p);
      return;
    } else {
      // don't run over the candidates array length
      // && don't try candidates that would bring target below 0
      while (i < candidates.length && t - candidates[i] >= 0) {
        // "Use" candidate[i]: Lower our target, and record the candidate in the path
        // We're cloning the path array, or it will contaminate future paths.
        // increase i with 1 in the next round as we're not allowed to reuse
        find(t - candidates[i], [...p, candidates[i]], i + 1);

        // "Lose" candidate[i]:
        // In our main example, we don't hit this path until the path of pure 2's
        // has been tried and found to lead to [2,2,2] with no candidates worth pursuing
        // further, because of the 2nd check of the while loop condition.
        i++;
        // extra increase in case we're dealing with dupes. No new path should start with the one
        // we just picked off below
        while (candidates[i - 1] === candidates[i]) {
          i++;
        }
      }
    }
  };

  // kick off initial case, we're looking for the original target,
  // our current path is empty, and we'll consider all candidates
  find(target, [], 0);

  return paths;
};

// https://leetcode.com/problems/combination-sum-ii/solutions/2922413/easy-to-understand-solution-beats-80-typescript/?envType=daily-question&envId=2024-08-13
function combinationSum23(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);

  const result: number[][] = [];

  const dfs = (cur: number[], idx: number, sum: number) => {
    if (sum === target) {
      result.push([...cur]);
      return;
    }

    if (idx >= candidates.length || sum > target) {
      return;
    }

    cur.push(candidates[idx]);
    dfs(cur, idx + 1, sum + candidates[idx]);
    cur.pop();

    while (
      idx + 1 < candidates.length &&
      candidates[idx] === candidates[idx + 1]
    ) {
      idx++;
    }
    dfs(cur, idx + 1, sum);
  };

  dfs([], 0, 0);

  return result;
}
