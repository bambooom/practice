/**
 * Definition for a binary tree node.
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// check symmetric, mirror, not same tree
function isMirror(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  // so need to check right and left to be same
  return isMirror(p.right, q.left) && isMirror(p.left, q.right);
}

export function isSymmetric(root: TreeNode | null): boolean {
  return isMirror(root, root);
}

// iterative
