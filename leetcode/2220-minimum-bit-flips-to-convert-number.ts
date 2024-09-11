// https://leetcode.com/problems/minimum-bit-flips-to-convert-number/description/
// A bit flip of a number x is choosing a bit in the binary representation of x and flipping it from either 0 to 1 or 1 to 0.
// For example, for x = 7, the binary representation is 111 and we may choose any bit (including any leading zeros not shown) and flip it. We can flip the first bit from the right to get 110, flip the second bit from the right to get 101, flip the fifth bit from the right (a leading zero) to get 10111, etc.
// Given two integers start and goal, return the minimum number of bit flips to convert start to goal.

// Example 1:
// Input: start = 10, goal = 7
// Output: 3
// Explanation: The binary representation of 10 and 7 are 1010 and 0111 respectively. We can convert 10 to 7 in 3 steps:
// - Flip the first bit from the right: 1010 -> 1011.
// - Flip the third bit from the right: 1011 -> 1111.
// - Flip the fourth bit from the right: 1111 -> 0111.
// It can be shown we cannot convert 10 to 7 in less than 3 steps.Hence, we return 3.

// Example 2:
// Input: start = 3, goal = 4
// Output: 3
// Explanation: The binary representation of 3 and 4 are 011 and 100 respectively. We can convert 3 to 4 in 3 steps:
// - Flip the first bit from the right: 011 -> 010.
// - Flip the second bit from the right: 010 -> 000.
// - Flip the third bit from the right: 000 -> 100.
// It can be shown we cannot convert 3 to 4 in less than 3 steps. Hence, we return 3.

// https://leetcode.com/problems/minimum-bit-flips-to-convert-number/solutions/5768554/not-bit-manipulation-just-plain-string-conversion/
function minBitFlips(start: number, goal: number): number {
  let count = 0;
  let s1 = '';
  let s2 = '';

  if (start > goal) {
    s1 = start.toString(2);
    s2 = goal.toString(2).padStart(s1.length, '0');
  } else {
    s1 = goal.toString(2);
    s2 = start.toString(2).padStart(s1.length, '0');
  }

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      count++;
    }
  }

  return count;
}

// https://leetcode.com/problems/minimum-bit-flips-to-convert-number/solutions/5768610/beats-100/
// bit manipulation
function minBitFlips2(start: number, goal: number): number {
  let diff = start ^ goal; // 按位异或（bitwise XOR）操作
  //  10 ^ 7 在 JavaScript 中的含义：
  // 10 的二进制表示是 1010
  // 7 的二进制表示是 0111
  // 按位异或操作会比较这两个数的每一位，如果相同则结果为 0，如果不同则结果为 1
  //   1010 (10)
  // ^ 0111 (7)
  //   ----
  //   1101
  // 结果 1101 的十进制表示是 13。
  // 所以在 JavaScript 中，10 ^ 7 的结果是 13。
  let ans = 0;

  while (diff) {
    if (diff & 1) {
      // 按位与（bitwise AND）操作，这个操作通常用于检查一个数字是奇数还是偶数
      // & 是按位与运算符。它会比较两个数的每一个二进制位。
      // 如果两个相应的位都是 1，则结果的该位为 1，否则为 0。
      // 数字 1 的二进制表示是 00000001（为简化，这里只显示 8 位）。

      // 如果 diff 是偶数，其最低位（最右边的位）是 0，结果将是 0。
      // 如果 diff 是奇数，其最低位是 1，结果将是 1。
      // 这种方法比使用模运算（diff % 2）更高效，因为位运算通常比除法运算快。
      ans++;
    }
    diff >>= 1;
    // diff = diff >> 1
    // >> 是右移位运算符, 这个操作的效果是将 diff 的二进制表示向右移动一位，相当于将 diff 除以 2 并向下取整。
    // 对于正数，diff >>= 1 等同于 diff = Math.floor(diff / 2)。
    // 对于负数，结果可能会因为符号位扩展而有所不同。
    // 使用 >>= 而不是 /= 2 的主要优势是性能。位运算通常比除法运算快，尤其是在需要频繁执行这种操作的场景中。
  }

  return ans;
}
