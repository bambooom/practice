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
