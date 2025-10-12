// https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences/
// You are given two integers, m and k, and an integer array nums.
// A sequence of integers seq is called magical if:
// - seq has a size of m.
// - 0 <= seq[i] < nums.length
// - The binary representation of 2^seq[0] + 2^seq[1] + ... + 2^seq[m - 1] has k set bits.
// The array product of this sequence is defined as prod(seq) = (nums[seq[0]] * nums[seq[1]] * ... * nums[seq[m - 1]]).
// Return the sum of the array products for all valid magical sequences.
// Since the answer may be large, return it modulo 10^9 + 7.
// A set bit refers to a bit in the binary representation of a number that has a value of 1.

// Example 1:
// Input: m = 5, k = 5, nums = [1,10,100,10000,1000000]
// Output: 991600007
// Explanation:
// All permutations of [0, 1, 2, 3, 4] are magical sequences, each with an array product of 10^13.

// Example 2:
// Input: m = 2, k = 2, nums = [5,4,3,2,1]
// Output: 170
// Explanation:
// The magical sequences are [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [1, 3], [1, 4], [2, 0], [2, 1], [2, 3], [2, 4], [3, 0], [3, 1], [3, 2], [3, 4], [4, 0], [4, 1], [4, 2], and [4, 3].

// Example 3:
// Input: m = 1, k = 1, nums = [28]
// Output: 28
// Explanation:
// The only magical sequence is [0].

// Constraints:
// 1 <= k <= m <= 30
// 1 <= nums.length <= 50
// 1 <= nums[i] <= 10^8

// https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences/solutions/6719264/typescript-bitwise-dp-with-carry-94-lines-o-nmk-257ms/?envType=daily-question&envId=2025-10-12
// define a 4D DP state dp[i][m1][k1][carry]:
// - i: index in the nums array (0-based)
// - m1: how many elements we've picked so far (up to m)
// - k1: how many set bits we've accumulated (before final carry)
// - carry: how many bits are being carried to the next bit position
//
// For each choice of how many times to pick the current nums[i] (from 0 to m - m1), we calculate how many set bits this contributes when added to the current carry. We update the DP table by multiplying the contribution (based on powers and inverse factorials for combinatorics) to count all such sequences.
function magicalSum(m: number, k: number, nums: number[]): number {
  const MOD = BigInt(1e9 + 7);
  const n = nums.length;

  // precompute factorial and inverse factorial with BigInt
  const factorial: bigint[] = Array(m + 1).fill(BigInt(1));
  for (let i = 1; i <= m; i++) {
    factorial[i] = (factorial[i - 1] * BigInt(i)) % MOD;
  }

  const modPow = (base: bigint, exp: bigint, mod: bigint): bigint => {
    let result = BigInt(1);
    base %= mod;

    while (exp > 0) {
      if (exp % 2n === 1n) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      exp = exp / 2n;
    }

    return result;
  };

  const inverseFactorial: bigint[] = Array(m + 1).fill(BigInt(1));
  inverseFactorial[m] = modPow(factorial[m], MOD - 2n, MOD);

  for (let i = m; i >= 1; i--) {
    inverseFactorial[i - 1] = (inverseFactorial[i] * BigInt(i)) % MOD;
  }

  // precompute powers of nums
  const powNums: bigint[][] = Array.from({ length: n }, () =>
    Array(m + 1).fill(1n),
  );

  for (let i = 0; i < n; i++) {
    for (let c = 1; c <= m; c++) {
      powNums[i][c] = (powNums[i][c - 1] * BigInt(nums[i])) % MOD;
    }
  }

  // DP array: dp[i][m1][k1][carry] = count of ways
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: m + 1 }, () =>
      Array.from({ length: k + 1 }, () => Array<bigint>(m + 1).fill(0n)),
    ),
  );
  dp[0][0][0][0] = BigInt(1);

  for (let i = 0; i < n; i++) {
    for (let m1 = 0; m1 <= m; m1++) {
      for (let k1 = 0; k1 <= k; k1++) {
        for (let carry = 0; carry <= m; carry++) {
          const val = dp[i][m1][k1][carry];
          if (val === BigInt(0)) continue;
          for (let c = 0; c <= m - m1; c++) {
            const m2 = m1 + c;
            const sumBits = c + carry;
            const nextCarry = sumBits >> 1;
            const addedSetBits = sumBits & 1;
            const k2 = k1 + addedSetBits;
            if (k2 > k) continue;

            const contrib =
              (((val * inverseFactorial[c]) % MOD) * powNums[i][c]) % MOD;
            dp[i + 1][m2][k2][nextCarry] =
              (dp[i + 1][m2][k2][nextCarry] + contrib) % MOD;
          }
        }
      }
    }
  }

  // Sum valid final states
  let result = BigInt(0);
  for (let k1 = 0; k1 <= k; k1++) {
    for (let carry = 0; carry <= m; carry++) {
      const val = dp[n][m][k1][carry];
      if (val === BigInt(0)) continue;
      const bits = carry.toString(2).split('1').length - 1;
      if (k1 + bits === k) {
        result = (result + val) % MOD;
      }
    }
  }

  result = (result * factorial[m]) % MOD;
  return Number(result);
}

// Editorial
function magicalSum2(m: number, k: number, nums: number[]): number {
  const n = nums.length;
  const mod = 1000000007n;

  const fac: bigint[] = new Array(m + 1).fill(1n);
  for (let i = 1; i <= m; i++) {
    fac[i] = (fac[i - 1] * BigInt(i)) % mod;
  }

  const ifac: bigint[] = new Array(m + 1).fill(1n);
  for (let i = 2; i <= m; i++) {
    ifac[i] = quickmul(BigInt(i), mod - 2n, mod);
  }
  for (let i = 2; i <= m; i++) {
    ifac[i] = (ifac[i - 1] * ifac[i]) % mod;
  }

  const numsPower: bigint[][] = new Array(n);
  for (let i = 0; i < n; i++) {
    numsPower[i] = new Array(m + 1).fill(1n);
    for (let j = 1; j <= m; j++) {
      numsPower[i][j] = (numsPower[i][j - 1] * BigInt(nums[i])) % mod;
    }
  }

  const f: bigint[][][][] = new Array(n);
  for (let i = 0; i < n; i++) {
    f[i] = new Array(m + 1);
    for (let j = 0; j <= m; j++) {
      f[i][j] = new Array(m * 2 + 1);
      for (let p = 0; p <= m * 2; p++) {
        f[i][j][p] = new Array(k + 1).fill(0n);
      }
    }
  }

  for (let j = 0; j <= m; j++) {
    f[0][j][j][0] = (numsPower[0][j] * ifac[j]) % mod;
  }

  for (let i = 0; i + 1 < n; i++) {
    for (let j = 0; j <= m; j++) {
      for (let p = 0; p <= m * 2; p++) {
        for (let q = 0; q <= k; q++) {
          if (f[i][j][p][q] === 0n) {
            continue;
          }
          const q2 = (p % 2) + q;
          if (q2 > k) {
            break;
          }
          for (let r = 0; r + j <= m; r++) {
            const p2 = Math.floor(p / 2) + r;
            if (p2 > m * 2) {
              break;
            }
            f[i + 1][j + r][p2][q2] =
              (f[i + 1][j + r][p2][q2] +
                ((((f[i][j][p][q] * numsPower[i + 1][r]) % mod) * ifac[r]) %
                  mod)) %
              mod;
          }
        }
      }
    }
  }

  let res = 0n;
  for (let p = 0; p <= m * 2; p++) {
    for (let q = 0; q <= k; q++) {
      if (bitCount(p) + q === k) {
        res = (res + ((f[n - 1][m][p][q] * fac[m]) % mod)) % mod;
      }
    }
  }
  return Number(res);
}

function quickmul(x: bigint, y: bigint, mod: bigint): bigint {
  let res = 1n;
  let cur = x % mod;
  while (y > 0n) {
    if (y & 1n) {
      res = (res * cur) % mod;
    }
    y >>= 1n;
    cur = (cur * cur) % mod;
  }
  return res;
}

function bitCount(n: number): number {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}
