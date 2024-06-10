// https://leetcode.com/problems/clone-n-ary-tree
// Given a root of an N-ary tree, return a deep copy (clone) of the tree.
// Each node in the n-ary tree contains a val (int) and a list (List[Node]) of its children.
// Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value

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

function cloneTree(root: NNode | null): NNode | null {
  if (!root) return null;
  return new NNode(root.val, root.children.map(cloneTree) as NNode[]);
}
