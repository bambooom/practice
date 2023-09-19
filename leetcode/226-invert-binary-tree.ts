// https://leetcode.com/problems/invert-binary-tree/
// Given the root of a binary tree, invert the tree, and return its root.
// invert 这里指左右翻转

import { TreeNode } from './util';

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  if (!root.left && !root.right) return root;
  const tmp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(tmp);

  return root;
}
