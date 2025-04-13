// https://leetcode.com/problems/count-good-numbers
// A digit string is good if the digits (0-indexed) at even indices are even and the digits at odd indices are prime (2, 3, 5, or 7).
// For example, "2582" is good because the digits (2 and 8) at even positions are even and the digits (5 and 2) at odd positions are prime. However, "3245" is not good because 3 is at an even index but is not even.
// Given an integer n, return the total number of good digit strings of length n. Since the answer may be large, return it modulo 109 + 7.
// A digit string is a string consisting of digits 0 through 9 that may contain leading zeros.

// Example 1:
// Input: n = 1
// Output: 5
// Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8".

// Example 2:
// Input: n = 4
// Output: 400

// Example 3:
// Input: n = 50
// Output: 564908303

// digits at even indices must be even, which is 0 2 4 6 8
// digits at odd indices must be prime, which is 2 3 5 7
// then if n is the total number of digits
// number of even-indexed digits is (n+1) // 2, even position contribute 5^(n+1)//2
// number of odd-indexed digits is n // 2, odd position contribute 4^(n//2)
// multiply these two values modulo 10^9+7
// https://leetcode.com/problems/count-good-numbers/solutions/6644556/math-number-theory-modular-arithmetic-exponentiation-by-squaring-o-log-n/?envType=daily-question&envId=2025-04-13
function countGoodNumbers(n: number): number {
  const MOD = 1_000_000_007n;
  const modPow = (base: bigint, exp: bigint, mod: bigint): bigint => {
    let result = 1n;
    while (exp > 0n) {
      if (exp % 2n === 1n) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      exp = exp / 2n;
    }
    return result;
  };

  const bigN = BigInt(n);
  const even = (bigN + 1n) / 2n;
  const odd = bigN / 2n;
  return Number((modPow(5n, even, MOD) * modPow(4n, odd, MOD)) % MOD);
}

// use bit manipulation
// https://leetcode.com/problems/count-good-numbers/solutions/6644667/optimal-solution-using-only-one-exponentiation-o-log-n-time-o-1-space/?envType=daily-question&envId=2025-04-13
function countGoodNumbers2(n: number): number {
  const MOD = 1e9 + 7;
  const BIG_MOD = BigInt(MOD);
  const modPow = (x: bigint, n: number): number => {
    let p = 1n;
    while (n > 0) {
      if (n & 1) {
        p = (p * x) % BIG_MOD;
      }
      x = (x * x) % BIG_MOD;
      // Can't use `n >>= 1` since `n` can be 1e15.
      n = Math.floor(n * 0.5);
    }
    return Number(p);
  };

  return (modPow(20n, Math.floor(n * 0.5)) * (n & 1 ? 5 : 1)) % MOD;
}
