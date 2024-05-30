// https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii
// #Depth-First Search #Binary Tree
// Given the root of a binary tree, return the length of the longest consecutive path in the tree.
// A consecutive path is a path where the values of the consecutive nodes in the path differ by one. This path can be either increasing or decreasing.
// For example, [1,2,3,4] and [4,3,2,1] are both considered valid, but the path [1,2,4,3] is not valid.
// On the other hand, the path can be in the child-Parent-child order, where not necessarily be parent-child order.

import { TreeNode } from './util';

function longestConsecutive(root: TreeNode | null): number {
  let longestPath = 1;

  const dfs = (node: TreeNode | null, prevNodeVal: number): number[] => {
    // return [ max increasing path, max decreasing path ]
    if (!node) return [0, 0];

    const [leftInc, leftDec] = dfs(node.left, node.val);
    const [rightInc, rightDec] = dfs(node.right, node.val);

    longestPath = Math.max(longestPath, leftInc + rightDec + 1);
    longestPath = Math.max(longestPath, rightInc + leftDec + 1);

    if (node.val - prevNodeVal == 1) {
      return [Math.max(rightInc, leftInc) + 1, 0];
    } else if (node.val - prevNodeVal == -1) {
      return [0, Math.max(rightDec, leftDec) + 1];
    }
    return [0, 0];
  };

  dfs(root, Infinity);
  return longestPath;
}
