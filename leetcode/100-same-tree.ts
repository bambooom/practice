/**
 * Definition for a binary tree node.
 */

import { TreeNode } from './util';

// recursive, time O(N), space O(N)
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.right, q.right) && isSameTree(p.left, q.left);
}

/**
 * Iteration:
 * Start from the root and then at each iteration pop the current node out of the deque.
 * Then do the same checks as in the approach 1 :
 *  p and p are not None, p.val is equal to q.val,
 * and if checks are OK, push the child nodes.
 */

export function isSameTree2(p: TreeNode | null, q: TreeNode | null): boolean {
  const stack: (TreeNode | null)[][] = [[p, q]];

  while (stack.length) {
    const [x, y] = stack.shift() as (TreeNode | null)[];

    // if both leaves
    if (x == null && y == null) continue;
    if (!x || !y) return false;
    if (x.val === y.val) {
      stack.push([x.left, y.left]);
      stack.push([x.right, y.right]);
    } else return false;
  }
  return true;
}
