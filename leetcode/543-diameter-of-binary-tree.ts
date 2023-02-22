// https://leetcode.com/problems/diameter-of-binary-tree/
// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
// The length of a path between two nodes is represented by the number of edges between them.
// #binrary-tree #depth-first-tree

import { TreeNode } from './util';

function diameterOfBinaryTree(root: TreeNode | null): number {
  let max = 0;

  const maxDepth = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }

    const left = maxDepth(node.left);
    const right = maxDepth(node.right);
    max = Math.max(max, left + right);
    return Math.max(left, right) + 1;
  };

  maxDepth(root);
  return max;
}
