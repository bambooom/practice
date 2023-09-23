// https://leetcode.com/problems/count-good-nodes-in-binary-tree/

// Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.
// Return the number of good nodes in the binary tree.

import { TreeNode } from './util';

function dfs(node: TreeNode | null, max: number): number {
  if (!node) return 0;

  let isGood: 0 | 1 = 0;

  if (node.val >= max) {
    isGood = 1;
    max = node.val;
  }

  return dfs(node.left, max) + dfs(node.right, max) + isGood;
}

function goodNodes(root: TreeNode | null): number {
  if (!root) return 0;

  const max = root.val;
  return dfs(root, max);
}
