// https://leetcode.com/problems/validate-binary-search-tree/
/**
 * A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 */

import { TreeNode } from './util';

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
