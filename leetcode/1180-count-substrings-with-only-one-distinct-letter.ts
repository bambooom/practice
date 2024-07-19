// https://leetcode.com/problems/count-substrings-with-only-one-distinct-letter/

// Given a string s, return the number of substrings that have only one distinct letter.
// Example 1:
// Input: s = "aaaba"
// Output: 8
// Explanation: The substrings with one distinct letter are "aaa", "aa", "a", "b".
// "aaa" occurs 1 time.
// "aa" occurs 2 times.
// "a" occurs 4 times.
// "b" occurs 1 time.
// So the answer is 1 + 2 + 4 + 1 = 8.
// Example 2:
// Input: s = "aaaaaaaaaa"
// Output: 55

// 每一连串相同字母的字串，一起算就是 1+2+3+...+n
function countLetters(s: string): number {
  let res = 0;
  let c = 1;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === s[i + 1]) {
      c++;
    } else {
      res += (c * (c + 1)) / 2;
      c = 1;
    }
  }

  res += (c * (c + 1)) / 2;
  return res;
}
