// https://leetcode.com/problems/delete-node-in-a-bst/
// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.
// Basically, the deletion can be divided into two stages:
// Search for a node to remove.
// If the node is found, delete the node.

import { TreeNode } from './util';

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;
  if (root.val < key) root.right = deleteNode(root.right, key);
  else if (root.val > key) root.left = deleteNode(root.left, key);
  else {
    if (!root.left) return root.right;
    else if (!root.right) return root.left;
    else {
      let cur = root.right;
      while (cur.left) {
        cur = cur.left;
      }
      cur.left = root.left;
      return root.right;
    }
  }
  return root;
}

// this a complicated edge case that we can't solve right away
//
// we could pick the root.left node, but what if (root.left.right !== null)? where
// are we going to attach our root.right subtree without overwriting any existing
// reference?
//
// also, we could pick the root.right node, but what if (root.right.left !== null) too?
//
// so, these are our two possible (and equivalent) options:
//      1) pick our root.right node as the root node, and find the minimum node in
//         the right subtree that has no left pointer, and assign the root.left node to it.
//
//      2) pick our root.left node as the root node, and find the maximum node in
//         the left subtree that has no right pointer, and assign the root.right node to it.
//
// here's an example of deleting node with val=5 without breaking the BST choosing option (1)
//
//                  5                     8
//               /     \                 / \
//              3*      8               7   9
//             / \     / \    --->     /
//            2   4   7   9           6
//                   /               /
//                  6               3*
//                                 / \
//                                2   4
//
// we'll choose option (1) and we'll find the minimum number in the right subtree that
// has no left pointer
// that one is going to be the node that will link to the left subtree of the current
// -soon to be deleted- node. by doing that we'll preserve the structure of the BST
// (nodes to the left of a node should be smaller, and numbers to the
// right should be greater).
