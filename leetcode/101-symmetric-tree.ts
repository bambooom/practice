import { TreeNode } from './util';

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
