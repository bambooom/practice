// https://leetcode.com/problems/search-in-a-binary-search-tree/
// You are given the root of a binary search tree (BST) and an integer val.
// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

import { TreeNode } from './util';

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return null;
  if (root.val === val) return root;
  return searchBST(root.left, val) || searchBST(root.right, val);
}

// queue
function searchBST2(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return null;
  const q = [root];
  while (q.length) {
    const node = q.shift() as TreeNode;
    if (node.val === val) return node;
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }

  return null;
}
