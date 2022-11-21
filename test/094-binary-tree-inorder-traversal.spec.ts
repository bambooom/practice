import {
  TreeNode,
  inorderTraversal,
} from '../leetcode/094-binary-tree-inorder-traversal';

describe('inorder traversal on binary tree', () => {
  test('tree [1,null,2,3] inorder as [1,3,2]', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.left = new TreeNode(3);
    expect(inorderTraversal(root)).toEqual([1, 3, 2]);
  });

  test('tree [1,2,3,4,5,6] inorder as [4,2,5,1,6,3]', () => {
    /**
     *           1
     *         /   \
     *        2     3    inorder traversal: 4 -> 2 -> 5 -> 1 -> 6 -> 3
     *       / \   /     (left -> root -> right)
     *      4   5 6
     */
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    expect(inorderTraversal(root)).toEqual([4, 2, 5, 1, 6, 3]);
  });
});
