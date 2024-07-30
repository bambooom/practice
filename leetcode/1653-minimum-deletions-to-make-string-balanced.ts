// https://leetcode.com/problems/minimum-deletions-to-make-string-balanced
// You are given a string s consisting only of characters 'a' and 'b'
// You can delete any number of characters in s to make s balanced. s is balanced if there is no pair of indices (i,j) such that i < j and s[i] = 'b' and s[j]= 'a'.
// Return the minimum number of deletions needed to make s balanced.

// Example 1:
// Input: s = "aababbab"
// Output: 2
// Explanation: You can either:
// Delete the characters at 0-indexed positions 2 and 6 ("aababbab" -> "aaabbb"), or
// Delete the characters at 0-indexed positions 3 and 6 ("aababbab" -> "aabbbb").
// Example 2:
// Input: s = "bbaaaaabb"
// Output: 2
// Explanation: The only solution is to delete the first two characters.

// Approach 1: 3-pass count method
//  idea is to find the dividing point that minimizes the number of deletions.
function minimumDeletions3Pass(s: string): number {
  const n = s.length;
  const countA = new Array(n + 1).fill(0);
  const countB = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    countA[i + 1] = countA[i] + (s[i] === 'a' ? 1 : 0);
    countB[i + 1] = countB[i] + (s[i] === 'b' ? 1 : 0);
  }

  let minDeletions = Infinity;
  for (let i = 0; i <= n; i++) {
    minDeletions = Math.min(minDeletions, countB[i] + (countA[n] - countA[i]));
  }
  return minDeletions;
}

// dynamic programming, stack
function minimumDeletions(s: string): number {
  let deletions = 0;
  let count = 0;
  for (const ch of s) {
    if (ch === 'b') {
      count++;
    } else if (count > 0) {
      deletions++;
      count--;
    }
  }

  return deletions;
}
