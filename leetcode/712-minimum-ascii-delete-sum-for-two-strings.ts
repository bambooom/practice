// https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/
// Given two strings s1 and s2, return the lowest ASCII sum of deleted characters to make two strings equal.

// Example 1:
// Input: s1 = "sea", s2 = "eat"
// Output: 231
// Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the sum.
// Deleting "t" from "eat" adds 116 to the sum.
// At the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.

// Example 2:
// Input: s1 = "delete", s2 = "leet"
// Output: 403
// Explanation: Deleting "dee" from "delete" to turn the string into "let",
// adds 100[d] + 101[e] + 101[e] to the sum.
// Deleting "e" from "leet" adds 101[e] to the sum.
// At the end, both strings are equal to "let", and the answer is 100+101+101+101 = 403.
// If instead we turned both strings into "lee" or "eet", we would get answers of 433 or 417, which are higher.

// Constraints:
// 1 <= s1.length, s2.length <= 1000
// s1 and s2 consist of lowercase English letters.

// https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/solutions/3840664/easy-dp-minimum-ascii-delete-sum-for-two-nj6z/?envType=daily-question&envId=2026-01-10
// using dynamic programming
// compare every character in one string with every character in the other.
// If they match, no deletion is required. But if they don't match, we must decide which character to delete.
// The decision would be based on minimizing the ASCII sum of the deleted characters.
function minimumDeleteSum(s1: string, s2: string): number {
  let prevRow: number[] = new Array(s2.length + 1).fill(0);

  // Calculate the ASCII values of characters in the second string
  for (let j = 1; j <= s2.length; j++) {
    prevRow[j] = prevRow[j - 1] + s2.charCodeAt(j - 1);
  }

  for (let i = 1; i <= s1.length; i++) {
    const currRow: number[] = [prevRow[0] + s1.charCodeAt(i - 1)];
    for (let j = 1; j <= s2.length; j++) {
      // If the characters match, no deletion is required, so copy the ASCII value from the previous row
      if (s1[i - 1] === s2[j - 1]) {
        currRow.push(prevRow[j - 1]);
      } else {
        // If the characters don't match, calculate the minimum sum of deleted characters
        currRow.push(
          Math.min(
            prevRow[j] + s1.charCodeAt(i - 1),
            currRow[j - 1] + s2.charCodeAt(j - 1),
          ),
        );
      }
    }
    // Update the previous row with the current row
    prevRow = currRow;
  }

  // Return the ASCII sum of the deleted characters for the last character in the first string
  return prevRow[prevRow.length - 1];
}
