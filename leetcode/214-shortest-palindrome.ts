// https://leetcode.com/problems/shortest-palindrome
// You are given a string s. You can convert s to a palindrome by adding characters in front of it.
// Return the shortest palindrome you can find by performing this transformation.

// Example 1:
// Input: s = "aacecaaa"
// Output: "aaacecaaa"

// Example 2:
// Input: s = "abcd"
// Output: "dcbabcd"

// https://leetcode.com/problems/shortest-palindrome/solutions/3548576/typescript-kmp-explained-in-detail/?envType=daily-question&envId=2024-09-20
function shortestPalindrome(s: string): string {
  const piFunc = (s: string): number[] => {
    const n: number = s.length;
    const pi: number[] = Array(n);
    pi[0] = 0;

    for (let i = 1; i < n; i++) {
      let k = pi[i - 1];
      while (k > 0 && s[k] !== s[i]) {
        k = pi[k - 1];
      }

      if (s[k] === s[i]) {
        k++;
      }
      pi[i] = k;
    }

    return pi;
  };

  const sLen = s.length; // s: aacecaaa, sLen: 8
  const sReversed = s.split('').reverse().join(''); // sReversed: aaacecaa
  const sTemp = `${s}#${sReversed}`; // sTemp: aacecaaa#aaacecaa
  // [a a c e c a a a # a a a c e c a a]
  // [0 1 0 0 0 1 2 2 0 1 2 2 3 4 5 6 7]
  const pi = piFunc(sTemp);
  const lps = pi.pop()!; // lps: 7

  // 'aaacecaa'.substring(0, 1) + aacecaaa
  return sReversed.substring(0, sLen - lps) + s;
}

// https://leetcode.com/problems/shortest-palindrome/solutions/5810486/beats-100-beginner-friendly-images-fully-explained-dry-run-optimum-solution/?envType=daily-question&envId=2024-09-20
// faster solution
// modified KMP (Knuth-Morris-Pratt) algorithm
// approach:
// 1. find longest palindrome start at the beginning, largest prefix of s
// 2. add the reverse of the remaining suffix to the front
// The idea here is to use a modified KMP (Knuth-Morris-Pratt) algorithm to compute the "longest prefix which is also a suffix" for the combined string s + "#" + reverse(s). The # symbol is used as a separator to avoid overlap between s and reverse(s).
function shortestPalindrome2(s: string): string {
  if (!s || s.length === 0) {
    return s;
  }

  const newStr = s + '#' + s.split('').reverse().join('');
  const n = newStr.length;
  const lps = new Array(n).fill(0);

  for (let i = 1; i < n; i++) {
    let j = lps[i - 1];

    while (j > 0 && newStr[i] !== newStr[j]) {
      j = lps[j - 1];
    }

    if (newStr[i] === newStr[j]) {
      j++;
    }

    lps[i] = j;
  }

  const longestPalindromePrefixLen = lps[n - 1];
  const nonPalindromePart = s.slice(longestPalindromePrefixLen);

  return nonPalindromePart.split('').reverse().join('') + s;
}
