// https://leetcode.com/problems/n-ary-tree-preorder-traversal/
// Given the root of an n-ary tree, return the preorder traversal of its nodes' values.
// N-ary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value

import { NNode } from './util';

/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */
// root, left, right

// recursive
function preorder(root: NNode | null): number[] {
  const result: number[] = [];

  function traverse(tree: NNode | null): number[] {
    if (!tree) {
      return result;
    }
    result.push(tree.val);
    for (let i = 0; i < tree.children.length; i++) {
      traverse(tree.children[i]);
    }
    return result;
  }

  return traverse(root);
}

// iterative
function preorder2(root: NNode | null): number[] {
  const stack: NNode[] = [];
  const result: number[] = [];
  if (!root) {
    return result;
  }
  stack.push(root);
  while (stack.length) {
    const node = stack.pop() as NNode;
    result.push(node.val);
    for (let i = 0; i < node.children.length; i++) {
      stack.push(node.children[i]);
    }
  }

  return result;
}
