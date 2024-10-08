// https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced
// You are given a 0-indexed string s of even length n. The string consists of exactly n / 2 opening brackets '[' and n / 2 closing brackets ']'.
// A string is called balanced if and only if:
// - It is the empty string, or
// - It can be written as AB, where both A and B are balanced strings, or
// - It can be written as [C], where C is a balanced string.
// You may swap the brackets at any two indices any number of times.
// Return the minimum number of swaps to make s balanced.

// Example 1:
// Input: s = "][]["
// Output: 1
// Explanation: You can make the string balanced by swapping index 0 with index 3.
// The resulting string is "[[]]".

// Example 2:
// Input: s = "]]][[["
// Output: 2
// Explanation: You can do the following to make the string balanced:
// - Swap index 0 with index 4. s = "[]][][".
// - Swap index 1 with index 5. s = "[[][]]".
// The resulting string is "[[][]]".

// Example 3:
// Input: s = "[]"
// Output: 0
// Explanation: The string is already balanced.

// https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/solutions/5884240/beats-100-working-08-10-2024-explained/
function minSwapsBalanced(s: string): number {
  // init a variable to keep track of unmatched opening brackets
  let stackSize = 0;

  // iterate through the string
  for (const ch of s) {
    if (ch === '[') {
      stackSize++; // encounter opening bracket, increase stack size
    } else {
      // if encounter closing bracket
      if (stackSize > 0) {
        stackSize--; // decrease stack size if matching opening bracket
      }
      // if stackSize === 0, means we have encountered an unmatched closing bracket
      // but we don't need to do anything special
    }
  }

  // calculate minimum swaps
  // we need to swap half of the remaining unmatched brackets
  return Math.floor((stackSize + 1) / 2);
}
