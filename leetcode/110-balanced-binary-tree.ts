// https://leetcode.com/problems/balanced-binary-tree/
// Given a binary tree, determine if it is height-balanced. (depth of the two subtrees of every node never differs by more than one.)

import { TreeNode } from './util';

function isBalanced(root: TreeNode | null): boolean {
  const dfs = function (node: TreeNode | null): number {
    if (!node) return 0;
    const left = 1 + dfs(node.left);
    const right = 1 + dfs(node.right);
    if (Math.abs(left - right) > 1) return Infinity;
    return Math.max(left, right);
  };

  return dfs(root) !== Infinity;
}
