// https://leetcode.com/problems/stone-game-ii
// Alice and Bob continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].  The objective of the game is to end with the most stones.
// Alice and Bob take turns, with Alice starting first.  Initially, M = 1.
// On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X).
// The game continues until all the stones have been taken.
// Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

//Constraints:
// 1 <= piles.length <= 100
// 1 <= piles[i] <= 10^4

// Example 1:
// Input: piles = [2,7,9,4,4]
// Output: 10
// Explanation:  If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 piles in total. If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 piles in total. So we return 10 since it's larger.

// https://leetcode.com/problems/stone-game-ii/solutions/5662815/optimizing-stone-collection-in-stone-game-ii-using-dynamic-programming-100-runtime-efficiency/
// 1. compute a prefix sum array ps where ps[i] gives the sum of stones in the first i piles
// 2. dynamic programming:
//    - use a 2D DP array dp where dp[i][m] represents the maximum number of stones a player can collect starting from i-th pile with current max move m
//    - Base case: if 2m(double the max allower move) is >= remaining piles, take all the remaining stones
//    - recursive case: for each possible move x (from 1 to 2m), calculate the maximum stones by trying  to minimize the opponent's result
// 3. recursive DFS: recursively from 1 to 2m piles, and store the result in DP array to avoid redundant calculations
function stoneGameII(piles: number[]): number {
  const n = piles.length;
  const dp: number[][] = Array.from({ length: n }, (_) =>
    new Array(n + 1).fill(0),
  );
  const ps = new Array(n + 1).fill(0); // prefix sum array

  for (let i = 0; i < n; i++) {
    ps[i + 1] = ps[i] + piles[i];
  }

  const dfs = (i: number, m: number) => {
    if (m * 2 >= n - i) {
      return ps[n] - ps[i];
    }
    if (dp[i][m]) {
      return dp[i][m];
    }
    let res = 0;
    for (let x = 1; x <= 2 * m; x++) {
      res = Math.max(res, ps[n] - ps[i] - dfs(i + x, Math.max(m, x)));
    }
    return (dp[i][m] = res);
  };

  return dfs(0, 1);
}

// https://leetcode.com/problems/stone-game-ii/solutions/3564278/148ms-100-beats-runtime-typescript-javascript/
function stoneGameII2(piles: number[]): number {
  const sums = [...piles];
  const dp: number[][] = Array(piles.length + 1)
    .fill(null)
    .map((_) => Array(piles.length + 1).fill(0));
  for (let i = piles.length - 2; i >= 0; i--) {
    sums[i] += sums[i + 1];
  }
  for (let i = 0; i < piles.length; i++) {
    dp[i][piles.length] = sums[i];
  }
  for (let i = piles.length - 1; i >= 0; i--) {
    for (let j = piles.length - 1; j >= 1; j--) {
      const x = 2 * j;
      const y = piles.length - i;
      for (let t = 1; t <= x && t <= y; t++) {
        dp[i][j] = Math.max(dp[i][j], sums[i] - dp[i + t][Math.max(j, t)]);
      }
    }
  }
  return dp[0][1];
}
