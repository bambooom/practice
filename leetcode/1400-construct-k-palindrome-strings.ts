// https://leetcode.com/problems/construct-k-palindrome-strings/
// Given a string s and an integer k, return true if you can use all the characters in s to construct k palindrome strings or false otherwise.

// Example 1:
// Input: s = "annabelle", k = 2
// Output: true
// Explanation: You can construct two palindromes using all characters in s.
// Some possible constructions "anna" + "elble", "anbna" + "elle", "anellena" + "b"

// Example 2:
// Input: s = "leetcode", k = 3
// Output: false
// Explanation: It is impossible to construct 3 palindromes using all the characters of s.

// Example 3:
// Input: s = "true", k = 4
// Output: true
// Explanation: The only possible solution is to put each character in a separate string.

function canConstruct(s: string, k: number): boolean {
  if (k > s.length) return false;

  const freq = new Array(26).fill(0);
  for (const c of s) {
    freq[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  const oddCount = freq.filter((f) => f % 2 === 1).length;
  // Odd frequency characters are critical because each of them requires a unique position in a palindrome. Therefore, the number of odd frequency characters must not exceed k (the number of palindrome strings), or it will be impossible to construct k palindrome strings.
  return oddCount <= k;
}
