// https://leetcode.com/problems/find-root-of-n-ary-tree
// You are given all the nodes of an N-ary tree as an array of Node objects, where each node has a unique value.
// Return the root of the N-ary tree.

// Custom testing:
// An N-ary tree can be serialized as represented in its level order traversal where each group of children is separated by the null value (see examples).
// For example, the above tree is serialized as [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14].
// The testing will be done in the following way:
// 1. The input data should be provided as a serialization of the tree.
// 2. The driver code will construct the tree from the serialized input data and put each Node object into an array in an arbitrary order.
// 3. The driver code will pass the array to findRoot, and your function should find and return the root Node object in the array.
// 4. The driver code will take the returned Node object and serialize it. If the serialized value and the input data are the same, the test passes.

import { NNode } from './util';

/**
 * Definition for NNode.
 * class NNode {
 *     val: number
 *     children: NNode[]
 *     constructor(val?: number, children?: NNode[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = (children===undefined ? [] : children)
 *     }
 * }
 */

function findRoot(tree: NNode[]): NNode | null {
  const set = new Set<number>();

  // travese to collect all children's values
  for (const node of tree) {
    for (const child of node.children) {
      set.add(child.val);
    }
  }

  let root: NNode | null = null;

  // not collected value is the root
  for (const node of tree) {
    if (!set.has(node.val)) {
      root = node;
    }
  }

  return root;
}
