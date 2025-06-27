// https://leetcode.com/problems/longest-subsequence-repeated-k-times/
// You are given a string s of length n, and an integer k. You are tasked to find the longest subsequence repeated k times in string s.
// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.
// A subsequence seq is repeated k times in the string s if seq * k is a subsequence of s, where seq * k represents a string constructed by concatenating seq k times.
// For example, "bba" is repeated 2 times in the string "bababcba", because the string "bbabba", constructed by concatenating "bba" 2 times, is a subsequence of the string "bababcba".
// Return the longest subsequence repeated k times in string s. If multiple such subsequences are found, return the lexicographically largest one. If there is no such subsequence, return an empty string.

// Example 1:
// Input: s = "letsleetcode", k = 2
// Output: "let"
// Explanation: There are two longest subsequences repeated 2 times: "let" and "ete".
// "let" is the lexicographically largest one.

// Example 2:
// Input: s = "bb", k = 2
// Output: "b"
// Explanation: The longest subsequence repeated 2 times is "b".

// Example 3:
// Input: s = "ab", k = 2
// Output: ""
// Explanation: There is no subsequence repeated 2 times. Empty string is returned.

// https://leetcode.com/problems/longest-subsequence-repeated-k-times/solutions/6891002/hard-with-easy-approach-5-languages-c-python3-java-js-ts/?envType=daily-question&envId=2025-06-27
function longestSubsequenceRepeatedK(s: string, k: number): string {
  // Helper function to verify whether a candidate subsequence can appear k times as a subsequence
  const check = (sub: string, s: string, k: number): boolean => {
    // Initialize count of occurrences and index in subsequence
    let count = 0;
    let i = 0;

    // Iterate over characters in the string
    for (const c of s) {
      // If current character matches the next character in the subsequence, increment index
      if (i < sub.length && c === sub[i]) {
        i++;
        // If we've reached the end of the subsequence, reset index and increment count
        if (i === sub.length) {
          i = 0;
          count++;
          // If we've reached k occurrences, return true
          if (count === k) {
            return true;
          }
        }
      }
    }

    // If we didn't find k occurrences, return false
    return false;
  };

  // count the frequency of each character
  const freq: Record<string, number> = {};
  for (const c of s) {
    freq[c] = (freq[c] || 0) + 1;
  }

  // Initialize an array to store valid characters (those that appear at least k times)
  const valid: string[] = [];
  // Iterate over ASCII values of lowercase letters in reverse order
  for (let c = 122; c >= 97; c--) {
    const ch = String.fromCharCode(c);
    // Filter characters that appear at least k times and sort them in reverse lexicographical order
    if ((freq[ch] || 0) >= k) {
      valid.push(ch);
    }
  }

  // Calculate the maximum possible length of the subsequence (string length divided by k)
  const maxLen = Math.floor(s.length / k);
  // Initialize the result subsequence and a queue for BFS
  let res = '';
  const q = [''];

  // Perform BFS to find the longest subsequence
  while (q.length > 0) {
    const curr = q.shift()!;

    // Iterate over valid characters
    for (const c of valid) {
      // Construct the next subsequence by appending the current character
      const next = curr + c;

      // If the next subsequence is too long, skip it
      if (next.length > maxLen) {
        continue;
      }
      // Check if the next subsequence appears at least k times
      if (check(next, s, k)) {
        // If the next subsequence is longer or lexicographically larger than the current result, update the result
        if (
          next.length > res.length ||
          (next.length === res.length && next > res)
        ) {
          res = next;
        }

        // Enqueue the next subsequence for further exploration
        q.push(next);
      }
    }
  }

  return res;
}
