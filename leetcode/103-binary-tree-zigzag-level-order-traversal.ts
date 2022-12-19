// https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

import { TreeNode } from './util';

// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[20,9],[15,7]]

// time O(N), space O(N)
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  const res: number[][] = [];

  const traverse = (node: TreeNode | null, level: number): void => {
    if (!node) return;
    if (!res[level]) res[level] = [];
    if (level % 2 === 0) {
      res[level].push(node.val);
    } else {
      res[level].unshift(node.val);
    }

    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  };

  traverse(root, 0);
  return res;
}
