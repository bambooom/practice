// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

// Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
// Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
// #depth-first-search #breadth-first-search #binary-tree

import { TreeNode } from './util';

// e.g.
//    1
//   / \
//  2   3
//     / \
//    4   5
//
// data = [1, 2, null, null, 3, 4, null, null, 5, null, null]

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  const data: (number | null)[] = [];

  function go(node: TreeNode | null) {
    if (node == null) {
      data.push(null);
      return;
    }

    data.push(node.val);
    go(node.left);
    go(node.right);
  }

  go(root);
  return JSON.stringify(data);
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const dataArr = JSON.parse(data);
  function go(): TreeNode | null {
    if (dataArr.length === 0) {
      return null;
    }
    const val = dataArr.shift();
    if (val == null) {
      return null;
    }

    const node = new TreeNode(val);
    node.left = go();
    node.right = go();
    return node;
  }

  return go();
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solutions/411608/javasscript-bfs-dfs-solution/
// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solutions/74289/javascript-in-leetcode-format-level-order-traversal-using-bfs/
