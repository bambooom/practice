// https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-i/
// You are given a string s consisting of lowercase English letters.
// Your task is to find the maximum difference diff = a1 - a2 between the frequency of characters a1 and a2 in the string such that:
// a1 has an odd frequency in the string.
// a2 has an even frequency in the string.
// Return this maximum difference.

// Example 1:
// Input: s = "aaaaabbc"
// Output: 3
// Explanation:
// The character 'a' has an odd frequency of 5, and 'b' has an even frequency of 2.
// The maximum difference is 5 - 2 = 3.

// Example 2:
// Input: s = "abcabcab"
// Output: 1
// Explanation:
// The character 'a' has an odd frequency of 3, and 'c' has an even frequency of 2.
// The maximum difference is 3 - 2 = 1.

// straightforward
function maxDifference(s: string): number {
  const freq = new Array(26).fill(0);
  for (const c of s) {
    freq[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  const odd = freq.filter((f) => f !== 0 && f % 2 === 1);
  const even = freq.filter((f) => f !== 0 && f % 2 === 0);

  return Math.max(...odd) - Math.min(...even);
}

function maxDifference2(s: string): number {
  const freq = new Array(26).fill(0);
  for (const c of s) {
    freq[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  let minEven = Infinity;
  let maxOdd = -Infinity;

  for (let i = 0; i < freq.length; i++) {
    const count = freq[i];
    if (count === 0) continue;

    if (count % 2 === 0) {
      minEven = Math.min(minEven, count);
    } else {
      maxOdd = Math.max(maxOdd, count);
    }
  }

  return maxOdd - minEven;
}
