// https://leetcode.com/problems/single-number/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
// The bitwise XOR (^) operator returns a 1 in each bit position for which the corresponding bits of either but not both operands are 1s.

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
    if (map[n] === 1) return Number(n);
  }
}
