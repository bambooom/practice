// https://leetcode.com/problems/path-sum-ii/
// Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum. Each path should be returned as a list of the node values, not node references.
// A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.

import { TreeNode } from './util';

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  if (!root) return [];
  if (!root.left && !root.right) {
    if (targetSum === root.val) {
      return [[root.val]];
    } else {
      return [];
    }
  }
  const left = pathSum(root.left, targetSum - root.val);
  const right = pathSum(root.right, targetSum - root.val);
  return left.concat(right).map((e) => {
    e.unshift(root.val);
    return e;
  });
}
