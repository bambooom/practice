import {
  TreeNode,
  preorderTraversal,
} from '../leetcode/144-binary-tree-preorder-traversal';

describe('preorder traversal on binary tree', () => {
  test('tree [1, null, 2, 3] preorder as [1,3,2]', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.left = new TreeNode(3);
    expect(preorderTraversal(root)).toEqual([1, 2, 3]);
  });

  test('tree preorder correct', () => {
    /**
     *           1
     *         /   \
     *        2     3    preorder traversal: 1 -> 2 -> 4 -> 5 -> 3 -> 6
     *       / \   /     (root -> left -> right)
     *      4   5 6
     */
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    expect(preorderTraversal(root)).toEqual([1, 2, 4, 5, 3, 6]);
  });
});
