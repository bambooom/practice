// https://leetcode.com/problems/closest-binary-search-tree-value-ii
// Given the root of a binary search tree, a target value, and an integer k, return the k values in the BST that are closest to the target. You may return the answer in any order.
// You are guaranteed to have only one unique set of k values in the BST that are closest to the target.

import { TreeNode } from './util';

function closestKValues(
  root: TreeNode | null,
  target: number,
  k: number,
): number[] {
  const res: number[] = [];

  const getDist = (x: number): number => Math.abs(x - target);

  const inorder = (node: TreeNode | null) => {
    if (!node) return;

    inorder(node.left);
    const dist = getDist(node.val);
    if (res.length === k) {
      const firstD = getDist(res[0]);
      const lastD = getDist(res[res.length - 1]);
      if (dist < firstD) {
        res.shift();
      } else {
        return;
      }
    }
    res.push(node.val);
    inorder(node.right);
  };

  inorder(root);
  return res;
}

// https://leetcode.com/problems/closest-binary-search-tree-value-ii/solutions/4686709/in-order-traversal-sort-slice/?envType=study-plan-v2&envId=premium-algo-100
// 更直接的 inorder 的值获取之后，按距离 sort 再截取 top k
function closestKValues2(
  root: TreeNode | null,
  target: number,
  k: number,
): number[] {
  const flat: number[] = [];
  const traverse = (node: TreeNode | null) => {
    if (!node) return;
    if (node.left) traverse(node?.left);
    flat.push(node.val);
    if (node.right) traverse(node.right);
  };

  traverse(root);

  flat.sort((a, b) => Math.abs(a - target) - Math.abs(b - target));

  return flat.slice(0, k);
}
