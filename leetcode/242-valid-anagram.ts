// https://leetcode.com/problems/valid-anagram/
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
// typically using all the original letters exactly once.

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  return [...s].sort().join('') === [...t].sort().join('');
}

// if the string got big, array solution maybe too big, better use hash table solution
// hash table to count the freq of each character
function isAnagram2(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const hash: Record<string, number> = {};
  s.split('').forEach((c) => {
    if (hash[c]) hash[c]++;
    else hash[c] = 1;
  });
  let res = true;
  t.split('').forEach((c) => {
    if (hash[c]) {
      hash[c]--;
      if (hash[c] === 0) {
        delete hash[c];
      }
    } else {
      res = false;
    }
  });

  return res && Object.keys(hash).length === 0;
}
