// https://leetcode.com/problems/counting-bits/
// Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
// #bit-manipulation

// https://leetcode.com/problems/counting-bits/solutions/853078/typescript-javascript-3-line-o-n-beats-100-w-very-detailed-explanation/?envType=study-plan-v2&envId=leetcode-75
function countBits(n: number): number[] {
  const res = new Uint8Array(n + 1);
  for (let i = 0; i < res.length; i++) {
    res[i] = res[i >> 1] + (i & 1);
  }
  return [...res];
}
