// https://leetcode.com/problems/count-the-number-of-computer-unlocking-permutations/
// You are given an array complexity of length n.
// There are n locked computers in a room with labels from 0 to n - 1, each with its own unique password. The password of the computer i has a complexity complexity[i].
// The password for the computer labeled 0 is already decrypted and serves as the root. All other computers must be unlocked using it or another previously unlocked computer, following this information:
// You can decrypt the password for the computer i using the password for computer j, where j is any integer less than i with a lower complexity. (i.e. j < i and complexity[j] < complexity[i])
// To decrypt the password for computer i, you must have already unlocked a computer j such that j < i and complexity[j] < complexity[i].
// Find the number of permutations of [0, 1, 2, ..., (n - 1)] that represent a valid order in which the computers can be unlocked, starting from computer 0 as the only initially unlocked one.
// Since the answer may be large, return it modulo 109 + 7.
// Note that the password for the computer with label 0 is decrypted, and not the computer with the first position in the permutation.

// Example 1:
// Input: complexity = [1,2,3]
// Output: 2
// Explanation:
// The valid permutations are:
// [0, 1, 2]
// Unlock computer 0 first with root password.
// Unlock computer 1 with password of computer 0 since complexity[0] < complexity[1].
// Unlock computer 2 with password of computer 1 since complexity[1] < complexity[2].
// [0, 2, 1]
// Unlock computer 0 first with root password.
// Unlock computer 2 with password of computer 0 since complexity[0] < complexity[2].
// Unlock computer 1 with password of computer 0 since complexity[0] < complexity[1].

// Example 2:
// Input: complexity = [3,3,3,4,4,4]
// Output: 0
// Explanation:
// There are no possible permutations which can unlock all computers.

// Constraints:
// 2 <= complexity.length <= 10^5
// 1 <= complexity[i] <= 10^9

// https://leetcode.com/problems/count-the-number-of-computer-unlocking-permutations/solutions/7403584/on-time-combinatorics-factorial-typescri-c49n/?envType=daily-question&envId=2025-12-10
// The problem asks us to count valid permutations where the first element (complexity[0]) acts as a "root" or a strict minimum.
// Constraint Check: The "root" (the first element) must be strictly smaller than all other elements in the array. If any element is smaller than or equal to the root, no valid permutation exists under this specific rule, so the answer is 0.
// Combinatorics: If the root is valid (i.e., it is the unique minimum), it must stay fixed at the first position. The remaining n - 1 elements are all larger than the root and can be arranged in any order.
// Therefore, the problem reduces to calculating the factorial of the remaining elements:
// Result=(n−1)!(mod10^9+7)
function countPermutations(complexity: number[]): number {
  const MOD = 1e9 + 7;
  const n = complexity.length;

  // validation:
  // check if any element is smaller than or equal to the 'root' (first element)
  // the root must be the unique strict minimum
  let min = complexity[0];
  for (let i = 1; i < n; i++) {
    if (min >= complexity[i]) {
      return 0; // if no unique minimum, then no valid permutation
    }
  }

  // If valid, the root is fixed. We just need to permute the remaining (n-1) elements.
  // Result = (n - 1)!
  let ans = 1;
  for (let i = 1; i < n; i++) {
    ans = (ans * i) % MOD;
  }

  return ans;
}
