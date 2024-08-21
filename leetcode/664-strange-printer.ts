// https://leetcode.com/problems/strange-printer/
// There is a strange printer with the following two special properties:
// - The printer can only print a sequence of the same character each time.
// - At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.
// Given a string s, return the minimum number of turns the printer needed to print it.

// Example 1:
// Input: s = "aaabbb"
// Output: 2
// Explanation: Print "aaa" first and then print "bbb".

// Example 2:
// Input: s = "aba"
// Output: 2
// Explanation: Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character 'a'.

// https://leetcode.com/problems/strange-printer/solutions/3835942/mastering-the-strange-printer-unraveling-dynamic-programming-mysteries/
// setting up a DP table where each cell dp[i][j] represents the minimum number of turns the printer needs to print the substring from i to j.
function strangePrinter(s: string): number {
  const n = s.length;
  const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1; // init diagonal with 1s because printer only needs one turn to print a single character

    // then bottom-up approach
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = dp[i][j - 1] + 1; // this corresponds to printing the substring from i to j-1 first and the printing the character at j separately.
      // however, if there are overlapping characters, we can print the substring in fewer turns
      // so we update dp[i][j] to be the minimum of its current value and dp[i][k] + dp[k+1][j-1]
      for (let k = i; k < j; k++) {
        if (s[k] === s[j]) {
          dp[i][j] = Math.min(
            dp[i][j],
            dp[i][k] + (k + 1 <= j - 1 ? dp[k + 1][j - 1] : 0),
          );
        }
      }
    }
  }

  return dp[0][n - 1];
}
