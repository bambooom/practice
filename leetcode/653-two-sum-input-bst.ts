// https://leetcode.com/problems/two-sum-iv-input-is-a-bst/

import { TreeNode } from './util';

function findTarget(root: TreeNode | null, k: number): boolean {
  if (!root) return false;
  const set = new Set();
  const stack = [root];
  while (stack.length) {
    const node = stack.pop() as TreeNode;
    if (set.has(k - node.val)) return true;
    set.add(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return false;
}
