// https://leetcode.com/problems/reverse-words-in-a-string-ii
// solve the problem in-place, i.e. without allocating extra space.

// Example 1:
// Input: s = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
// Output: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]

// The idea is simple: reverse the whole string and then reverse each word.

/**
  Do not return anything, modify s in-place instead.
 */
function reverseWords(s: string[]): void {
  const reverse = (start: number, end = s.length - 1) => {
    while (start < end) {
      [s[start], s[end]] = [s[end], s[start]];
      start++;
      end--;
    }
  };

  reverse(0);

  let lastIndex = 0;
  for (let i = 0; i <= s.length; i++) {
    if (s[i] !== ' ' && i !== s.length) continue;
    reverse(lastIndex, i - 1);
    lastIndex = i + 1;
  }
}
