// https://leetcode.com/problems/minimize-xor/description/
// Given two positive integers num1 and num2, find the positive integer x such that:
// x has the same number of set bits as num2, and
// The value x XOR num1 is minimal.
// Note that XOR is the bitwise XOR operation.
// Return the integer x. The test cases are generated such that x is uniquely determined.
// The number of set bits of an integer is the number of 1's in its binary representation.

// Example 1:
// Input: num1 = 3, num2 = 5
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0011 and 0101, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 3 = 0 is minimal.

// Example 2:
// Input: num1 = 1, num2 = 12
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0001 and 1100, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 1 = 2 is minimal.

//https://leetcode.com/problems/minimize-xor/solutions/5024240/bit-shift/
function minimizeXor(num1: number, num2: number): number {
  const countOnesPositive = (num: number) => {
    let count = 0;
    while (num > 0) {
      count += num & 1; // bitwise AND oper ation, num & 1 returns a number whose binary representation has a 1 in each bit position for which the corresponding bits of both operands are 1.
      // so num & 1 returns the rightmost bit of num, if is 1, then add to count
      num = num >> 1; // bitwise right shift, shifts the binary representation of num one bit to the right, effectively dividing the number by 2 and discarding the remainder.
    }
    return count;
  };

  const getMinimalXor = (num: number, ones: number) => {
    // calculate the index of the leftmost bit of num
    let index = Math.max(Math.floor(Math.log2(num)), ones - 1);
    let ans = 0;
    let one = 0;

    // Starting from the most significant bit of num and moving down, it checks if the bit is set. If it is, it adds the corresponding bit to ans and decrements ones.
    while (index >= ones && ones > 0) {
      // This line performs a bitwise AND operation between num and a mask that has only the bit at the current index set.
      one = num & (1 << index);
      if (one) {
        ones--;
        ans += 1 << index;
      }
      index--;
    }

    while (index >= 0 && ones > 0) {
      ans += 1 << index;
      index--;
      ones--;
    }

    return ans;
  };

  const num2Ones = countOnesPositive(num2);

  return getMinimalXor(num1, num2Ones);
}
