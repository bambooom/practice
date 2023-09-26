// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

import { TreeNode } from './util';

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (!root) return null;
  if (p?.val === root.val || q?.val === root.val) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  // left && right => left and right are on different subtree, so root is the LCA
  // otherwise, they are both on left subtree or right subtree
  return left && right ? root : left || right;
}
