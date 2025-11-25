// https://leetcode.com/problems/smallest-integer-divisible-by-k/
// Given a positive integer k, you need to find the length of the smallest positive integer n such that n is divisible by k, and n only contains the digit 1.
// Return the length of n. If there is no such n, return -1.
// Note: n may not fit in a 64-bit signed integer.

// Example 1:
// Input: k = 1
// Output: 1
// Explanation: The smallest answer is n = 1, which has length 1.

// Example 2:
// Input: k = 2
// Output: -1
// Explanation: There is no such positive integer n divisible by 2.

// Example 3:
// Input: k = 3
// Output: 3
// Explanation: The smallest answer is n = 111, which has length 3.

// Constraints:
// 1 <= k <= 10^5

function smallestRepunitDivByK(k: number): number {
  // Check if k is divisible by 2 or 5. If it is, return -1 because there is no such integer n.
  if (k % 2 === 0 || k % 5 === 0) {
    return -1;
  }

  let rem = 0;
  // Loop from 1 to k.
  for (let len = 1; len <= k; len++) {
    rem = (rem * 10 + 1) % k;

    // If rem becomes 0 (which means n is divisible by k), return the length of n.
    if (rem === 0) {
      return len;
    }
  }

  return -1;
}
