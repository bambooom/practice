// https://leetcode.com/problems/unique-length-3-palindromic-subsequences/
// Given a string s, return the number of unique palindromes of length three that are a subsequence of s.
// Note that even if there are multiple ways to obtain the same subsequence, it is still only counted once.
// A palindrome is a string that reads the same forwards and backwards.
// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
// For example, "ace" is a subsequence of "abcde".

// Example 1:
// Input: s = "aabca"
// Output: 3
// Explanation: The 3 palindromic subsequences of length 3 are:
// - "aba" (subsequence of "aabca")
// - "aaa" (subsequence of "aabca")
// - "aca" (subsequence of "aabca")

// Example 2:
// Input: s = "adc"
// Output: 0
// Explanation: There are no palindromic subsequences of length 3 in "adc".

// Example 3:
// Input: s = "bbcbaba"
// Output: 4
// Explanation: The 4 palindromic subsequences of length 3 are:
// - "bbb" (subsequence of "bbcbaba")
// - "bcb" (subsequence of "bbcbaba")
// - "bab" (subsequence of "bbcbaba")
// - "aba" (subsequence of "bbcbaba")

// https://leetcode.com/problems/unique-length-3-palindromic-subsequences/solutions/4285483/beats-96-16-easiest-approach-beginner-friendly-explanation/
// using two pointers:
// 1. Here we initialize a count variable to 0 which will store the final answer.
// 2. We iterate over all the characters of the string and find the first and last occurrence of each character.
// 3. Then we find the number of unique characters between the first and last occurrence of each character.
// 4. add the count to the final answer.
function countPalindromicSubsequence(s: string): number {
  let count = 0;
  for (let i = 0; i < 26; ++i) {
    const currentChar = String.fromCharCode(i + 97);
    const l = s.indexOf(currentChar);
    const r = s.lastIndexOf(currentChar);
    if (l !== -1 && r !== -1 && l < r) {
      count += new Set([...s.substring(l + 1, r)]).size;
    }
  }
  return count;
}
