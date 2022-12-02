// https://leetcode.com/problems/combinations/
// Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const combinations: number[] = [];

  function helper(startIndex: number, n: number, k: number): void {
    if (combinations.length === k) {
      result.push([...combinations]);
      return;
    }

    for (let i = startIndex; i <= n; i++) {
      combinations.push(i);
      helper(i + 1, n, k);
      combinations.pop();
    }
  }

  helper(1, n, k);
  return result;
}

/**
 * Backtracking is an algorithm for finding all solutions by exploring all potential candidates.
 * If the solution candidate turns to be not a solution (or at least not the last one),
 * backtracking algorithm discards it by making some changes on the previous step, i.e. backtracks and then try again.

Here is a backtrack function which takes a first integer to add and a current combination as arguments backtrack(first, curr).

1. If the current combination is done - add it to output.
2. Iterate over the integers from first to n.
  2.1 Add integer i into the current combination curr.
  2.2 Proceed to add more integers into the combination : backtrack(i + 1, curr).
  2.3 Backtrack by removing i from curr.
 */
