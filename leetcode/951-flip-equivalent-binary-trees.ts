// https://leetcode.com/problems/flip-equivalent-binary-trees
// For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.
// A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.
// Given the roots of two binary trees root1 and root2, return true if the two trees are flip equivalent or false otherwise.

// Example:
// Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
// Output: true
// Explanation: We flipped at nodes with values 1, 3, and 5.

import { TreeNode } from './util';

function flipEquiv(root1: TreeNode | null, root2: TreeNode | null): boolean {
  if (!root1 && !root2) {
    return true;
  } else if (root1 && root2) {
    if (root1.val === root2.val) {
      if (
        flipEquiv(root1.left, root2.left) &&
        flipEquiv(root1.right, root2.right)
      ) {
        return true;
      } else if (
        flipEquiv(root1.right, root2.left) &&
        flipEquiv(root1.left, root2.right)
      ) {
        return true;
      }
    }
  }

  return false;
}
