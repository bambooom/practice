// https://leetcode.com/problems/validate-binary-search-tree/
// Given the root of a binary tree, determine if it is a valid binary search tree (BST).
/**
 * A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 */

import { TreeNode } from './util';

// faster, recursive
function isValidBST(
  root: TreeNode | null,
  low = -Infinity,
  high = Infinity,
): boolean {
  if (!root) return true;
  const left = isValidBST(root.left, low, root.val);
  const right = isValidBST(root.right, root.val, high);
  return left && right && root.val > low && root.val < high;
}

// https://leetcode.com/problems/validate-binary-search-tree/solutions/3033313/validate-binary-search-tree/?envType=study-plan-v2&envId=top-100-liked
// iterative, slower than recursive
function isValidBST2(root: TreeNode | null): boolean {
  if (!root) return true;
  const stack: TreeNode[] = [];
  let current: TreeNode | null = root;
  let prev: TreeNode | null = null;

  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop()!;
    if (prev && current.val <= prev.val) return false;
    prev = current;
    current = current.right;
  }
  return true;
}
