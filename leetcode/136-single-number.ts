// https://leetcode.com/problems/single-number/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
// The bitwise XOR (^) operator returns a 1 in each bit position for which the corresponding bits of either but not both operands are 1s.

// Bit Manipulation
// If we take XOR of zero and some bit, it will return that bit, a ⊕ 0 = a
// If we take XOR of two same bits, it will return 0, a ⊕ a = 0
// a ⊕b ⊕ a = (a ⊕ a) ⊕ b = 0 ⊕ b = b
// So we can XOR all bits together to find the unique number.

// time O(n)
// space O(1)
function singleNumber(nums: number[]): number {
  return nums.reduce((prev, curr) => prev ^ curr);
}

// time O(n)
// space O(n)
function singleNumber2(nums: number[]): number {
  const map: { [key: number]: number } = {};
  for (const n of nums) {
    if (map[n] == null) map[n] = 0;
    map[n]++;
  }

  for (const n in map) {
    if (map[n] === 1) {
      return Number(n);
    }
  }

  return NaN;
}
