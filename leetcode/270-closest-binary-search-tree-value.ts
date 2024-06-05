// https://leetcode.com/problems/closest-binary-search-tree-value/
// Given the root of a binary search tree and a target value, return the value in the BST that is closest to the target. If there are multiple answers, print the smallest.
//
// Input: root = [4,2,5,1,3], target = 3.714286
// Output: 4
// Explanation: The closest value is 4 (the value at node 5), but you are allowed to return the value at node 4.

import { TreeNode } from './util';

function closestValue(root: TreeNode | null, target: number): number {
  if (!root) return 0;
  let res = root.val;

  while (root) {
    const diffTarget = Math.abs(res - target);
    const diffVal = Math.abs(root.val - target);

    if (diffVal < diffTarget || (diffVal === diffTarget && root.val < res)) {
      res = root.val;
    }

    root = target < root.val ? root.left : root.right;
  }

  return res;
}
