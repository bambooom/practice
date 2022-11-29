import { TreeNode } from './util';

// function inorder(root: TreeNode | null) {
//   if (!root) return [];
//   root.left && inorder(root.left);
//   console.log(root.val);
//   root.right && inorder(root.right);
// }

// const root = new TreeNode(1);
// root.right = new TreeNode(2);
// root.right.left = new TreeNode(3);

// inorder(root); // can only print out the result, not return a array

// inorder: left, root, right
/**
 * The goal is to maintain a stack of nodes to visit as we traverse
 * down the tree. As we traverse down, We go left and push all the
 * left nodes first in the stack. Once we reach to the bottom, we
 * store the node value and traverse right.
 *           1
 *         /   \
 *        2     3    preorder traversal: 4 -> 2 -> 5 -> 1 -> 6 -> 3
 *       / \   /     (left -> root -> right)
 *      4   5 6
 */

/**
 * iterative solution using stack
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
export function inorderTraversal(root: TreeNode | null): number[] {
  const stack: TreeNode[] = [];
  const res: number[] = [];

  while (root || stack.length) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop() || null;
      root && res.push(root.val);
      root = root?.right || null;
    }
  }

  return res;
}

/**
 * Recursive
 * Time complexity: O(n)
 *  - The time complexity is O(n) because the recursive function is T(n)=2*T(n/2)+1.
 * Space complexity: O(n)
 *  - The worst case space required is O(n), and in the average case it's O(logn) where n is number of nodes.
 */
function inorderTraversal2(root: TreeNode | null): number[] {
  const result: number[] = [];

  function traverse(node: TreeNode | null) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }

  traverse(root);
  return result;
}
