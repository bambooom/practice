// https://leetcode.com/problems/extra-characters-in-a-string
// You are given a 0-indexed string s and a dictionary of words dictionary. You have to break s into one or more non-overlapping substrings such that each substring is present in dictionary. There may be some extra characters in s which are not present in any of the substrings.
// Return the minimum number of extra characters left over if you break up s optimally.

// Example 1:
// Input: s = "leetscode", dictionary = ["leet","code","leetcode"]
// Output: 1
// Explanation: We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. There is only 1 unused character (at index 4), so we return 1.

// Example 2:
// Input: s = "sayhelloworld", dictionary = ["hello","world"]
// Output: 3
// Explanation: We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. The characters at indices 0, 1, 2 are not used in any substring and thus are considered as extra characters. Hence, we return 3.

// https://leetcode.com/problems/extra-characters-in-a-string/solutions/5822790/beats-super-easy-beginners/
function minExtraChar(s: string, dictionary: string[]): number {
  const n = s.length;
  const dictSet = new Set(dictionary);
  const dp: number[] = new Array(n + 1).fill(0);
  // dp[i] represents the mininum number of extra characters required if we start partitioning the string s from index i;

  // For each starting index i, check substrings s[i:j+1] for all possible j (where j ranges from i to n). If a substring is found in the dictionary, update dp[i] by considering the result of dp[j + 1].
  for (let i = n - 1; i >= 0; i--) {
    dp[i] = dp[i + 1] + 1; // worst case: one extra character
    for (let j = i; j < n; j++) {
      const substring = s.slice(i, j + 1);
      if (dictSet.has(substring)) {
        dp[i] = Math.min(dp[i], dp[j + 1]);
      }
    }
  }

  return dp[0];
}

// https://leetcode.com/problems/extra-characters-in-a-string/solutions/5822158/easy-approach-very-helpful/
// seems faster
function minExtraChar2(s: string, dictionary: string[]): number {
  const n = s.length;
  const dp: number[] = Array(n + 1)
    .fill(0)
    .map((_, i) => i); // dp[i] stores the minimum extra characters up to index i

  for (let i = 0; i < n; i++) {
    // Check each word in the dictionary
    for (const word of dictionary) {
      const wordLen = word.length;
      // If the word fits in the current substring
      if (i + wordLen <= n && s.substring(i, i + wordLen) === word) {
        dp[i + wordLen] = Math.min(dp[i + wordLen], dp[i]);
      }
    }
    // Increment the count of extra characters
    dp[i + 1] = Math.min(dp[i + 1], dp[i] + 1);
  }

  return dp[n];
}
