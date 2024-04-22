// https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/description/

// Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.
// Example 1:
// Input: s = "eceba", k = 2
// Output: 3
// Explanation: The substring is "ece" with length 3.
// Example 2:
// Input: s = "aa", k = 1
// Output: 2
// Explanation: The substring is "aa" with length 2.

// #sliding-window

// 效仿 q190
function lengthOfLongestSubstringKDistinct(s: string, k: number): number {
  const charMap = new Map<string, number>();
  let res = 0;
  let left = 0;
  let right = 0;

  while (right < s.length) {
    charMap.set(s[right], (charMap.get(s[right]) ?? 0) + 1);
    while (charMap.size > k) {
      charMap.set(s[left], charMap.get(s[left])! - 1);
      if (charMap.get(s[left]) === 0) {
        charMap.delete(s[left]);
      }
      left++;
    }
    res = Math.max(res, right - left + 1);
    right++;
  }
  return res;
}
