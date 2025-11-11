// https://leetcode.com/problems/ones-and-zeroes/
// You are given an array of binary strings strs and two integers m and n.
// Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.
// A set x is a subset of a set y if all elements of x are also elements of y.

// Example 1:
// Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
// Output: 4
// Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
// Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
// {"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.

// Example 2:
// Input: strs = ["10","0","1"], m = 1, n = 1
// Output: 2
// Explanation: The largest subset is {"0", "1"}, so the answer is 2.

// Constraints:
// 1 <= strs.length <= 600
// 1 <= strs[i].length <= 100
// strs[i] consists only of digits '0' and '1'.
// 1 <= m, n <= 100

// https://leetcode.com/problems/ones-and-zeroes/solutions/7340411/solution-of-the-day-9987-beats-knapsack-ll0k2/?envType=daily-question&envId=2025-11-11
// dynamic programming
function findMaxForm(strs: string[], m: number, n: number): number {
  // Initialize a 2D array to store the maximum size of the subset that has at most `j` zeros and `k` ones.
  const dp = Array.from({ length: m + 1 }, () => new Uint8Array(n + 1));

  for (let i = 0; i < strs.length; i++) {
    let str = strs[i];
    let zeros = 0; // Number of zeros in the current string.
    let ones = 0; // Number of ones in the current string.

    // Count the number of zeros and ones in the current string.
    for (let j = 0; j < str.length; j++) {
      str.charAt(j) === '0' ? zeros++ : ones++;
    }
    // check if it is possible to include the current string in the subset and still satisfy the constraints.
    // Iterate over the `dp` array from the bottom right corner to the top left corner.
    for (let j = m; j >= zeros; j--) {
      for (let k = n; k >= ones; k--) {
        // Update the value at position `dp[j][k]` with the maximum of its current value and the value at position `dp[j-zeros][k-ones] + 1`.
        dp[j][k] = Math.max(dp[j][k], dp[j - zeros][k - ones] + 1);
      }
    }
  }

  return dp[m][n];
}
