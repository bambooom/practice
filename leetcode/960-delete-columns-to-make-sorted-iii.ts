// https://leetcode.com/problems/delete-columns-to-make-sorted-iii
// You are given an array of n strings strs, all of the same length.
// We may choose any deletion indices, and we delete all the characters in those indices for each string.
// For example, if we have strs = ["abcdef","uvwxyz"] and deletion indices {0, 2, 3}, then the final array after deletions is ["bef", "vyz"].
// Suppose we chose a set of deletion indices answer such that after deletions, the final array has every string (row) in lexicographic order. (i.e., (strs[0][0] <= strs[0][1] <= ... <= strs[0][strs[0].length - 1]), and (strs[1][0] <= strs[1][1] <= ... <= strs[1][strs[1].length - 1]), and so on). Return the minimum possible value of answer.length.

// Example 1:
// Input: strs = ["babca","bbazb"]
// Output: 3
// Explanation: After deleting columns 0, 1, and 4, the final array is strs = ["bc", "az"].
// Both these rows are individually in lexicographic order (ie. strs[0][0] <= strs[0][1] and strs[1][0] <= strs[1][1]).
// Note that strs[0] > strs[1] - the array strs is not necessarily in lexicographic order.

// Example 2:
// Input: strs = ["edcba"]
// Output: 4
// Explanation: If we delete less than 4 columns, the only row will not be lexicographically sorted.

// Example 3:
// Input: strs = ["ghi","def","abc"]
// Output: 0
// Explanation: All rows are already lexicographically sorted.

// Constraints:
// n == strs.length
// 1 <= n <= 100
// 1 <= strs[i].length <= 100
// strs[i] consists of lowercase English letters.

// https://leetcode.com/problems/delete-columns-to-make-sorted-iii/solutions/5768071/typescript-memory-beats-100-by-r9n-2wg9/?envType=daily-question&envId=2025-12-22
// Dynamic Programming (DP): Track the longest sequence of valid columns.

// Compare Columns: Check if one column can follow another in all rows.

// Compute Deletions: The result is the total columns minus the length of the longest valid sequence.
function minDeletionSize(strs: string[]): number {
  const numRows = strs.length;
  const numCols = strs[0].length;
  // Initialize an array to store the length of the longest valid sequence of columns for each column
  const dp: number[] = new Array(numCols).fill(1);
  let minDeletions = numCols;

  // Iterate over each column
  for (let i = 0; i < numCols; i++) {
    // Iterate over each previous column
    for (let j = 0; j < i; j++) {
      let valid = true; // flag to check if column j can be appended to the longest valid sequence

      // Iterate over each row
      for (let k = 0; k < numRows; k++) {
        // If the character at position j is greater than the character at position i in the current row,
        // the current column cannot be appended to the longest valid sequence
        if (strs[k][j] > strs[k][i]) {
          valid = false;
          break;
        }
      }

      // If the current column can be appended to the longest valid sequence, update the dp array
      if (valid) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    minDeletions = Math.min(minDeletions, numCols - dp[i]);
  }

  return minDeletions;
}
