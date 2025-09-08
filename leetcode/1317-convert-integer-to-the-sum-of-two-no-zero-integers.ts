// https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers
// No-Zero integer is a positive integer that does not contain any 0 in its decimal representation.
// Given an integer n, return a list of two integers [a, b] where:
// a and b are No-Zero integers.
// a + b = n
// The test cases are generated so that there is at least one valid solution. If there are many valid solutions, you can return any of them.

// Example 1:
// Input: n = 2
// Output: [1,1]
// Explanation: Let a = 1 and b = 1.
// Both a and b are no-zero integers, and a + b = 2 = n.

// Example 2:
// Input: n = 11
// Output: [2,9]
// Explanation: Let a = 2 and b = 9.
// Both a and b are no-zero integers, and a + b = 11 = n.
// Note that there are other valid answers as [8, 3] that can be accepted.

function getNoZeroIntegers(n: number): number[] {
  for (let a = 1; a <= n / 2; a++) {
    const b = n - a;
    if (a.toString().indexOf('0') === -1 && b.toString().indexOf('0') === -1) {
      return [a, b];
    }
  }
  return [];
}

// https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers/solutions/6847700/greedy-2-lines/?envType=daily-question&envId=2025-09-08
function getNoZeroIntegers2(n: number, m = 0) {
  while ([++m, --n].some((v) => `${v}`.includes('0')));
  return [m, n];
}
