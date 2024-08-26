// https://leetcode.com/problems/n-ary-tree-postorder-traversal/
// Given the root of an n-ary tree, return the postorder traversal of its nodes' values.
// Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

// Example1:
// Input: root = [1,null,3,2,4,null,5,6]
// Output: [5, 6, 3, 2, 4, 1]
// Example2:
// Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]

/**
 * Definition for node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

import { _Node } from './util';

// slower
function postorder(root: _Node | null): number[] {
  if (!root) return [];
  return [...root.children.map(postorder).flat(), root.val];
}

// faster
function postorder2(root: _Node | null): number[] {
  if (!root) return [];

  const stack = [root];
  const results = [];

  while (stack.length) {
    const node = stack.pop()!;

    if (node.children.length > 0) {
      stack.push(...node.children);
    }
    results.push(node.val);
  }
  return results.reverse();
}
