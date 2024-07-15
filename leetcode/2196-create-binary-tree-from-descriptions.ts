// https://leetcode.com/problems/create-binary-tree-from-descriptions
// You are given a 2D integer array descriptions where descriptions[i] = [parenti, childi, isLefti] indicates that parenti is the parent of childi in a binary tree of unique values. Furthermore,

// If isLefti == 1, then childi is the left child of parenti.
// If isLefti == 0, then childi is the right child of parenti.
// Construct the binary tree described by descriptions and return its root.

// The test cases will be generated such that the binary tree is valid.

import { TreeNode } from './util';

function createBinaryTree(descriptions: number[][]): TreeNode | null {
  const nodes = new Map();
  const childrenVals = new Set<number>();

  for (const d of descriptions) {
    const parent = nodes.get(d[0]) || new TreeNode(d[0]);
    const child = nodes.get(d[1]) || new TreeNode(d[1]);
    if (d[2] === 1) {
      parent.left = child;
    } else {
      parent.right = child;
    }
    nodes.set(d[0], parent);
    nodes.set(d[1], child);
    childrenVals.add(d[1]);
  }

  let root: TreeNode | null = null;
  for (const d of descriptions) {
    if (!childrenVals.has(d[0])) {
      root = nodes.get(d[0]);
    }
  }
  return root;
}
