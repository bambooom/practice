// https://leetcode.com/problems/k-th-smallest-in-lexicographical-order
// Given two integers n and k, return the k-th lexicographically smallest integer in the range [1, n].

// Example 1:
// Input: n = 13, k = 2
// Output: 10
// Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.

// Example 2:
// Input: n = 1, k = 1
// Output: 1

// https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/solutions/5818020/typescript-approach-o-1-space-o-logn-time/?envType=daily-question&envId=2024-09-22
// prefix-based traversal similar to a trie traversal or lexicographical depth-first search (DFS)
function findKthNumber(n: number, k: number): number {
  // given a prefix, counts how many numbers exist with that prefix in the range [1, n]
  const countNumbersWithPrefix = (prefix: number, n: number): number => {
    let current = prefix;
    let next = prefix + 1;
    let count = 0;

    while (current <= n) {
      count += Math.min(n + 1, next) - current;
      current *= 10;
      next *= 10;
    }

    return count;
  };

  let current = 1;
  k--;

  // start from 1 and try to find the k-th number by iterating over the tree of numbers
  while (k > 0) {
    const count = countNumbersWithPrefix(current, n);

    if (k >= count) {
      k -= count;
      current++;
    } else {
      current *= 10;
      k--;
    }
  }

  return current;
}
