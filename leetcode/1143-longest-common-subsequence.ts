// https://leetcode.com/problems/longest-common-subsequence/
// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.
// #dynamic-programming

function longestCommonSubsequence(text1: string, text2: string): number {
  const dp = [];
  const m = text1.length;
  const n = text2.length;

  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // two  possible scenarioes:
      // 1. the current char of text1 and text2 does not match
      // 2. the current char of text1 and text2 matches

      if (text1.charAt(i - 1) != text2.charAt(j - 1)) {
        // check left and top for longer subsequence length
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      } else {
        // check diag for prev longest subsequence length and add 1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
    }
  }

  return dp[m][n];
}

function longestCommonSubsequence2(text1: string, text2: string): number {
  // padding one space for empty string representation
  text1 = ' ' + text1;
  text2 = ' ' + text2;

  const [w, h] = [text1.length, text2.length];

  const dp = Array(h)
    .fill(0)
    .map(() => new Array(w).fill(0));

  // update dynamic programming table with optimal substructure
  for (let y = 1; y < h; y++) {
    for (let x = 1; x < w; x++) {
      if (text1[x] == text2[y]) {
        // with the same character
        // extend the length of common subsequence
        dp[y][x] = dp[y - 1][x - 1] + 1;
      } else {
        // with different characters
        // choose the optimal subsequence
        dp[y][x] = Math.max(dp[y - 1][x], dp[y][x - 1]);
      }
    }
  }

  return dp[h - 1][w - 1];
}
