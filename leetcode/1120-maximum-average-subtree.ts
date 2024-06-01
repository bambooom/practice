// https://leetcode.com/problems/maximum-average-subtree/
// Given the root of a binary tree, return the maximum average value of a subtree of that tree. Answers within 10-5 of the actual answer will be accepted.
// A subtree of a tree is any node of that tree plus all its descendants.
// The average value of a tree is the sum of its values, divided by the number of nodes.

// Example 1:
// Input: root = [5,6,1]
// Output: 6.00000
// Explanation:
// For the node with value = 5 we have an average of (5 + 6 + 1) / 3 = 4.
// For the node with value = 6 we have an average of 6 / 1 = 6.
// For the node with value = 1 we have an average of 1 / 1 = 1.
// So the answer is 6 which is the maximum.

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

import { TreeNode } from './util';

// https://leetcode.com/problems/maximum-average-subtree/solutions/4380090/ts-compact-easy-to-understand-recursive-solution-runtime-100-memory-100/?envType=study-plan-v2&envId=premium-algo-100
function maximumAverageSubtree(root: TreeNode | null): number {
  let maxAverage = Number.NEGATIVE_INFINITY;
  type Tuple = {
    n: number;
    sum: number;
  };

  const dfs = (node: TreeNode | null): Tuple => {
    if (!node) {
      return { n: 0, sum: 0 };
    }

    let curNodesAmount = 1;
    let curSum = node.val;
    if (node.left) {
      const leftTuple = dfs(node.left);
      curNodesAmount += leftTuple.n;
      curSum += leftTuple.sum;
    }

    if (node.right) {
      const rightTuple = dfs(node.right);
      curNodesAmount += rightTuple.n;
      curSum += rightTuple.sum;
    }

    maxAverage = Math.max(maxAverage, curSum / curNodesAmount);
    return {
      n: curNodesAmount,
      sum: curSum,
    };
  };

  dfs(root);
  return maxAverage;
}
