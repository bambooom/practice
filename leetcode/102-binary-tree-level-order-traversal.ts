// https://leetcode.com/problems/binary-tree-level-order-traversal/
// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[9,20],[15,7]]
// Input: root = [1]
// Output: [[1]]
// Input: root = []
// Output: []

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

// https://leetcode.com/problems/binary-tree-level-order-traversal/solutions/4176806/dfs-super-simple-faster-than-92/?envType=study-plan-v2&envId=top-100-liked
// dfs solution, recursive, may not be faster, but seems to less memory
function levelOrder2(root: TreeNode | null): number[][] {
  const result: number[][] = [];

  const dfs = (root: TreeNode | null, level: number) => {
    if (!root) return;
    if (result[level]) {
      result[level].push(root.val);
    } else {
      result[level] = [root.val];
    }

    dfs(root.left, level + 1);
    dfs(root.right, level + 1);
  };

  dfs(root, 0);
  return result;
}
