// https://leetcode.com/problems/counting-words-with-a-given-prefix/
// You are given an array of strings words and a string pref.
// Return the number of strings in words that contain pref as a prefix.
// A prefix of a string s is any leading contiguous substring of s.

function prefixCount(words: string[], pref: string): number {
  return words.filter((word) => word.startsWith(pref)).length;
}
