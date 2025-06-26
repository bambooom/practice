// https://leetcode.com/problems/longest-binary-subsequence-less-than-or-equal-to-k
// You are given a binary string s and a positive integer k.
// Return the length of the longest subsequence of s that makes up a binary number less than or equal to k.
// Note:
// The subsequence can contain leading zeroes.
// The empty string is considered to be equal to 0.
// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

// Example 1:
// Input: s = "1001010", k = 5
// Output: 5
// Explanation: The longest subsequence of s that makes up a binary number less than or equal to 5 is "00010", as this number is equal to 2 in decimal.
// Note that "00100" and "00101" are also possible, which are equal to 4 and 5 in decimal, respectively.
// The length of this subsequence is 5, so 5 is returned.

// Example 2:
// Input: s = "00101001", k = 1
// Output: 6
// Explanation: "000001" is the longest subsequence of s that makes up a binary number less than or equal to 1, as this number is equal to 1 in decimal.
// The length of this subsequence is 6, so 6 is returned.

// https://leetcode.com/problems/longest-binary-subsequence-less-than-or-equal-to-k/solutions/6885885/optimal-solution-greedy-approach-visual-beats-100/?envType=daily-question&envId=2025-06-26
// greedy approach
function longestSubsequence(s: string, k: number): number {
  let z = 0; // coun the zeroes
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '0') {
      z++;
    }
  }

  let num = 0; // store the decimal value of the subsequence being built.
  let base = 1; // store the current base value (power of 2) for the subsequence
  let len = 0; // store the length of the subsequence
  // iterate through the string from right to left
  for (let i = s.length - 1; i >= 0; i--) {
    // if adding the current base value to num would exceed the limit k, break out of the loop.
    if (num + base > k) break;

    if (s[i] === '1') {
      num += base; // add the base value
    } else {
      // if '0', decrement the count of zeroes, since we're not including this '0' in the subsequence
      z--;
    }

    base *= 2; // Multiply the base value by 2 (since we're moving to the next position in the binary number)
    len++; // Increment the len counter
  }

  return len + z; // sum of the len counter (number of characters included in the subsequence) and the remaining z counter (number of zeroes not included in the subsequence)
}
