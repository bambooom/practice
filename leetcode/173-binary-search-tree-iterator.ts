// https://leetcode.com/problems/binary-search-tree-iterator/
// #stack
// Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST):
// left root right
import { TreeNode } from './util';

class BSTIterator {
  private _root: TreeNode | null;
  private _stack: TreeNode[];
  // Initializes an object of the BSTIterator class.
  // The root of the BST is given as part of the constructor.
  // The pointer should be initialized to a non-existent number smaller than any element in the BST.
  constructor(root: TreeNode | null) {
    this._root = root;
    this._stack = [];
  }

  // Moves the pointer to the right, then returns the number at the pointer.
  next(): number {
    while (this._root) {
      this._stack.push(this._root);
      this._root = this._root.left;
    }
    const res = this._stack.pop() as TreeNode;
    this._root = res.right;
    return res.val;
  }

  // Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false.
  hasNext(): boolean {
    return !!this._root || this._stack.length > 0;
  }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
