// https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/
// Given a string s consisting only of characters a, b and c.
// Return the number of substrings containing at least one occurrence of all these characters a, b and c.

// Example 1:
// Input: s = "abcabc"
// Output: 10
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).

// Example 2:
// Input: s = "aaacb"
// Output: 3
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".

// Example 3:
// Input: s = "abc"
// Output: 1

// https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/solutions/3922530/typescript-sliding-window-solution/?envType=daily-question&envId=2025-03-11
// sliding-window
// find the possible smallest substrings contained a,b and c. Then count all possible combinations counting all symbols on the left and right.
function numberOfSubstrings(s: string): number {
  let count = 0;
  const chars: Record<string, number> = { a: 0, b: 0, c: 0 }; // save occurrence
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    chars[s[right]]++; // count all char

    while (chars.a && chars.b && chars.c) {
      // find the smallest substring containing a,b,c
      // sum right symbols for every left pointer position
      count += s.length - right;
      chars[s[left++]]--;
    }
  }

  return count;
}
