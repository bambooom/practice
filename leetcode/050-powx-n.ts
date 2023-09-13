// https://leetcode.com/problems/powx-n
//  calculates x raised to the power n (i.e., x^n)

function myPow(x: number, n: number): number {
  if (x === 1) return 1;
  if (x === -1) return n % 2 === 0 ? -x : x;

  let res = 1;
  const abs = Math.abs(n);

  for (let i = 0; i < abs; i++) {
    res *= x;
  }

  return n < 0 ? 1 / res : res;
}
