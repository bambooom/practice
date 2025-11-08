// https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero/
// Given an integer n, you must transform it into 0 using the following operations any number of times:

// Change the rightmost (0th) bit in the binary representation of n.
// Change the ith bit in the binary representation of n if the (i-1)th bit is set to 1 and the (i-2)th through 0th bits are set to 0.
// Return the minimum number of operations to transform n into 0.

// Example 1:
// Input: n = 3
// Output: 2
// Explanation: The binary representation of 3 is "11".
// "11" -> "01" with the 2nd operation since the 0th bit is 1.
// "01" -> "00" with the 1st operation.

// Example 2:
// Input: n = 6
// Output: 4
// Explanation: The binary representation of 6 is "110".
// "110" -> "010" with the 2nd operation since the 1st bit is 1 and 0th through 0th bits are 0.
// "010" -> "011" with the 1st operation.
// "011" -> "001" with the 2nd operation since the 0th bit is 1.
// "001" -> "000" with the 1st operation.

// Constraints:
// 0 <= n <= 10^9

// https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero/solutions/7333764/all-in-one-solution-0ms-runtime-9999-bea-w3bo/?envType=daily-question&envId=2025-11-08
// Approach
// First, let's initialize a string bit with the first character of s.
// Then, iterate over the remaining characters of s.
// If the previous bit in bit equals the current bit in s, append 0 to bit.
// Otherwise, append 1.
// Finally, we convert the final bit string back to an integer.
function minimumOneBitOperations(n: number): number {
  let ans = n;
  // to cover all possible bit positions in the binary representation of input number
  for (let i = 16; i >= 1; i /= 2) {
    // Perform a bitwise XOR operation between ans and the result of shifting ans to the right by the current number
    // This operation effectively toggles the bits at the current position in the binary representation of ans, turning them from 1 to 0 or vice versa.
    ans ^= ans >> i;
  }
  return ans;
}

// https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero/solutions/7333697/all-language-solutions0msbeat-100all-in-bpsig/?envType=daily-question&envId=2025-11-08
function minimumOneBitOperations2(n: number): number {
  // convert to binary string, and reverse it
  let bin = n.toString(2).split('').reverse();

  let result = 0;

  while (bin.length) {
    // Check if the last character is '1'
    const isOne = bin.pop() === '1';
    if (isOne) {
      // If it is, add `1 << bin.length` to the result and toggle the last character of the array
      // 1 << bin.length is a bitwise left shift, which is equivalent to 2^bin.length
      // 1 << bin.length is used to calculate the value to add to the result variable
      result += 1 << bin.length;
      bin[bin.length - 1] = bin[bin.length - 1] === '1' ? '0' : '1';
    }
  }

  return result;
}
