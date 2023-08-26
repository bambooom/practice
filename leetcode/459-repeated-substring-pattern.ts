// https://leetcode.com/problems/repeated-substring-pattern/
// Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

// by math, check the 因数 of the string length
// Time complexity: O(n⋅sqrt(n))
// Space complexity: O(n)
function repeatedSubstringPattern(s: string): boolean {
  const len = s.length;
  const factors: string[] = [];

  for (let i = 0; i + 1 <= len / 2; i++) {
    if (len % (i + 1) === 0) {
      factors.push(s.slice(0, i + 1));
    }
  }

  for (const str of factors) {
    if (s.replaceAll(str, '') === '') {
      return true;
    }
  }

  return false;
}

// better solution is String Concatenation
// Trick is to duplicate and the remove first and last characters, that would give an indication if string has repeated items
function repeatedSubstringPattern2(s: string): boolean {
  return (s + s).slice(1, s.length * 2 - 1).indexOf(s) !== -1;
}

function repeatedSubstringPattern3(s: string): boolean {
  return s.repeat(2).slice(1, -1).includes(s);
}
