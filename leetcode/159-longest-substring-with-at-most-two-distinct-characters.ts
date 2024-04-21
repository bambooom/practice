// https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/
// Given a string s, return the length of the longest substring that contains at most two distinct characters.
// #sliding-window

// Example 1:
// Input: s = "eceba"
// Output: 3
// Explanation: The substring is "ece" which its length is 3.

// Example 2:
// Input: s = "ccaabbb"
// Output: 5
// Explanation: The substring is "aabbb" which its length is 5.

// Sliding window with HashMap frequency count
function lengthOfLongestSubstringTwoDistinct(s: string): number {
  const charMap = new Map<string, number>();
  let res = 0;
  let left = 0;
  let right = 0;

  while (right < s.length) {
    charMap.set(s[right], (charMap.get(s[right]) ?? 0) + 1);
    while (charMap.size > 2) {
      // 超过2个distinct char 的话就去掉left
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

// https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/solutions/5023944/typescript-version-of-editoral/
function getEarliestIndex(idx: Map<string, number>): number {
  let num = Infinity;
  idx.forEach((a) => (num = Math.min(a, num)));
  return num === Infinity ? 0 : num;
}
function lengthOfLongestSubstringTwoDistinct2(s: string): number {
  const n = s.length;
  const idx: Map<string, number> = new Map();
  let l = 0,
    r = 0,
    ans = 0;

  while (r < n) {
    const a = s[r];
    idx.set(a, r++);

    if (idx.size === 3) {
      const min = getEarliestIndex(idx);
      idx.delete(s[min]);
      l = min + 1;
    }

    ans = Math.max(ans, r - l);
  }

  return ans;
}
