// https://leetcode.com/problems/take-k-of-each-character-from-left-and-right
// You are given a string s consisting of the characters 'a', 'b', and 'c' and a non-negative integer k. Each minute, you may take either the leftmost character of s, or the rightmost character of s.
// Return the minimum number of minutes needed for you to take at least k of each character, or return -1 if it is not possible to take k of each character.

// Example 1:

// Input: s = "aabaaaacaabc", k = 2
// Output: 8
// Explanation:
// Take three characters from the left of s. You now have two 'a' characters, and one 'b' character.
// Take five characters from the right of s. You now have four 'a' characters, two 'b' characters, and two 'c' characters.
// A total of 3 + 5 = 8 minutes is needed.
// It can be proven that 8 is the minimum number of minutes needed.
// Example 2:

// Input: s = "a", k = 1
// Output: -1
// Explanation: It is not possible to take one 'b' or 'c' so return -1.

// https://leetcode.com/problems/take-k-of-each-character-from-left-and-right/solutions/6063845/beats-100-video-full-explain-list-most-common-string-interview-problems/?envType=daily-question&envId=2024-11-20
// simple one
function takeCharacters(s: string, k: number): number {
  const count = [0, 0, 0]; // total counts
  for (const c of s) {
    count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }
  if (Math.min(...count) < k) {
    return -1;
  }

  // sliding window
  let res = Infinity;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    count[s.charCodeAt(right) - 'a'.charCodeAt(0)]--;

    while (Math.min(...count) < k) {
      count[s.charCodeAt(left) - 'a'.charCodeAt(0)]++;
      left++;
    }
    res = Math.min(res, s.length - (right - left + 1));
  }

  return res;
}

// better one
function takeCharacters2(s: string, k: number): number {
  const freq: number[] = [0, 0, 0];
  const n: number = s.length;

  for (const c of s) {
    freq[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  if (freq[0] < k || freq[1] < k || freq[2] < k) {
    return -1;
  }

  const curr = [0, 0, 0];
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < n; right++) {
    curr[s.charCodeAt(right) - 'a'.charCodeAt(0)]++;

    while (
      left <= right &&
      (curr[0] > freq[0] - k || curr[1] > freq[1] - k || curr[2] > freq[2] - k)
    ) {
      curr[s.charCodeAt(left) - 'a'.charCodeAt(0)]--;
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return n - maxLen;
}
