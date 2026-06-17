// https://leetcode.com/problems/process-string-with-special-operations-ii/
// You are given a string s consisting of lowercase English letters and the special characters: '*', '#', and '%'.
// You are also given an integer k.
// Build a new string result by processing s according to the following rules from left to right:
// If the letter is a lowercase English letter append it to result.
// A '*' removes the last character from result, if it exists.
// A '#' duplicates the current result and appends it to itself.
// A '%' reverses the current result.
// Return the kth character of the final string result. If k is out of the bounds of result, return '.'.

// Example 1:
// Input: s = "a#b%*", k = 1
// Output: "a"
// Explanation:
// i	s[i]	Operation	Current result
// 0	'a'	Append 'a'	"a"
// 1	'#'	Duplicate result	"aa"
// 2	'b'	Append 'b'	"aab"
// 3	'%'	Reverse result	"baa"
// 4	'*'	Remove the last character	"ba"
// The final result is "ba". The character at index k = 1 is 'a'.

// Example 2:
// Input: s = "cd%#*#", k = 3
// Output: "d"
// Explanation:
// i	s[i]	Operation	Current result
// 0	'c'	Append 'c'	"c"
// 1	'd'	Append 'd'	"cd"
// 2	'%'	Reverse result	"dc"
// 3	'#'	Duplicate result	"dcdc"
// 4	'*'	Remove the last character	"dcd"
// 5	'#'	Duplicate result	"dcddcd"
// The final result is "dcddcd". The character at index k = 3 is 'd'.

// Example 3:
// Input: s = "z*#", k = 0
// Output: "."
// Explanation:
// i	s[i]	Operation	Current result
// 0	'z'	Append 'z'	"z"
// 1	'*'	Remove the last character	""
// 2	'#'	Duplicate the string	""
// The final result is "". Since index k = 0 is out of bounds, the output is '.'.

// Constraints:
// 1 <= s.length <= 10^5
// s consists of only lowercase English letters and special characters '*', '#', and '%'.
// 0 <= k <= 10^15
// The length of result after processing s will not exceed 10^15.


// https://leetcode.com/problems/process-string-with-special-operations-ii/solutions/6955833/leetcode-problem-string-processing-chall-7i9u/?envType=daily-question&envId=2026-06-17
// First Pass (Compute Effective Length):

// Iterate through the string s to calculate the effective length l:
// For a letter, increment l by 1.
// For '*', decrement l by 1 (if l > 0).
// For '#', double l.
// For '%', skip (no effect on length).
// If k is greater than or equal to the effective length l, return '.'.
// Second Pass (Find k-th Character):

// Convert k to a BigInt (kBig) for consistent arithmetic.
// Iterate through the string in reverse to reverse-engineer the k-th character:
// For '*', increment l (undoing the decrement from the first pass).
// For '#', halve l and adjust kBig if necessary (subtract l if kBig >= l).
// For '%', adjust kBig to l - kBig - 1 (mirroring the position).
// For a letter, decrement l and check if l equals kBig. If so, return the letter.
// If no letter is found, return '.'.


function processStr(s: string, k: number): string {
  let l: bigint = 0n; // l represents the effective length of the result string after processing the input string s according to the given rules. It is initialized as a BigInt to handle potentially large lengths that can arise from the operations performed on the string.

  for (const c of s) {
    if (c === '*') {
      l = l > 0n ? l - 1n : 0n; // remove the last character from result, if it exists
    } else if (c === '#') {
      l *= 2n; // duplicate the current result and append it to itself
    } else if (c === '%') {
      continue; // reverse the current result, but it does not change the length of the result
    } else {
      l += 1n; // append the lowercase English letter to result
    }
  }

  if (k >= l) return '.'; // if k is out of the bounds of result, return '.'

  let idx: bigint = BigInt(k); // explicitly convert k to bigint

  for (let i = s.length - 1; i >=0; i--) {
    const c = s[i];

    if (c === '*') {
      l += 1n; // add back the last character to result, if it exists
    } else if (c === '#') {
      l /= 2n;
      if (idx >= l) idx -= l; // if the index is in the second half of the duplicated result, adjust the index to point to the corresponding character in the first half
    } else if (c === '%') {
      idx = l - idx - 1n; // ensure that the index points to the correct character in the reversed result
    } else {
      l -= 1n; // remove the last character from result, as we are processing the string in reverse order
      if (idx === l) return c; // if the index matches the current length of the result, return the corresponding character
    }
  }
  return '.'; // if the index is not found, return '.'
};
