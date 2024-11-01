// https://leetcode.com/problems/delete-characters-to-make-fancy-string/
// A fancy string is a string where no three consecutive characters are equal.
// Given a string s, delete the minimum possible number of characters from s to make it fancy.
// Return the final string after the deletion. It can be shown that the answer will always be unique.

// Example 1:
// Input: s = "leeetcode"
// Output: "leetcode"
// Explanation:
// Remove an 'e' from the first group of 'e's to create "leetcode".
// No three consecutive characters are equal, so return "leetcode".

// Example 2:
// Input: s = "aaabaaaa"
// Output: "aabaa"
// Explanation:
// Remove an 'a' from the first group of 'a's to create "aabaaaa".
// Remove two 'a's from the second group of 'a's to create "aabaa".
// No three consecutive characters are equal, so return "aabaa".

// Example 3:
// Input: s = "aab"
// Output: "aab"
// Explanation: No three consecutive characters are equal, so return "aab".

// using regex, but too slow, time limit exceeded
function makeFancyString(s: string): string {
  while (/([a-z])\1{2,}/.test(s)) {
    s = s.replace(/([a-z])\1{2,}/, '$1$1');
  }
  return s;
}

// https://leetcode.com/problems/delete-characters-to-make-fancy-string/solutions/5991490/it-is-the-easiest-to-aproach-in-typescript/
// using stack
function makeFancyString2(s: string): string {
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    if (
      stack.length >= 2 &&
      stack[stack.length - 2] === s[i] &&
      stack[stack.length - 1] === s[i]
    ) {
      continue;
    }
    stack.push(s[i]);
  }

  return stack.join('');
}

// https://leetcode.com/problems/delete-characters-to-make-fancy-string/solutions/5991578/beats-100-simple-explained-step-by-step/
function makeFancyString3(s: string): string {
  const chars = s.split('');

  if (chars.length < 3) {
    return s;
  }

  let j = 2;
  for (let i = 2; i < chars.length; i++) {
    // add current character if it's different from either the two previous ones
    if (chars[i] !== chars[j - 1] || chars[i] !== chars[j - 2]) {
      chars[j++] = chars[i];
    }
  }

  return chars.slice(0, j).join('');
}
