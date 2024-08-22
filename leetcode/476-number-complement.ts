// https://leetcode.com/problems/number-complement
// The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.
// For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
// Given an integer num, return its complement.

// Example 1:
// Input: num = 5
// Output: 2
// Explanation: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.
// Example 2:
// Input: num = 1
// Output: 0
// Explanation: The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.

// https://leetcode.com/problems/number-complement/solutions/2779565/typescript-easy-solution/?envType=daily-question&envId=2024-08-22
// straigntforward, not fast
function findComplement(num: number): number {
  const res: string[] = [];

  // >>> is unsigned right shift
  const reverse = (num >>> 0).toString(2).split('');

  reverse.forEach((n) => {
    if (n === '1') {
      res.push('0');
    } else {
      res.push('1');
    }
  });

  return parseInt(res.join(''), 2);
}

// https://leetcode.com/problems/number-complement/solutions/3816665/aesthetic-typescript-bitwise-xor/?envType=daily-question&envId=2024-08-22
// bitwise, flip binary by XOR 0b111111... with same length
function findComplement2(num: number): number {
  const bitLength = num.toString(2).length; // if num = 5; 5 = 0b101; length = 3
  const mask = (1 << bitLength) - 1; // 0b1000 - 0b1 => 0b0111
  return num ^ mask; // 0b101 ^ 0b111 = 0b010
}

// https://leetcode.com/problems/number-complement/solutions/5671822/runtime-37ms-beats-100/?envType=daily-question&envId=2024-08-22
// Num + complement = 111...1 ( = 2**n - 1 )
// faster
function findComplement3(num: number): number {
  const power = Math.floor(Math.log2(num)) + 1;
  return 2 ** power - 1 - num;
}

// https://leetcode.com/problems/number-complement/solutions/5671573/ts-1-line/?envType=daily-question&envId=2024-08-22
function findComplement4(num: number): number {
  for (let mask = -1 >>> 1; ; mask >>= 1) if (mask < num) return ~num & mask;
}
