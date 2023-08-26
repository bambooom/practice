// https://leetcode.com/problems/repeated-substring-pattern/
// Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

// by math, check the 因数 of the string length
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
