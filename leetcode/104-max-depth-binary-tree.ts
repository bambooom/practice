/**
 * Definition for a binary tree node.
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * 1. recursive
 * time: O(N)
 * space: O(logN)
 */
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

/**
 * 2. Tail Recursion + BFS
 * specific form of recursion where the recursive call is the last action in the function.
 */
