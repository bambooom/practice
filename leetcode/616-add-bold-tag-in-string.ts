// https://leetcode.com/problems/add-bold-tag-in-string/
// You are given a string s and an array of strings words.
// You should add a closed pair of bold tag <b> and </b> to wrap the substrings in s that exist in words.
// If two such substrings overlap, you should wrap them together with only one pair of closed bold-tag.
// If two substrings wrapped by bold tags are consecutive, you should combine them.
// Return s after adding the bold tags.

// Example 1:
// Input: s = "abcxyz123", words = ["abc","123"]
// Output: "<b>abc</b>xyz<b>123</b>"
// Explanation: The two strings of words are substrings of s as following: "abcxyz123".
// We add <b> before each substring and </b> after each substring.

// Example 2:
// Input: s = "aaabbb", words = ["aa","b"]
// Output: "<b>aaabbb</b>"
// Explanation:
// "aa" appears as a substring two times: "aaabbb" and "aaabbb".
// "b" appears as a substring three times: "aaabbb", "aaabbb", and "aaabbb".
// We add <b> before each substring and </b> after each substring: "<b>a<b>a</b>a</b><b>b</b><b>b</b><b>b</b>".
// Since the first two <b>'s overlap, we merge them: "<b>aaa</b><b>b</b><b>b</b><b>b</b>".
// Since now the four <b>'s are consecutive, we merge them: "<b>aaabbb</b>".

// https://leetcode.com/problems/add-bold-tag-in-string/solutions/731989/javascript-simple-solution/?envType=study-plan-v2&envId=premium-algo-100
function addBoldTag(s: string, words: string[]): string {
  const marked = new Array(s.length).fill(false);

  for (const word of words) {
    let start = s.indexOf(word);
    while (start > -1) {
      const end = start + word.length;
      for (let i = start; i < end; i++) {
        marked[i] = true;
      }
      start = s.indexOf(word, start + 1);
    }
  }

  let res = '';
  for (let i = 0; i < s.length; i++) {
    if (marked[i] && (i == 0 || !marked[i - 1])) {
      res += '<b>';
    }
    res += s[i];
    if (marked[i] && (i === s.length - 1 || !marked[i + 1])) {
      res += '</b>';
    }
  }
  return res;
}
