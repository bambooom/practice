// https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/

// Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
// Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

import { TreeNode } from './util';

// dfs
function maxLevelSum(root: TreeNode | null): number {
  const sums = [-Infinity];
  dfs(root, 1);
  return sums.indexOf(Math.max(...sums));

  function dfs(node: TreeNode | null, level: number) {
    if (!node) return;
    if (sums[level] === undefined) {
      sums.push(node.val);
    } else {
      sums[level] += node.val;
    }

    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
}

// queue
function maxLevelSum2(root: TreeNode | null): number {
  if (!root) return 0;
  let maxSum = -Infinity;
  let maxLevel = 0,
    currentLevel = 0;

  const q = [root];

  while (q.length) {
    currentLevel++;
    let currentSum = 0;
    const levelSize = q.length;
    for (let i = 0; i < levelSize; i++) {
      const currentNode = q.shift() as TreeNode;
      currentSum += currentNode.val;
      if (currentNode.left) q.push(currentNode.left);
      if (currentNode.right) q.push(currentNode.right);
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxLevel = currentLevel;
    }
  }

  return maxLevel;
}
