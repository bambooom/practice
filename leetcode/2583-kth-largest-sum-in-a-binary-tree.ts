// https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree
// You are given the root of a binary tree and a positive integer k
// The level sum in the tree is the sum of the values of the nodes that are on the same level.
// Return the kth largest level sum in the tree (not necessarily distinct). If there are fewer than k levels in the tree, return -1.
// Note that two nodes are on the same level if they have the same distance from the root.

// Example1:
// Input: root = [5,8,9,2,1,3,7,4,6], k = 2
// Output: 13
// Explanation: The level sums are the following:
// - Level 1: 5.
// - Level 2: 8 + 9 = 17.
// - Level 3: 2 + 1 + 3 + 7 = 13.
// - Level 4: 4 + 6 = 10.
// The 2nd largest level sum is 13.

import { TreeNode } from './util';

// https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/solutions/5949683/explained-step-by-step-beats-100-working-22-10-2024/?envType=daily-question&envId=2024-10-22
function kthLargestLevelSum(root: TreeNode | null, k: number): number {
  const result: number[] = [];

  const traverse = (node: TreeNode | null, level = 0): void => {
    if (!node) return;

    if (result[level] !== undefined) {
      result[level] += node.val;
    } else {
      result[level] = node.val;
    }

    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  };

  traverse(root);

  if (!result[k - 1]) {
    return -1;
  }

  return result.sort((a, b) => b - a)[k - 1];
}
