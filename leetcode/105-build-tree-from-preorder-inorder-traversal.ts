// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree
// and inorder is the inorder traversal of the same tree, construct and return the binary tree.
// preorder: parent, left, right
// inorder: left, parent, right

// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]

import { TreeNode } from './util';

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (!preorder.length || !inorder.length) return null;
  const hash: { [key: number]: number } = {};
  for (let i = 0; i < inorder.length; i++) {
    hash[inorder[i]] = i;
  }

  return helper(preorder, 0, inorder.length - 1, hash);
}

function helper(
  preorder: number[],
  start: number,
  end: number,
  hash: { [key: number]: number },
): TreeNode | null {
  if (start > end) return null;
  const pop = preorder[0];
  preorder.shift();
  const root = new TreeNode(pop);
  root.left = helper(preorder, start, hash[pop] - 1, hash);
  root.right = helper(preorder, hash[pop] + 1, end, hash);
  return root;
}

/**
 * Intuition:
- Preorder traversal follows Root -> Left -> Right, therefore, given the preorder array preorder, we have easy access to the root which is preorder[0].
- Inorder traversal follows Left -> Root -> Right, therefore if we know the position of Root, we can recursively split the entire array into two subtrees.
Now the idea should be clear enough. We will design a recursion function: it will set the first element of preorder as the root, and then construct the entire tree.
To find the left and right subtrees, it will look for the root in inorder, so that everything on the left should be the left subtree,
and everything on the right should be the right subtree. Both subtrees can be constructed by making another recursion call.
It is worth noting that, while we recursively construct the subtrees,
we should choose the next element in preorder to initialize as the new roots.
This is because the current one has already been initialized to a parent node for the subtrees.
 */
