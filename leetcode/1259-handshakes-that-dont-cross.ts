// https://leetcode.com/problems/handshakes-that-dont-cross
// You are given an even number of people numPeople that stand around a circle and each person shakes hands with someone else so that there are numPeople / 2 handshakes total.
// Return the number of ways these handshakes could occur such that none of the handshakes cross.
// Since the answer could be very large, return it modulo 10^9 + 7

// Example 1:
// Input: numPeople = 4
// Output: 2
// Explanation: There are two ways to do it, the first way is[(1, 2), (3, 4)] and the second one is[(2, 3), (4, 1)].

// Example 2:
// Input: numPeople = 6
// Output: 5

// dynamic programming
// https://leetcode.com/problems/handshakes-that-dont-cross/solutions/953828/detailed-explanation-of-why-the-dp-solution-works-and-a-similar-problem-to-look-at/?envType=study-plan-v2&envId=premium-algo-100
// unique-binary-search-trees?
function uniqueBST(numPeople: number): number {
  const dp = new Array(numPeople + 1).fill(0);

  dp[0] = dp[1] = 1;

  for (let i = 2; i <= numPeople; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }

  return dp[dp.length - 1];
}

function numberOfWays(numPeople: number): number {
  const mod = BigInt(1000000007);
  const dp = new Array((numPeople >> 1) + 1).fill(0n); // n >> 1 is just a fancy way of dividing n by 2

  dp[0] = dp[1] = 1n;

  for (let i = 2; i <= numPeople >> 1; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] = (dp[i] + dp[j - 1] * dp[i - j]) % mod;
    }
  }

  return dp[dp.length - 1];
}
