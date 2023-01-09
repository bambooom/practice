// https://leetcode.com/problems/backspace-string-compare/
// Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
// Note that after backspacing an empty text, the text will continue empty.
// #two-pointers #stack #simulation

// Input: s = "ab#c", t = "ad#c"
// Output: true
// Explanation: Both s and t become "ac".
// Input: s = "ab##", t = "c#d#"
// Output: true
// Explanation: Both s and t become "".
// Input: s = "a#c", t = "b"
// Output: false
// Explanation: s becomes "c" while t becomes "b".

function backspaceCompare(s: string, t: string): boolean {
  const process = (s: string): string => {
    const res = [];
    for (const x of s.split('')) {
      x === '#' ? res.pop() : res.push(x);
    }
    return res.join('');
  };

  return process(s) === process(t);
}
