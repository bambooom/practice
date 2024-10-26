// https://leetcode.com/problems/valid-parentheses/

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:
// Input: s = "()"
// Output: true
// Example 2:
// Input: s = "()[]{}"
// Output: true
// Example 3:
// Input: s = "(]"
// Output: false
// Example 4:
// Input: s = "([])"
// Output: true

const brackets: Record<string, string> = {
  '(': ')',
  '{': '}',
  '[': ']',
};

// using stack:
// for open brackets, push to stack
// for closing bracets, pop the stack and check corresponding or not
export function isValid(s: string): boolean {
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (Object.keys(brackets).includes(c)) {
      stack.push(c);
    } else {
      const tmp = stack.pop() || '';
      if (!(brackets[tmp] === c)) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// from community
export function isValid2(s: string): boolean {
  while (
    s.indexOf('{}') !== -1 ||
    s.indexOf('[]') !== -1 ||
    s.indexOf('()') !== -1
  ) {
    s = s.replace('()', '');
    s = s.replace('{}', '');
    s = s.replace('[]', '');
  }
  return s === '';
}
