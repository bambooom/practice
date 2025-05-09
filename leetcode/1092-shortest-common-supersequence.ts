// https://leetcode.com/problems/shortest-common-supersequence/description/
// Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, return any of them.
// A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.

// Example 1:
// Input: str1 = "abac", str2 = "cab"
// Output: "cabac"
// Explanation:
// str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
// str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
// The answer provided is the shortest such string that satisfies these properties.

// Example 2:
// Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
// Output: "aaaaaaaa"

// https://leetcode.com/problems/shortest-common-supersequence/solutions/4723898/typescript-beats-70-get-longest-common-subsequence-first/
// Get longest common subsequence (LCS)
// Iterate through LCS characters and fill in letters from either str1 or str2 that are not in LCS
function shortestCommonSupersequence(str1: string, str2: string): string {
  // the approach is to find the longest common subsequence and then add the remaining characters
  // to the LCS to get the shortest common supersequence

  const longestCommonSubsequenceStrBu = (
    str1: string,
    str2: string,
  ): string => {
    // build dp
    const memo: string[][] = Array.from({ length: str1.length + 1 }, () =>
      Array(str2.length + 1).fill(''),
    );

    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          memo[i][j] = memo[i - 1][j - 1] + str1[i - 1];
        } else {
          memo[i][j] =
            memo[i - 1][j].length > memo[i][j - 1].length
              ? memo[i - 1][j]
              : memo[i][j - 1];
        }
      }
    }

    return memo[str1.length][str2.length];
  };

  const lcs = longestCommonSubsequenceStrBu(str1, str2);

  let result = '';
  let i = 0;
  let j = 0;

  for (const char of lcs) {
    while (str1[i] !== char) {
      result += str1[i++];
    }

    while (str2[j] !== char) {
      result += str2[j++];
    }

    result += char;
    i++;
    j++;
  }

  // add the remaining characters from str1 and str2
  result += str1.slice(i) + str2.slice(j);
  return result;
}

// https://neetcode.io/solutions/shortest-common-supersequence
// https://www.youtube.com/watch?v=JkjQNJSxXN0
// bottom up dynamic programming + tracing
function shortestCommonSupersequence2(str1: string, str2: string): string {
  const n = str1.length,
    m = str2.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(0),
  );

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const res: string[] = [];
  let i = n,
    j = m;

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      res.push(str1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] < dp[i][j - 1]) {
      res.push(str1[i - 1]);
      i--;
    } else {
      res.push(str2[j - 1]);
      j--;
    }
  }

  while (i > 0) {
    res.push(str1[i - 1]);
    i--;
  }

  while (j > 0) {
    res.push(str2[j - 1]);
    j--;
  }

  return res.reverse().join('');
}
