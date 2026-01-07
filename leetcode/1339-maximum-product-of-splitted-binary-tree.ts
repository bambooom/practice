// https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/
// Given the root of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.
// Return the maximum product of the sums of the two subtrees. Since the answer may be too large, return it modulo 10^9 + 7.
// Note that you need to maximize the answer before taking the mod and not after taking it.

// Example 1:
// Input: root = [1,2,3,4,5,6]
// Output: 110
// Explanation: Remove the red edge and get 2 binary trees with sum 11 and 10. Their product is 110 (11*10)

// Example 2:
// Input: root = [1,null,2,3,4,null,null,5,6]
// Output: 90
// Explanation: Remove the red edge and get 2 binary trees with sum 15 and 6.Their product is 90 (15*6)

// Constraints:
// The number of nodes in the tree is in the range [2, 5 * 10^4].
// 1 <= Node.val <= 10^4

import { TreeNode } from './util';

// https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/solutions/7473434/all-language-solution-c-java-python-rust-yx7a/?envType=daily-question&envId=2026-01-07
function maxProduct(root: TreeNode | null): number {
  const MOD = 1_000_000_007;
  let total = 0;
  let best = 0;

  const sum = (node: TreeNode | null): number => {
    if (!node) return 0;

    return node.val + sum(node.left) + sum(node.right);
  };

  total = sum(root);

  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0;

    const s = node.val + dfs(node.left) + dfs(node.right);
    best = Math.max(best, s * (total - s));

    return s;
  };

  dfs(root);
  return best % MOD;
}
