// https://leetcode.com/problems/edit-distance/
// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
// You have the following three operations permitted on a word:
// - Insert a character
// - Delete a character
// - Replace a character
// #dynamic-programming

// Input: word1 = "horse", word2 = "ros"
// Output: 3
// Explanation:
// horse -> rorse (replace 'h' with 'r')
// rorse -> rose (remove 'r')
// rose -> ros (remove 'e')

function minDistance(word1: string, word2: string): number {
  const m = word1.length,
    n = word2.length;
  // 我们要多添加一行一列，用来做base case
  const dp = Array.from(Array(word1.length + 1), () =>
    Array(word2.length + 1).fill(0),
  );
  // 添加一列，base case
  for (let i = 1; i <= m; i++) {
    dp[i][0] = i;
  }
  // 添加一行，base case
  for (let i = 1; i <= n; i++) {
    dp[0][i] = i;
  }
  // 因为我们补了一行/列base case,这里都从1开始
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // 相等，什么都不做
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // s1删除操作
          dp[i][j - 1] + 1, // s1插入操作
          dp[i - 1][j - 1] + 1, // 替换
        );
      }
    }
  }
  return dp[m][n];
}

// https://leetcode.com/problems/edit-distance/solutions/5633391/optimizing-edit-distance-calculation-with-dynamic-programming-execution-time-60ms/?envType=study-plan-v2&envId=top-100-liked
// compact version
function minDistance2(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const f: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (let j = 1; j <= n; j++) {
    f[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    f[i][0] = i;

    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        f[i][j] = f[i - 1][j - 1];
      } else {
        f[i][j] = Math.min(f[i - 1][j], f[i][j - 1], f[i - 1][j - 1]) + 1;
      }
    }
  }
  return f[m][n];
}
