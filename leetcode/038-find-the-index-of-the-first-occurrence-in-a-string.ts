// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
// ✅ 1 <= haystack.length, needle.length <= 104
// ✅ haystack and needle consist of only lowercase English characters.

// sinple straight solution
function strStr(haystack: string, needle: string): number {
  return haystack.indexOf(needle);
}

// sliding window:
// Here N is the length of haystack and M the length of needle
// ★ Time Complexity O(N - M + 1)
// ☆ Space Complexity O(1)
// Explanation
// Loop through each strings built with the needle length
// If it is the same as the needle, return the index
// If nothing returned during the loop, return -1

function strStr2(haystack: string, needle: string): number {
  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    if (haystack.slice(i, i + needle.length) === needle) return i;
  }

  return -1;
}
