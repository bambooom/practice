// https://leetcode.com/problems/leaf-similar-trees/

// Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.
// Two binary trees are considered leaf-similar if their leaf value sequence is the same.

import { TreeNode } from './util';

//DFS solution with stack
function getLeafs(root: TreeNode | null): number[] {
  if (!root) return [];

  const stack: TreeNode[] = [root];
  const result: number[] = [];

  while (stack.length) {
    const cur = stack.pop()!;
    if (!cur.left && !cur.right) {
      result.push(cur.val);
    }
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
  }

  return result;
}

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  if (!root1 || !root2) return false;

  const leafs1 = getLeafs(root1);
  const leafs2 = getLeafs(root2);

  if (leafs1.length !== leafs2.length) return false;
  for (let i = 0; i < leafs1.length; i++) {
    if (leafs1[i] !== leafs2[i]) {
      return false;
    }
  }
  return true;
}
