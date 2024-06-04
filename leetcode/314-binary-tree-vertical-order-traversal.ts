// https://leetcode.com/problems/binary-tree-vertical-order-traversal
// Given the root of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom, column by column).
// If two nodes are in the same row and column, the order should be from left to right.

// #Breadth-First Search

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { TreeNode } from './util';

// https://leetcode.com/problems/binary-tree-vertical-order-traversal/solutions/1623886/javascript-simple-breadth-first-traversal-o-n/?envType=study-plan-v2&envId=premium-algo-100
function verticalOrder(root: TreeNode | null): number[][] {
  // return and empty array if the root doesn't exist
  if (!root) return [];
  // setup the queue and result arrays
  // the queue will consist of the node and the column it's at
  const queue: [TreeNode, number][] = [[root, 0]],
    result: number[][] = [];
  // declare a min to track where the smallest column is
  // I set this to 1, so the origin (column 0) gets processed correctly
  let min = 1;
  // process the queue until it's empty
  while (queue.length) {
    // get the node and column from the queue
    const [node, column] = queue.shift()!;
    // push the left and right nodes and their columns if they exist
    if (node.left) queue.push([node.left, column - 1]);
    if (node.right) queue.push([node.right, column + 1]);
    // if the column is less than the min so far, add it to the front of the result
    if (column < min) result.unshift([node.val]), (min = column);
    // if the column is greater than the max so far, add it to the back of the result
    else if (column - min > result.length - 1) result.push([node.val]);
    // otherwise add the value to the list already at that column
    else result[column - min].push(node.val);
  }
  // all done
  return result;
}
