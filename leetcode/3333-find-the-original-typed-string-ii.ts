// https://leetcode.com/problems/find-the-original-typed-string-ii/
// Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and may press a key for too long, resulting in a character being typed multiple times.
// You are given a string word, which represents the final output displayed on Alice's screen. You are also given a positive integer k.
// Return the total number of possible original strings that Alice might have intended to type, if she was trying to type a string of size at least k.
// Since the answer may be very large, return it modulo 109 + 7.

// Example 1:
// Input: word = "aabbccdd", k = 7
// Output: 5
// Explanation:
// The possible strings are: "aabbccdd", "aabbccd", "aabbcdd", "aabccdd", and "abbccdd".

// Example 2:
// Input: word = "aabbccdd", k = 8
// Output: 1
// Explanation:
// The only possible string is "aabbccdd".

// Example 3:
// Input: word = "aaabbb", k = 3
// Output: 8

// https://leetcode.com/problems/find-the-original-typed-string-ii/solutions/6909091/optimal-solution-dynamic-programming-beats-100/?envType=daily-question&envId=2025-07-02
// Algorithm Flow:
// - Run-length encode the string → block[]
// - If k <= block.length, return product of block[i]
//    - This means every block contributes exactly 1 character → total length ≥ k
// - Else initialize dp with:
//    - dp[i][j]: number of assignments for blocks i to n-1 with j extra characters to use
// - Build dp table bottom-up using suffix sums
// - Final result is dp[0][0]
function possibleStringCount(word: string, k: number): number {
  const MOD = 1e9 + 7;
  const len = word.length;
  // If the length of the word is equal to k, then there is only one possible string.
  if (len === k) return 1;

  // Split the typed word into blocks of repeated characters.
  // For example, "aaabbccc" -> [3, 2, 3]
  const block: number[] = [];
  let i = 0;
  while (i < len) {
    // Count the number of consecutive occurrences of the current character
    let j = i + 1;
    while (j < len && word[j] === word[j - 1]) {
      j++;
    }
    block.push(j - i);
    i = j;
  }

  // We want to compute how many ways to pick a number of characters from each block such that: sum of picks >= k
  // Calculate the total number of ways to pick characters from each block
  const cnt = block.length;
  const mult: number[] = Array(cnt).fill(0);
  mult[cnt - 1] = block[cnt - 1];
  // Calculate each subsequent element as the product of the current block length and the previous mult element, modulo MOD
  for (i = cnt - 2; i >= 0; i--) {
    mult[i] = (mult[i + 1] * block[i]) % MOD;
  }

  if (cnt >= k) {
    return mult[0];
  }

  // dp[i][j]: number of ways to assign characters from blocks i to n-1 such that total extra characters used = j
  const dp: number[][] = Array.from({ length: cnt }, () =>
    Array(k - cnt + 1).fill(0),
  );
  for (i = 0; i <= k - cnt; i++) {
    // Calculate the number of ways to pick characters from the last block and the remaining blocks
    if (block[cnt - 1] + i + cnt > k) {
      dp[cnt - 1][i] = block[cnt - 1] - (k - i - cnt);
    }
  }

  for (i = cnt - 2; i >= 0; i--) {
    let sum = (dp[i + 1][k - cnt] * block[i]) % MOD;
    for (let j = k - cnt; j >= 0; j--) {
      sum = (sum + dp[i + 1][j]) % MOD;
      const next = j + block[i];
      // Update the sum based on the number of ways to pick characters from the current block and the remaining blocks
      if (next > k - cnt) {
        sum = (sum - dp[i + 1][k - cnt] + MOD) % MOD;
      } else {
        sum = (sum - dp[i + 1][next] + MOD) % MOD;
      }
      dp[i][j] = sum;
    }
  }

  return dp[0][0];
}
