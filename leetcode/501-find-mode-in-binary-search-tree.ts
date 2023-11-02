// https://leetcode.com/problems/find-mode-in-binary-search-tree/
// Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.
// If the tree has more than one mode, return them in any order.

// Assume a BST is defined as follows:
// - The left subtree of a node contains only nodes with keys less than or equal to the node's key.
// - The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
// - Both the left and right subtrees must also be binary search trees.

import { TreeNode } from './util';

function findMode(root: TreeNode | null): number[] {
  if (!root) return [];
  if (!root.left && !root.right) return [root.val];

  const hash = new Map<number, number>();

  const dfs = (root: TreeNode | null) => {
    if (!root) return root;
    dfs(root.left);
    hash.set(root.val, (hash.get(root.val) ?? 0) + 1);
    dfs(root.right);
  };

  dfs(root);

  const maxValue = Math.max(...hash.values());
  const result: number[] = Array.from(hash.entries()).reduce(
    (prev: number[], item: number[]) => {
      if (item[1] === maxValue) {
        return [...prev, item[0]];
      }
      return prev;
    },
    [],
  );

  return result;
}
