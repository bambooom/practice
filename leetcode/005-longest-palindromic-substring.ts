// https://leetcode.com/problems/longest-palindromic-substring
// Given a string s, return the longest palindromic substring in s.
// A string is palindromic if it reads the same forward and backward.
// dynamic programming

function longestPalindromeQ5(s: string): string {
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

// https://leetcode.com/problems/longest-palindromic-substring/solutions/4212570/beats-99-90-optimised-code-o-n-2-time-o-1-space-using-dynamic-programming/?envType=study-plan-v2&envId=top-100-liked
// faster solution
function longestPalindromeQ5_2(s: string): string {
  function expandAroundCenter(left: number, right: number): string {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return s.substring(left + 1, right);
  }

  let longest = '';

  for (let i = 0; i < s.length; i++) {
    const odd = expandAroundCenter(i, i);
    const even = expandAroundCenter(i, i + 1);

    if (odd.length > longest.length) {
      longest = odd;
    }

    if (even.length > longest.length) {
      longest = even;
    }
  }

  return longest;
}

// // Example usage
// const s = 'babad';
// const result = longestPalindrome(s);
// console.log('Longest Palindromic Substring: ' + result);
