// https://leetcode.com/problems/total-characters-in-string-after-transformations-ii/
// You are given a string s consisting of lowercase English letters, an integer t representing the number of transformations to perform, and an array nums of size 26. In one transformation, every character in s is replaced according to the following rules:
// Replace s[i] with the next nums[s[i] - 'a'] consecutive characters in the alphabet. For example, if s[i] = 'a' and nums[0] = 3, the character 'a' transforms into the next 3 consecutive characters ahead of it, which results in "bcd".
// The transformation wraps around the alphabet if it exceeds 'z'. For example, if s[i] = 'y' and nums[24] = 3, the character 'y' transforms into the next 3 consecutive characters ahead of it, which results in "zab".
// Return the length of the resulting string after exactly t transformations.
// Since the answer may be very large, return it modulo 109 + 7.

// Example 1:
// Input: s = "abcyy", t = 2, nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]
// Output: 7
// Explanation:
// First Transformation (t = 1):
// 'a' becomes 'b' as nums[0] == 1
// 'b' becomes 'c' as nums[1] == 1
// 'c' becomes 'd' as nums[2] == 1
// 'y' becomes 'z' as nums[24] == 1
// 'y' becomes 'z' as nums[24] == 1
// String after the first transformation: "bcdzz"
// Second Transformation (t = 2):
// 'b' becomes 'c' as nums[1] == 1
// 'c' becomes 'd' as nums[2] == 1
// 'd' becomes 'e' as nums[3] == 1
// 'z' becomes 'ab' as nums[25] == 2
// 'z' becomes 'ab' as nums[25] == 2
// String after the second transformation: "cdeabab"
// Final Length of the string: The string is "cdeabab", which has 7 characters.

// Example 2:
// Input: s = "azbk", t = 1, nums = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
// Output: 8
// Explanation:
// First Transformation (t = 1):
// 'a' becomes 'bc' as nums[0] == 2
// 'z' becomes 'ab' as nums[25] == 2
// 'b' becomes 'cd' as nums[1] == 2
// 'k' becomes 'lm' as nums[10] == 2
// String after the first transformation: "bcabcdlm"
// Final Length of the string: The string is "bcabcdlm", which has 8 characters.

// https://leetcode.com/problems/total-characters-in-string-after-transformations-ii/?envType=daily-question&envId=2025-05-14

// Matrix exponentiation
function lengthAfterTransformations(
  s: string,
  t: number,
  nums: number[],
): number {
  const MOD = BigInt(1_000_000_007);
  const ALPHABET = 26;

  // Build transformation matrix M where M[i][j] = how many times character i turns into character j in 1 step
  const M: bigint[][] = Array.from({ length: ALPHABET }, () =>
    Array(ALPHABET).fill(0n),
  );
  for (let i = 0; i < ALPHABET; i++) {
    for (let j = 1; j <= nums[i]; j++) {
      const to = (i + j) % ALPHABET;
      M[i][to] = (M[i][to] + 1n) % MOD;
    }
  }

  // Matrix multiplication A * B
  const multiply = (A: bigint[][], B: bigint[][]): bigint[][] => {
    const C: bigint[][] = Array.from({ length: ALPHABET }, () =>
      Array(ALPHABET).fill(0n),
    );
    for (let i = 0; i < ALPHABET; i++) {
      for (let k = 0; k < ALPHABET; k++) {
        if (A[i][k] === 0n) continue;

        for (let j = 0; j < ALPHABET; j++) {
          C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
        }
      }
    }
    return C;
  };

  // Matrix exponentiation: raise matrix M to the power of t,M^t
  const pow = (base: bigint[][], exp: number): bigint[][] => {
    let res: bigint[][] = Array.from({ length: ALPHABET }, (_, i) =>
      Array.from({ length: ALPHABET }, (_, j) => (i === j ? 1n : 0n)),
    );
    while (exp > 0) {
      if (exp & 1) {
        // means if it's odd
        res = multiply(res, base);
      }
      base = multiply(base, base);
      exp = Math.floor(exp / 2); // exp >>= 1;
    }
    return res;
  };

  const poweredMatrix = pow(M, t);

  // Initial frequency vector: how many times each letter appears in `s`
  const V: bigint[] = new Array(ALPHABET).fill(0n);
  for (const c of s) {
    V[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  // Multiply vector V * M^t to get the final frequency of each letter
  const finalVector: bigint[] = Array(ALPHABET).fill(0n);
  for (let i = 0; i < ALPHABET; i++) {
    for (let j = 0; j < ALPHABET; j++) {
      finalVector[j] = (finalVector[j] + V[i] * poweredMatrix[i][j]) % MOD;
    }
  }

  // sum of all characters after t transformations
  const total = finalVector.reduce((acc, cur) => (acc + cur) % MOD, 0n);
  return Number(total);
}
