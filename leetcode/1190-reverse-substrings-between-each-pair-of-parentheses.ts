// https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses

// You are given a string s that consists of lower case English letters and brackets.
// Reverse the strings in each pair of matching parentheses, starting from the innermost one.
// Your result should not contain any brackets.

// Example 1:
// Input: s = "(abcd)"
// Output: "dcba"

// Example 2:
// Input: s = "(u(love)i)"
// Output: "iloveu"
// Explanation: The substring "love" is reversed first, then the whole string is reversed.

// Example 3:
// Input: s = "(ed(et(oc))el)"
// Output: "leetcode"
// Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.

// stack
function reverseParentheses(s: string): string {
  const chars = s.split('');

  const swap = (arr: any[], a: number, b: number) => {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  };

  const reverse = (l: number, r: number) => {
    while (l < r) {
      swap(chars, l++, r--);
    }
  };

  const stack: Array<[index: number]> = [[0]];
  for (let i = 1; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push([i]);
    } else if (s[i] === ')') {
      const [index] = stack.pop()!;
      reverse(index + 1, i - 1);
    }
  }

  return chars.filter((v) => v !== '(' && v !== ')').join('');
}

// https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/solutions/4411549/string-slice-split-reverse-join-52-ms/?envType=daily-question&envId=2024-07-11
// js string operations
function reverseParentheses2(s: string): string {
  while (s.includes('(')) {
    const start: number = s.lastIndexOf('(');
    const end: number = s.indexOf(')', start + 1);

    s =
      s.slice(0, start) +
      s
        .slice(start + 1, end)
        .split('')
        .reverse()
        .join('') +
      s.slice(end + 1);
  }

  return s;
}
