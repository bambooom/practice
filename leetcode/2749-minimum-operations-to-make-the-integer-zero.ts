// https://leetcode.com/problems/minimum-operations-to-make-the-integer-zero/
// You are given two integers num1 and num2.
// In one operation, you can choose integer i in the range [0, 60] and subtract 2^i + num2 from num1.
// Return the integer denoting the minimum number of operations needed to make num1 equal to 0.
// If it is impossible to make num1 equal to 0, return -1.

// Example 1:
// Input: num1 = 3, num2 = -2
// Output: 3
// Explanation: We can make 3 equal to 0 with the following operations:
// - We choose i = 2 and subtract 2^2 + (-2) from 3, 3 - (4 + (-2)) = 1.
// - We choose i = 2 and subtract 2^2 + (-2) from 1, 1 - (4 + (-2)) = -1.
// - We choose i = 0 and subtract 2^0 + (-2) from -1, (-1) - (1 + (-2)) = 0.
// It can be proven, that 3 is the minimum number of operations that we need to perform.

// Example 2:
// Input: num1 = 5, num2 = 7
// Output: -1
// Explanation: It can be proven, that it is impossible to make 5 equal to 0 with the given operation.

// Constraints:
// 1 <= num1 <= 10^9
// -10^9 <= num2 <= 10^9

// https://leetcode.com/problems/minimum-operations-to-make-the-integer-zero/?envType=daily-question&envId=2025-09-05
// intuition: num1 = k * num2 + (sum of k powers of 2, 2^i1 + 2^i2 + ... + 2^ik)
// That means after removing k * num2 from num1, the remaining value must be made up of powers of 2.
function makeTheIntegerZero(num1: number, num2: number): number {
  for (let k = 1; k <= 60; k++) {
    let x = BigInt(num1) - BigInt(num2) * BigInt(k);
    if (x < BigInt(k)) {
      return -1;
    }
    if (x.toString(2).split('1').length - 1 <= k) {
      return k;
    }
  }

  return -1;
}

// https://leetcode.com/problems/minimum-operations-to-make-the-integer-zero/solutions/7156785/typescript-easy-to-understand-solution-that-uses-constraints/?envType=daily-question&envId=2025-09-05
function makeTheIntegerZero2(num1: number, num2: number): number {
  // Helper function to count the number of bits set in the binary representation of a number
  const bitCount = (n: bigint): number => {
    let count = 0;
    // Clear the least significant bit in each iteration
    while (n !== 0n) {
      count++;
      n &= n - 1n;
    }

    return count;
  };

  let k = 1;
  // Try different values of k until we find a solution or determine it's impossible
  while (true) {
    // Calculate the result of subtracting 2^k * num2 from num1
    let x: bigint = BigInt(num1) - BigInt(num2) * BigInt(k);
    // If the result is less than k, it's impossible to make num1 equal to 0
    if (x < BigInt(k)) return -1;

    // If k is greater than or equal to the number of bits set in x, we have a solution
    if (k >= bitCount(x)) return k;

    k++;
  }
}
