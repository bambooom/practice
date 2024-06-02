// https://leetcode.com/problems/boundary-of-binary-tree/
// The boundary of a binary tree is the concatenation of the root, the left boundary, the leaves ordered from left-to-right, and the reverse order of the right boundary.

// The left boundary is the set of nodes defined by the following:
// - The root node's left child is in the left boundary. If the root does not have a left child, then the left boundary is empty.
// - If a node in the left boundary and has a left child, then the left child is in the left boundary.
// - If a node is in the left boundary, has no left child, but has a right child, then the right child is in the left boundary.
// - The leftmost leaf is not in the left boundary.

// The right boundary is similar to the left boundary, except it is the right side of the root's right subtree. Again, the leaf is not part of the right boundary, and the right boundary is empty if the root does not have a right child.
// The leaves are nodes that do not have any children. For this problem, the root is not a leaf.

// Given the root of a binary tree, return the values of its boundary.

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { TreeNode } from './util';

// https://leetcode.com/problems/boundary-of-binary-tree/?envType=study-plan-v2&envId=premium-algo-100
function boundaryOfBinaryTree(root: TreeNode | null): number[] {
  const result: number[] = [];
  const reversed: number[] = [];

  if (!root) {
    return result;
  }

  const sideDfs = (node: TreeNode | null, isLeftSide = true): boolean => {
    if (!node) {
      return false;
    }

    if (!node.left && !node.right) {
      return true;
    }

    if (isLeftSide) {
      result.push(node.val);
      return sideDfs(node.left) || sideDfs(node.right);
    } else {
      reversed.unshift(node.val);
      return sideDfs(node.right, false) || sideDfs(node.left, false);
    }
  };

  const dfs = (node: TreeNode | null): void => {
    if (!node) {
      return;
    }

    if (!node.left && !node.right) {
      result.push(node.val);
      return;
    }

    dfs(node.left);
    dfs(node.right);
  };

  result.push(root.val);
  if (root.left || root.right) {
    sideDfs(root.left);
    dfs(root);
    sideDfs(root.right, false);
  }

  return result.concat(reversed);
}
