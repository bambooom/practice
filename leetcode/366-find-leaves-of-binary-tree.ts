// https://leetcode.com/problems/find-leaves-of-binary-tree
// Given the root of a binary tree, collect a tree's nodes as if you were doing this:
// - Collect all the leaf nodes.
// - Remove all the leaf nodes.
// - Repeat until the tree is empty.

// Example1:
// Input: root = [1,2,3,4,5]
// Output: [[4,5,3],[2],[1]]
// Explanation:
// [[3,5,4],[2],[1]] and [[3,4,5],[2],[1]] are also considered correct answers since per each level it does not matter the order on which elements are returned.

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

function findLeaves(root: TreeNode | null): number[][] {
  const result: number[][] = [];

  const dfs = (node: TreeNode | null): number => {
    if (!node) {
      return 0;
    }
    const depth = Math.max(dfs(node.left), dfs(node.right));

    if (!result[depth]) {
      result[depth] = [node.val];
    } else {
      result[depth].push(node.val);
    }

    return depth + 1;
  };

  dfs(root);

  return result;
}
