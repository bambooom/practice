// https://leetcode.com/problems/2-keys-keyboard
// There is only one character 'A' on the screen of a notepad. You can perform one of two operations on this notepad for each step:
// Copy All: You can copy all the characters present on the screen (a partial copy is not allowed).
// Paste: You can paste the characters which are copied last time.
// Given an integer n, return the minimum number of operations to get the character 'A' exactly n times on the screen.

// Example 1:
// Input: n = 3
// Output: 3
// Explanation: Initially, we have one character 'A'.
// In step 1, we use Copy All operation.
// In step 2, we use Paste operation to get 'AA'.
// In step 3, we use Paste operation to get 'AAA'.

// Example 2:
// Input: n = 1
// Output: 0

// reduced to finding the minimum number of steps required to reach n characters starting with one character
// each operation is related to the prime factors of n
// minimum number of steps corresponds to the sum of the prime factors of n.
function minSteps(n: number): number {
  let steps = 0;
  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      steps += i;
      n /= i;
    }
  }

  return steps;
}
