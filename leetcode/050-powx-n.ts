// https://leetcode.com/problems/powx-n
//  calculates x raised to the power n (i.e., x^n)

// straightforward brute-force solution, but may be too slow
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

// https://leetcode.com/problems/powx-n/solutions/4429716/binary-exponentiation/?envType=study-plan-v2&envId=programming-skills
// binary exponentiation
// Time O(log2N) | Space O(n^x)
function myPow2(x: number, n: number): number {
  const isNegativePower = n < 0;
  n = Math.abs(n);
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return isNegativePower ? 1 / result : result;
}
