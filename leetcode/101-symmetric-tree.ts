// https://leetcode.com/problems/symmetric-tree/
// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

import { TreeNode } from './util';

// check symmetric, mirror, not same tree
// recursive
export function isSymmetric(root: TreeNode | null): boolean {
  const isMirror = (p: TreeNode | null, q: TreeNode | null): boolean => {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    // so need to check right and left to be same
    return isMirror(p.left, q.right) && isMirror(p.right, q.left);
  };

  return isMirror(root, root);
}

// iterative
function isSymmetric2(root: TreeNode | null): boolean {
  if (!root) return true;

  let queue = [root.left, root.right];

  while (queue.length) {
    let i = 0;
    let j = queue.length - 1;

    while (i < j) {
      if (queue[i]?.val != queue[j]?.val) {
        return false;
      }
      i++;
      j--;
    }

    // add child to queue
    const newQueue = [];
    for (const node of queue) {
      if (!node) continue;

      newQueue.push(node.left);
      newQueue.push(node.right);
    }

    queue = newQueue;
  }

  return true;
}
