// https://leetcode.com/problems/two-sum-bsts

// Given the roots of two binary search trees, root1 and root2, return true if and only if there is a node in the first tree and a node in the second tree whose values sum up to a given integer target.

// Input: root1 = [2,1,4], root2 = [1,0,3], target = 5
// Output: true
// Explanation: There are two valid pairs: 2 and 3 whose sum is 5.

import { TreeNode } from './util';

// https://leetcode.com/problems/two-sum-bsts/solutions/3684879/simple-typescript-solution-with-explanation-beats-100/?envType=study-plan-v2&envId=premium-algo-100
// Collect values from both trees and apply two sum logic.
function twoSumBSTs(
  root1: TreeNode | null,
  root2: TreeNode | null,
  target: number,
): boolean {
  // in-order traverse: left -> root -> right
  const inorder = (root: TreeNode | null, tree: number[]) => {
    if (!root) return;
    inorder(root.left, tree);
    tree.push(root.val);
    inorder(root.right, tree);
  };

  const tree1: number[] = [],
    tree2: number[] = [];
  inorder(root1, tree1);
  inorder(root2, tree2);

  if (
    target < tree1[0] + tree2[0] || // less than minimum sum
    target > tree1[tree1.length - 1] + tree2[tree2.length - 1] // greater than maximum sum
  ) {
    return false;
  }

  const s = new Set(tree1.map((v) => target - v));
  return tree2.some((v) => s.has(v));
}

// https://leetcode.com/problems/two-sum-bsts/solutions/4134092/preorder-traversal/?envType=study-plan-v2&envId=premium-algo-100

// preorder traversal: root -> left -> right
function twoSumBSTs2(
  root1: TreeNode | null,
  root2: TreeNode | null,
  target: number,
): boolean {
  const nodeList1: Set<number> = new Set();
  const nodeList2: Set<number> = new Set();

  const preOrder = (root: TreeNode | null, list: Set<number>) => {
    if (!root) return;
    list.add(root.val);
    preOrder(root.left, list);
    preOrder(root.right, list);
  };

  preOrder(root1, nodeList1);
  preOrder(root2, nodeList2);

  let result = false;

  nodeList1.forEach((val) => {
    if (nodeList2.has(target - val)) {
      result = true;
    }
  });

  return result;
}
