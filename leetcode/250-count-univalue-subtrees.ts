// https://leetcode.com/problems/count-univalue-subtrees/
// Given the root of a binary tree, return the number of uni-value subtrees.
// A uni-value subtree means all nodes of the subtree have the same value.

// Example1:
// Input: root = [5,1,5,5,5,null,5]
// Output: 4

import { TreeNode } from './util';

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

function countUnivalSubtrees(root: TreeNode | null): number {
  const countUnival = (node: TreeNode | null): [number, boolean] => {
    if (!node) {
      return [0, true];
    }
    if (node.left === null && node.right === null) {
      return [1, true];
    }

    const [leftCount, isLeftUnival] = countUnival(node.left);
    const [rightCount, isRightUnival] = countUnival(node.right);

    let stillUnival = true;
    if (!isLeftUnival || (node.left && node.left.val !== node.val)) {
      stillUnival = false;
    }
    if (!isRightUnival || (node.right && node.right.val !== node.val)) {
      stillUnival = false;
    }

    const result = (stillUnival ? 1 : 0) + leftCount + rightCount;
    return [result, stillUnival];
  };
  return countUnival(root)[0];
}
