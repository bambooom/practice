// https://leetcode.com/problems/insert-into-a-binary-search-tree/
// You are given the root node of a binary search tree(BST) and a value to insert into the tree.
// Return the root node of the BST after the insertion.It is guaranteed that the new value does not exist in the original BST.
// Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

import { TreeNode } from './util';

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return new TreeNode(val);
  if (val > root.val) {
    root.right = insertIntoBST(root.right, val);
  }
  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  }
  return root;
}

// One of the huge BST advantages is a search for arbitrary element in O(logN) time.
// Here we'll see that the insert time is O(logN), too, in the average case.

// The problem solution is very simple - one could always insert new node as a child of the leaf.
// To define which leaf to use, one could follow the standard BST logic:
//  - If val > node.val - go to insert into the right subtree.
//  - If val < node.val - go to insert into the left subtree
