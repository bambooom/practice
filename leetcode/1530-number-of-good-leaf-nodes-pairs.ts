// https://leetcode.com/problems/number-of-good-leaf-nodes-pairs/
// You are given the root of a binary tree and an integer distance. A pair of two different leaf nodes of a binary tree is said to be good if the length of the shortest path between them is less than or equal to distance.
// Return the number of good leaf node pairs in the tree.

import { TreeNode } from './util';

// https://leetcode.com/problems/number-of-good-leaf-nodes-pairs/solutions/5494421/solution-in-typescript-with-example/?envType=daily-question&envId=2024-07-18
// Perform a DFS traversal to collect distances from leaf nodes.
// If a node is a leaf (no children), return a list with a single element [0] indicating distance zero from itself.
// For non-leaf nodes, combine the results of their left and right children. For each combination of distances from left and right subtrees, check if the sum of distances is less than or equal to the given distance and count valid pairs.
// After processing a node, propagate the distances to its parent, incrementing each distance by 1.
function countPairs(root: TreeNode | null, distance: number): number {
  let goodPairs = 0;

  const dfs = (node: TreeNode | null): number[] => {
    if (!node) return [];

    if (!node.left && !node.right) {
      return [1];
    }

    const leftDistances = dfs(node.left);
    const rightDistances = dfs(node.right);

    for (const left of leftDistances) {
      for (const right of rightDistances) {
        if (left + right <= distance) {
          goodPairs++;
        }
      }
    }

    const newDistances: number[] = [];
    for (const dist of leftDistances.concat(rightDistances)) {
      if (dist + 1 < distance) {
        newDistances.push(dist + 1);
      }
    }

    return newDistances;
  };

  dfs(root);
  return goodPairs;
}
