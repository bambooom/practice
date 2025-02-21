// https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree/description/
// Given a binary tree with the following rules:
// root.val == 0
// For any treeNode:
// If treeNode.val has a value x and treeNode.left != null, then treeNode.left.val == 2 * x + 1
// If treeNode.val has a value x and treeNode.right != null, then treeNode.right.val == 2 * x + 2
// Now the binary tree is contaminated, which means all treeNode.val have been changed to -1.

// Implement the FindElements class:

// FindElements(TreeNode* root) Initializes the object with a contaminated binary tree and recovers it.
// bool find(int target) Returns true if the target value exists in the recovered binary tree.

import { TreeNode } from './util';

class FindElements {
  root: TreeNode | null;
  set: Set<number>;
  constructor(root: TreeNode | null) {
    this.root = root;
    this.set = new Set<number>();

    const dfs = (node: TreeNode) => {
      this.set.add(node.val);
      if (node.left) {
        node.left.val = node.val * 2 + 1;
        dfs(node.left);
      }
      if (node.right) {
        node.right.val = node.val * 2 + 2;
        dfs(node.right);
      }
    };

    if (this.root) {
      this.root.val = 0;
      dfs(this.root);
    }
  }

  find(target: number): boolean {
    return this.set.has(target);
  }
}

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */
