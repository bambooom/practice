// https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii/
// You are given a string array words, and an array groups, both arrays having length n.
// The hamming distance between two strings of equal length is the number of positions at which the corresponding characters are different.
// You need to select the longest subsequence from an array of indices [0, 1, ..., n - 1], such that for the subsequence denoted as [i0, i1, ..., ik-1] having length k, the following holds:
// For adjacent indices in the subsequence, their corresponding groups are unequal, i.e., groups[ij] != groups[ij+1], for each j where 0 < j + 1 < k.
// words[ij] and words[ij+1] are equal in length, and the hamming distance between them is 1, where 0 < j + 1 < k, for all indices in the subsequence.
// Return a string array containing the words corresponding to the indices (in order) in the selected subsequence. If there are multiple answers, return any of them.
// Note: strings in words may be unequal in length.

// Example 1:
// Input: words = ["bab","dab","cab"], groups = [1,2,2]
// Output: ["bab","cab"]
// Explanation: A subsequence that can be selected is [0,2].
// groups[0] != groups[2]
// words[0].length == words[2].length, and the hamming distance between them is 1.
// So, a valid answer is [words[0],words[2]] = ["bab","cab"].
// Another subsequence that can be selected is [0,1].
// groups[0] != groups[1]
// words[0].length == words[1].length, and the hamming distance between them is 1.
// So, another valid answer is [words[0],words[1]] = ["bab","dab"].
// It can be shown that the length of the longest subsequence of indices that satisfies the conditions is 2.

// Example 2:
// Input: words = ["a","b","c","d"], groups = [1,2,3,4]
// Output: ["a","b","c","d"]
// Explanation: We can select the subsequence [0,1,2,3].
// It satisfies both conditions.
// Hence, the answer is [words[0],words[1],words[2],words[3]] = ["a","b","c","d"].
// It has the longest length among all subsequences of indices that satisfy the conditions.
// Hence, it is the only answer.

// https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii/solutions/4168250/c-c-java-python-javascript-dp-explained/?envType=daily-question&envId=2025-05-16
/**
 * Finds the longest subsequence of words that satisfies two conditions:
 * 1. Adjacent words must belong to different groups
 * 2. Adjacent words must have equal length and a Hamming distance of exactly 1
 *
 * Uses dynamic programming to solve the Longest Increasing Subsequence (LIS) variant.
 *
 * @param words - Array of strings to form the subsequence
 * @param groups - Array of group identifiers for each word
 * @returns The longest valid subsequence of words
 */
function getWordsInLongestSubsequence(
  words: string[],
  groups: number[],
): string[] {
  // dp[i] stores the length of the longest valid subsequence ending at index i
  const dp = new Array(groups.length).fill(1);
  // pv[i] stores the previous index in the optimal subsequence ending at i
  const prev = new Array(groups.length).fill(-1);

  // Build the dp array by comparing each pair of words
  for (let i = 1; i < groups.length; i++) {
    for (let j = 0; j < i; j++) {
      // Skip if words belong to the same group
      if (groups[i] === groups[j]) continue;
      // Skip if words have different lengths
      if (words[i].length !== words[j].length) continue;

      // Calculate Hamming distance between words[i] and words[j]
      let hammingDistance = 0;
      for (let k = 0; k < words[i].length; k++) {
        if (words[i][k] !== words[j][k]) {
          hammingDistance++;
        }
      }
      // Skip if Hamming distance is not exactly 1
      if (hammingDistance !== 1) continue;

      // If adding words[j] before words[i] creates a longer subsequence,
      // update dp[i] and track the previous index
      if (dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
  }

  // Find the index of the last word in the longest subsequence
  let currentIndex = dp.indexOf(Math.max(...dp));
  const ans: string[] = [];
  // Reconstruct the subsequence by following the prev pointers
  while (currentIndex !== -1) {
    ans.push(words[currentIndex]);
    currentIndex = prev[currentIndex];
  }
  // Reverse to get the correct order (from first to last)
  return ans.reverse();
}
