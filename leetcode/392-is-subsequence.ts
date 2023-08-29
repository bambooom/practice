// https://leetcode.com/problems/is-subsequence/
// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).
// #two-pointer

function isSubsequence(s: string, t: string): boolean {
  // two pointers for each array
  let i = 0;
  let j = 0;

  // for left index of s, move right index on t to match s[i]
  // if match, increment i
  while (j < t.length) {
    if (s[i] === t[j]) {
      i++;
    }
    j++;
  }
  // at last, check i with s length to decide whether all chars in s is matched
  return i === s.length;
}
