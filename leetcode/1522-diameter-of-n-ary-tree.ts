// https://leetcode.com/problems/diameter-of-n-ary-tree
// Given a root of an N-ary tree, you need to compute the length of the diameter of the tree.
// The diameter of an N-ary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root.
// (Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value.)

import { NNode } from './util';

/**
 * Definition for NNode.
 * class NNode {
 *     val: number
 *     children: NNode[]
 *
 *     constructor(val?: number, children?: NNode[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = (children===undefined ? [] : children)
 *     }
 * }
 */

// https://leetcode.com/problems/diameter-of-n-ary-tree/solutions/4526127/typescript-javascript-o-n-dfs-solution-no-sorting/?envType=study-plan-v2&envId=premium-algo-100
// The idea is to get the diameter by adding the two largest depth from leaf node to leaf node or by using the largest depth from leaf node to root node.
function diameter(root: NNode): number {
  let max = 0;

  const dfs = (node: NNode): number => {
    if (node.children.length === 0) return 0;

    let first = 0,
      second = 0;
    for (const child of node.children) {
      const len = 1 + dfs(child);
      if (len >= first) {
        second = first;
        first = len;
      } else if (len > second) {
        second = len;
      }
    }

    max = Math.max(first + second, max);
    return first;
  };

  dfs(root);
  return max;
}
