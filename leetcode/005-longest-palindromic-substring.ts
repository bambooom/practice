// https://leetcode.com/problems/longest-palindromic-substring
// Given a string s, return the longest palindromic substring in s.
// dynamic programming

function longestPalindrome(s: string): string {
  if (!s) return '';
  // ll: Left index of the longest palindrome.
  // rr: Right index of the longest palindrome.
  let ll = 0;
  let rr = 0;

  // Iterate all palindromes with center indices
  // [..., i, ...] or [... i, i+1, ...]
  for (let i = 0; i < s.length; i++) {
    for (const j of [i, i + 1]) {
      for (let l = i, r = j; s[l] && s[l] === s[r]; l--, r++)
        // Found a new palindrome [l, ..., i, j, ..., r]
        // Update the ll, rr if the newly found palindrome is longer than the
        // existing one.
        [ll, rr] = r - l + 1 > rr - ll + 1 ? [l, r] : [ll, rr];
    }
  }
  return s.substring(ll, rr + 1);
}

// https://zkf85.github.io/2019/03/26/leetcode-005-longest-palindrome
