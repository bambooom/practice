// https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary/
// You are given a list of strings of the same length words and a string target.

// Your task is to form target using the given words under the following rules:
// target should be formed from left to right.
// To form the ith character (0-indexed) of target, you can choose the kth character of the jth string in words if target[i] = words[j][k].
// Once you use the kth character of the jth string of words, you can no longer use the xth character of any string in words where x <= k. In other words, all characters to the left of or at index k become unusuable for every string.
// Repeat the process until you form the string target.
// Notice that you can use multiple characters from the same string in words provided the conditions above are met.

// Return the number of ways to form target from words. Since the answer may be too large, return it modulo 109 + 7.

// Example 1:
// Input: words = ["acca","bbbb","caca"], target = "aba"
// Output: 6
// Explanation: There are 6 ways to form target.
// "aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("caca")
// "aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("caca")
// "aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("acca")
// "aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("acca")
// "aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("acca")
// "aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("caca")

// Example 2:
// Input: words = ["abba","baab"], target = "bab"
// Output: 4
// Explanation: There are 4 ways to form target.
// "bab" -> index 0 ("baab"), index 1 ("baab"), index 2 ("abba")
// "bab" -> index 0 ("baab"), index 1 ("baab"), index 3 ("baab")
// "bab" -> index 0 ("baab"), index 2 ("baab"), index 3 ("baab")
// "bab" -> index 1 ("abba"), index 2 ("baab"), index 3 ("baab")

// https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary/solutions/6199628/beats-90-users-with-c-80-users-with-java-javascript-dp-python3/
// DP
function numWays(words: string[], target: string): number {
  const MOD = 1_000_000_007;
  const m = target.length;
  const n = words[0].length;

  // preprocess: frequency of characters in each column
  const count: number[][] = Array.from({ length: n }, () => Array(26).fill(0));
  for (const word of words) {
    for (let i = 0; i < n; i++) {
      count[i][word.charCodeAt(i) - 97]++;
    }
  }

  // dp[j] represents the number of ways to form target[j:]
  const dp: number[] = Array(m + 1).fill(0);
  dp[0] = 1; // base case: 1 way to form an empty target

  // iterate through each column in words
  for (let i = 0; i < n; i++) {
    for (let j = m - 1; j >= 0; j--) {
      // traverse target in reverse
      const charIndex = target.charCodeAt(j) - 97;
      dp[j + 1] = (dp[j + 1] + dp[j] * count[i][charIndex]) % MOD;
    }
  }

  return dp[m];
}
