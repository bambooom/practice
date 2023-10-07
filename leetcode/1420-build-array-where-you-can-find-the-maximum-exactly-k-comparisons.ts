// https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons
// #hard #dynamic-programming

// You are given three integers n, m and k. Consider the following algorithm to find the maximum element of an array of positive integers:
//
// You should build the array arr which has the following properties:
// - arr has exactly n integers.
// - 1 <= arr[i] <= m where (0 <= i < n).
// - After applying the mentioned algorithm to arr, the value search_cost is equal to k.
// - Return the number of ways to build the array arr under the mentioned conditions. As the answer may grow large, the answer must be computed modulo 109 + 7.

// Example 1:
// Input: n = 2, m = 3, k = 1
// Output: 6
// Explanation: The possible arrays are [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]

// Example 2:
// Input: n = 5, m = 2, k = 3
// Output: 0
// Explanation: There are no possible arrays that satisify the mentioned conditions.

// Example 3:
// Input: n = 9, m = 1, k = 1
// Output: 1
// Explanation: The only possible array is [1, 1, 1, 1, 1, 1, 1, 1, 1]

// https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons/solutions/4139874/90-27-dynamic-programming-optimized/?envType=daily-question&envId=2023-10-07
function numOfArrays(n: number, m: number, k: number): number {
  const mod = 1e9 + 7;

  let dp = Array.from({ length: m + 1 }, () => Array(k + 1).fill(0));
  let prefix = Array.from({ length: m + 1 }, () => Array(k + 1).fill(0));
  let prevDp = Array.from({ length: m + 1 }, () => Array(k + 1).fill(0));
  let prevPrefix = Array.from({ length: m + 1 }, () => Array(k + 1).fill(0));

  for (let j = 1; j <= m; j++) {
    prevDp[j][1] = 1;
    prevPrefix[j][1] = j;
  }

  for (let _ = 2; _ <= n; _++) {
    dp = Array.from({ length: m + 1 }, () => Array(k + 1).fill(0));
    prefix = Array.from({ length: m + 1 }, () => Array(k + 1).fill(0));

    for (let maxNum = 1; maxNum <= m; maxNum++) {
      for (let cost = 1; cost <= k; cost++) {
        dp[maxNum][cost] = (maxNum * prevDp[maxNum][cost]) % mod;

        if (maxNum > 1 && cost > 1) {
          dp[maxNum][cost] =
            (dp[maxNum][cost] + prevPrefix[maxNum - 1][cost - 1]) % mod;
        }

        prefix[maxNum][cost] =
          (prefix[maxNum - 1][cost] + dp[maxNum][cost]) % mod;
      }
    }

    prevDp = dp;
    prevPrefix = prefix;
  }

  return prefix[m][k];
}

// https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons/solutions/586716/javascript-bottom-up-dp/?envType=daily-question&envId=2023-10-07
// bottom-up DP
function numOfArrays2(n: number, m: number, k: number): number {
  const dp = new Array(n + 1);
  const mod = 1000000007;
  for (let i = 0; i <= n; i++) {
    dp[i] = new Array(m + 1);
    for (let j = 0; j <= m; j++) {
      dp[i][j] = new Array(k + 1).fill(0);
    }
  }
  dp[0][0][0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      for (let x = 1; x <= k; x++) {
        for (let y = 0; y < j; y++) {
          dp[i][j][x] =
            ((dp[i][j][x] % mod) + (dp[i - 1][y][x - 1] % mod)) % mod;
        }
        dp[i][j][x] =
          ((dp[i][j][x] % mod) + ((dp[i - 1][j][x] * j) % mod)) % mod;
      }
    }
  }
  let res = 0;
  for (let i = 1; i <= m; i++) {
    res = ((dp[n][i][k] % mod) + (res % mod)) % mod;
  }
  return res;
}
