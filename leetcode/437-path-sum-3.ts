// https://leetcode.com/problems/path-sum-iii/
// Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.
// The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).
// #depth-first-tree

import { TreeNode } from './util';

// https://leetcode.com/problems/path-sum-iii/solutions/1745666/explanation-detailed-javascript-solution/
/**
 * DFS - Preorder
 *
 * pathSum: sum of all values from current node to root
 * map(pathSum - targetSum): frequency of targetSum in the path (up to current node)
 *
 * Case 1: valid tree path sum that starts from the root node
 *          - pathSum === targetSum
 *             => increment output by 1
 * Case 2: valid tree path sum that starts middle of the tree
 *          - check for frequency of target sum in the current path
 *             * if True, it means that we found targetSum
 *                * map[pathSum - targetSum] number of times
 *             => increment output by frequency of map(pathSum - targetSum)
 * *Time: O(N)
 * *Space: O(N)
 */
function pathSum(root: TreeNode | null, targetSum: number): number {
  let output = 0;
  const map: Record<number, number> = {};

  const traverse = (root: TreeNode | null, pathSum: number): void => {
    if (!root) return;

    pathSum += root.val; // current path sum

    // Case 1: starts from root node
    if (pathSum === targetSum) {
      output++;
    }

    // Case 2: starts from middle of tree
    // frequency of targetSum in the current path (up to current node)
    if (map[pathSum - targetSum]) {
      output += map[pathSum - targetSum];
    }

    // memorize current path sum (root to current node) and it's frequency
    if (map[pathSum]) {
      map[pathSum]++;
    } else {
      map[pathSum] = 1;
    }

    if (root.left) traverse(root.left, pathSum);
    if (root.right) traverse(root.right, pathSum);

    // remove the current path sum
    // to note that path is not available/visited
    map[pathSum]--;
  };

  traverse(root, 0);
  return output;
}
