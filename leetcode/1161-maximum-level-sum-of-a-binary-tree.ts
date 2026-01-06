// https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/

// Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
// Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

// Example 1:
//       1
//      / \
//     7   0
//    / \
//   7  -8
// Input: root = [1,7,0,7,-8,null,null]
// Output: 2
// Explanation:
// Level 1 sum = 1.
// Level 2 sum = 7 + 0 = 7.
// Level 3 sum = 7 + -8 = -1.
// So we return the level with the maximum sum which is level 2.

// Example 2:
//       989
//          \
//         10250
//          / \
//        98693  -89388
//             \
//           -32127
// Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
// Output: 2

// Constraints:
// The number of nodes in the tree is in the range [1, 10^4].
// -10^5 <= Node.val <= 10^5

import { TreeNode } from './util';

// dfs
function maxLevelSum(root: TreeNode | null): number {
  const sums = [-Infinity]; // Initialize an array to store the sum of values at each level
  dfs(root, 1);
  // // Return the index of the maximum sum in the 'sums' array, which corresponds to the level with the maximum sum
  return sums.indexOf(Math.max(...sums));

  // current node, current level
  function dfs(node: TreeNode | null, level: number) {
    // Base case: if the node is null, return
    if (!node) return;
    if (sums[level] === undefined) {
      // if current level is undefined, push the value of the current node to the 'sums' array
      sums.push(node.val);
    } else {
      // else, add the value of the current node to the existing sum at the current level
      sums[level] += node.val;
    }

    // Recursively call dfs on the left and right children of the current node, incrementing the level by 1
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
}

// queue
function maxLevelSum2(root: TreeNode | null): number {
  if (!root) return 0;
  let maxSum = -Infinity; // Initialize maxSum to -Infinity
  let maxLevel = 0,
    currentLevel = 0;

  const q: TreeNode[] = [root]; // Create a queue and add the root node to it

  while (q.length) {
    currentLevel++; // Increment the current level
    let currentSum = 0;
    const levelSize = q.length; // Get the size of the current level

    // Iterate over the nodes in the current level
    for (let i = 0; i < levelSize; i++) {
      const currentNode = q.shift() as TreeNode; // Remove the first node from the queue
      currentSum += currentNode.val; // Add the value of the current node to currentSum

      // Add the left and right children of the current node to the queue
      if (currentNode.left) q.push(currentNode.left);
      if (currentNode.right) q.push(currentNode.right);
    }

    // Update maxSum and maxLevel if currentSum is greater than maxSum
    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxLevel = currentLevel;
    }
  }

  return maxLevel;
}
