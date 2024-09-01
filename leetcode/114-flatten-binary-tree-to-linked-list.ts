// https://leetcode.com/problems/flatten-binary-tree-to-linked-list
// Given the root of a binary tree, flatten the tree into a "linked list":
// The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
// The "linked list" should be in the same order as a pre-order traversal of the binary tree.

import { TreeNode } from './util';

// not optimal
function flatten(root: TreeNode | null): void {
  if (!root) return;
  flatten(root.left);
  flatten(root.right);
  const right = root.right;
  root.right = root.left;
  root.left = null;
  let p = root;
  while (p.right) {
    p = p.right;
  }
  p.right = right;
}

// https://leetcode.com/problems/flatten-binary-tree-to-linked-list/solutions/3298711/simple-solution-with-dfs-ts-js/?envType=study-plan-v2&envId=top-100-liked
// dfs
function flatten2(root: TreeNode | null): void {
  const dfs = (root: TreeNode | null): TreeNode | null => {
    if (!root) return null;

    const leftTail: TreeNode | null = dfs(root.left);
    const rightTail: TreeNode | null = dfs(root.right);

    if (root.left) {
      leftTail!.right = root.right;
      root.right = root.left;
      root.left = null;
    }

    return rightTail || leftTail || root;
  };

  dfs(root);
}

// https://leetcode.com/problems/flatten-binary-tree-to-linked-list/solutions/5077443/easy-to-understand-and-straight-forward-solution-with-stack-iterative-solution/?envType=study-plan-v2&envId=top-100-liked
// iterative
function flatten3(root: TreeNode | null): void {
  if (!root) return;

  const stack = [root];
  let prev: TreeNode | null = null;

  while (stack.length) {
    const cur = stack.pop()!;

    if (prev) {
      prev.right = cur;
      prev.left = null;
    }
    if (cur.right) {
      stack.push(cur.right);
    }
    if (cur.left) {
      stack.push(cur.left);
    }
    prev = cur;
  }
}
