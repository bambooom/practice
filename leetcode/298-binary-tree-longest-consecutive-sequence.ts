// https://leetcode.com/problems/binary-tree-longest-consecutive-sequence
// #Depth-First Search #Binary Tree
// Given the root of a binary tree, return the length of the longest consecutive sequence path.
// A consecutive sequence path is a path where the values increase by one along the path.
// Note that the path can start at any node in the tree, and you cannot go from a node to its parent in the path.

import { TreeNode } from './util';

function longestConsecutive(root: TreeNode | null): number {
  let maxConsecutive = 0;

  const dfs = (
    node: TreeNode | null,
    prevValue: number,
    count: number,
  ): void => {
    if (count > maxConsecutive) maxConsecutive = count;

    if (!node) return;

    dfs(node.left, node.val, node.val === prevValue + 1 ? count + 1 : 1);
    dfs(node.right, node.val, node.val === prevValue + 1 ? count + 1 : 1);
  };

  if (root) dfs(root, root.val - 1, 0);

  return maxConsecutive;
}
