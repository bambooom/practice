// https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/

import { TreeNode } from './util';

function longestZigZag(root: TreeNode | null): number {
  let max = 0;

  function dfs(node: TreeNode | null, prev: 'l' | 'r', steps: number) {
    if (!node) {
      return;
    }

    max = Math.max(max, steps);

    dfs(node.left, 'l', prev === 'r' ? steps + 1 : 1);
    dfs(node.right, 'r', prev === 'l' ? steps + 1 : 1);
  }

  dfs(root, 'l', 0);
  dfs(root, 'r', 0);

  return max;
}
