// https://leetcode.com/problems/binary-tree-level-order-traversal/

import { TreeNode } from './util';

// iterative solution time O(n), space O(n)
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result = [[root.val]];
  const levelNodes = [];
  if (root.left) {
    levelNodes.push(root.left);
  }
  if (root.right) {
    levelNodes.push(root.right);
  }
  while (levelNodes.length) {
    const nextLevel: TreeNode[] = [];
    const len = levelNodes.length;
    const currLevel: number[] = [];
    levelNodes.forEach((node) => {
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
      currLevel.push(node.val);
    });
    result.push(currLevel);
    levelNodes.splice(0, len);
    levelNodes.push(...nextLevel);
  }

  return result;
}
