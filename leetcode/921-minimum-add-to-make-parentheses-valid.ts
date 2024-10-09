// https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/
// A parentheses string is valid if and only if:
// It is the empty string,
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.
// You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.
// For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".
// Return the minimum number of moves required to make s valid.

// Example 1:
// Input: s = "())"
// Output: 1

// Example 2:
// Input: s = "((("
// Output: 3

// basically is count the difference of open and close parenthesis
function minAddToMakeValid(s: string): number {
  if (s === '') return 0;

  let ans = 0;
  let count = 0;

  for (const ch of s) {
    if (ch === '(') {
      count++;
    } else {
      count--;
    }

    if (count < 0) {
      ans += -count;
      count = 0;
    }
  }

  ans += count;
  return ans;
}

// https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/solutions/5889379/only-6-lines-beats-no-stack-all-language-solution/
function minAddToMakeValid2(s: string): number {
  let openBracketsCount = 0;
  let closedBracketsCount = 0;

  for (const ch of s) {
    if (ch === '(') {
      openBracketsCount++;
    } else if (openBracketsCount > 0) {
      openBracketsCount--;
    } else {
      closedBracketsCount++;
    }
  }

  return openBracketsCount + closedBracketsCount;
}
