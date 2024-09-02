// https://leetcode.com/problems/binary-tree-right-side-view/
// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.
import { TreeNode } from './util';

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const res: number[] = [];

  const helper = (node: TreeNode | null, level: number): void => {
    if (!node) return;
    if (level === res.length) res.push(node.val);
    helper(node.left, level + 1);
    helper(node.right, level + 1);
    // first left, and then right, so that we can override when there is a right when we see from right side
  };

  helper(root, 0);
  return res;
}

// BFS solution using queue
function rightSideView2(root: TreeNode | null): number[] {
  const result: number[] = [];
  const queue: TreeNode[] = [];

  if (root === null) return result;

  queue.push(root);
  while (queue.length !== 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const n = queue.shift() as TreeNode;
      if (i === size - 1) result.push(n.val);
      if (n.left !== null) queue.push(n.left);
      if (n.right !== null) queue.push(n.right);
    }
  }

  return result;
}
