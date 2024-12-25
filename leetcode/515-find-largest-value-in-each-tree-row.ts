// https://leetcode.com/problems/find-largest-value-in-each-tree-row/
// Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

// Example1:
// Input: root = [1, 3, 2, 5, 3, null, 9];
// Output: [1, 3, 9];

// Example2:
// Input: root = [1, 2, 3];
// Output: [1, 3];

import { TreeNode } from './util';

function largestValues(root: TreeNode | null): number[] {
  if (!root) return [];
  const queue = [root];
  const result: number[] = [];
  while (queue.length) {
    const len = queue.length;
    let max = queue[0].val;
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!;
      max = Math.max(max, node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(max);
  }
  return result;
}
