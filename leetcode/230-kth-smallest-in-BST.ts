// https://leetcode.com/problems/kth-smallest-element-in-a-bst/
// #depth-first-search
// Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

import { TreeNode } from './util';

// Recursive Inorder Traversal, space O(N), time O(N)
function kthSmallest(root: TreeNode | null, k: number): number {
  let n = 0;
  let res = 0;
  const inorder = (root: TreeNode | null): void => {
    if (!root) return;
    inorder(root.left);
    if (n++ < k) {
      res = root.val;
    }
    inorder(root.right);
  };
  inorder(root);
  return res;
}

// iterative
function kthSmallest2(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let count = 1;
  let node: TreeNode | null = root;

  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop() as TreeNode;
    if (count === k) {
      return node.val;
    } else {
      count++;
    }
    node = node.right;
  }
}
