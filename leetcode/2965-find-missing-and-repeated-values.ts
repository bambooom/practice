// https://leetcode.com/problems/find-missing-and-repeated-values/description/
// You are given a 0-indexed 2D integer matrix grid of size n * n with values in the range [1, n^2]. Each integer appears exactly once except a which appears twice and b which is missing. The task is to find the repeating and missing numbers a and b.
// Return a 0-indexed integer array ans of size 2 where ans[0] equals to a and ans[1] equals to b.

// Example 1:
// Input: grid = [[1,3],[2,2]]
// Output: [2,4]
// Explanation: Number 2 is repeated and number 4 is missing so the answer is [2,4].
// Example 2:
// Input: grid = [[9,1,7],[8,9,2],[3,4,6]]
// Output: [9,5]
// Explanation: Number 9 is repeated and number 5 is missing so the answer is [9,5].

// first try, not very efficient I guess
function findMissingAndRepeatedValues(grid: number[][]): number[] {
  const n = grid.length;
  const seen: Record<number, number> = {};
  for (let i = 1; i <= n * n; i++) {
    seen[i] = 0;
  }
  const res: number[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const num = grid[i][j];
      seen[num] += 1;
      if (seen[num] === 2) {
        res[0] = num;
      }
    }
  }

  Object.keys(seen).forEach((key) => {
    if (seen[+key] === 0) {
      res[1] = +key;
    }
  });
  return res;
}

// using 2d-array
function findMissingAndRepeatedValues2(grid: number[][]): number[] {
  const n = grid.length;
  let r = 0,
    m = 0;
  const a = new Array(n * n).fill(0);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) a[grid[i][j] - 1]++;
  for (let i = 0; i < n * n; i++)
    if (a[i] === 0) m = i + 1;
    else if (a[i] === 2) r = i + 1;
  return [r, m];
}

// using math sum to find missing
function findMissingAndRepeatedValues3(grid: number[][]): number[] {
  const n = grid.length;
  const ans = [0, 0],
    set = new Set();
  const needSum = (n ** 2 * (n ** 2 + 1)) / 2;
  let sum = 0;
  for (const row of grid) {
    for (const num of row) {
      if (set.has(num)) ans[0] = num;
      set.add(num);
      sum += num;
    }
  }
  ans[1] = needSum + ans[0] - sum;
  return ans;
}
