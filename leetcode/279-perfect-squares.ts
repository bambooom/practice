// https://leetcode.com/problems/perfect-squares
// Given an integer n, return the least number of perfect square numbers that sum to n.
// A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

// Example 1:
// Input: n = 12
// Output: 3
// Explanation: 12 = 4 + 4 + 4.

// Example 2:
// Input: n = 13
// Output: 2
// Explanation: 13 = 4 + 9.

// dynamic programming
// explanation: https://assets.leetcode.com/users/images/6f9ff4fa-088f-41db-b464-307c119d55ba_1634187491.871502.jpeg
// https://leetcode.com/problems/perfect-squares/solutions/1520447/dp-easy-to-understand-js-java-python-c/?envType=study-plan-v2&envId=top-100-liked
function numSquares(n: number): number {
  const dp: number[] = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;

  let count = 1;
  while (count * count <= n) {
    const sq = count * count;

    for (let i = sq; i <= n; i++) {
      dp[i] = Math.min(dp[i - sq] + 1, dp[i]);
    }
    count++;
  }

  return dp[n];
}

// https://leetcode.com/problems/perfect-squares/solutions/3500100/easy-self-explained/?envType=study-plan-v2&envId=top-100-liked
// slower than 1st solution
function numSquares2(n: number): number {
  // Step 1: Initialize the `squares` array with the first two values, `0` and `1`
  const squares: number[] = [0, 1];

  // Step 2: Iterate through all values of `i` from `2` to `n`
  for (let i = 2; i <= n; i++) {
    // Step 3: Initialize `squares[i]` to `Infinity`
    squares[i] = Infinity;

    // Step 4: Iterate through all perfect squares `j` less than or equal to `i`
    for (let j = 1; j * j <= i; j++) {
      // Step 5: Calculate the minimum number of perfect squares that sum to `i - j*j`
      // and add `1` to this number to account for the current perfect square `j`
      const numSquares = squares[i - j * j] + 1;

      // Step 6: Update `squares[i]` with the minimum of its current value and `numSquares`
      squares[i] = Math.min(squares[i], numSquares);
    }
  }

  // Step 7: Return the value of `squares[n]`
  return squares[n];
}
