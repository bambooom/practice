// https://leetcode.com/problems/binary-tree-maximum-path-sum
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
// The path sum of a path is the sum of the node's values in the path.
// Given the root of a binary tree, return the maximum path sum of any non-empty path.

// Example1:
// Input: root = [1,2,3]
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
// Example2:
// Input: root = [-10,9,20,null,null,15,7]
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

import { TreeNode } from './util';

function maxPathSum(root: TreeNode | null): number {
  let ans = -Infinity;

  const dfs = (root: TreeNode | null): number => {
    if (!root) return 0;

    const left = Math.max(0, dfs(root.left));
    const right = Math.max(0, dfs(root.right));
    ans = Math.max(ans, root.val + left + right);
    return root.val + Math.max(left, right);
  };

  dfs(root);
  return ans;
}
