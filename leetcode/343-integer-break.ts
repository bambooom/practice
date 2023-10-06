// https://leetcode.com/problems/integer-break
// #dynamic-programming

// 1: dp approach, time O(n^2), space O(n)
function integerBreak(n: number): number {
  const memo = new Map();

  function dp(n: number) {
    if (n == 1 || n == 2) return 1;
    if (memo.has(n)) return memo.get(n);

    let q = 0;
    for (let i = 1; i <= n / 2; i++) {
      q = Math.max(q, i * Math.max(n - i, dp(n - i)));
    }
    memo.set(n, q);
    return q;
  }
  return dp(n);
}

// 2. Math Intution, it's optimal to  only split n into 2 and 3
// The inequality of arithmetic and geometric means shows that to maximize the product of a set of numbers with a fixed sum, the numbers should all be equal.
// The nearest integer is 3, which suggests that we should try to use 333 as much as we can.
function integerBreak2(n: number): number {
  // 2 and 3 can't be split into 3s, so handle them separately.
  if (n === 2) return 1;
  if (n === 3) return 2;
  switch (n % 3) {
    // Split this number into one less than as many 3s as possible and one 4.
    case 1:
      return 4 * Math.pow(3, Math.floor(n / 3) - 1);
    // Split this number into as many 3s as possible and one 2
    case 2:
      return 2 * Math.pow(3, Math.floor(n / 3));
    // Split this number into entirely threes.
    case 0:
    default:
      return Math.pow(3, n / 3);
  }
}
