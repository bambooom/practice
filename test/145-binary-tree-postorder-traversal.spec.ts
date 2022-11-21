import {
  TreeNode,
  postorderTraversal,
} from '../leetcode/145-binary-tree-postorder-traversal';

describe('postorder traversal on binary tree', () => {
  test('tree [1, null, 2, 3] postorder as [3,1,1]', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.left = new TreeNode(3);
    expect(postorderTraversal(root)).toEqual([3, 2, 1]);
  });

  test('tree postorder correct', () => {
    /**
     *           1
     *         /   \
     *        2     3    postotder traversal: 4 -> 5 -> 2 -> 6 -> 3 -> 1
     *       / \   /     (left -> right -> root)
     *      4   5 6
     */
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    expect(postorderTraversal(root)).toEqual([4, 5, 2, 6, 3, 1]);
  });
});
