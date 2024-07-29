// https://leetcode.com/problems/encode-n-ary-tree-to-binary-tree
// Design an algorithm to encode an N-ary tree into a binary tree and decode the binary tree to get the original N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. Similarly, a binary tree is a rooted tree in which each node has no more than 2 children. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that an N-ary tree can be encoded to a binary tree and this binary tree can be decoded to the original N-nary tree structure.
// Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See following example).
// For example, you may encode the following 3-ary tree to a binary tree in this way:

/**
 * Definition for _Node.
 */
// class _Node {
//   val: number;
//   children: _Node[];

//   constructor(v: number, c: _Node[] = []) {
//     this.val = v;
//     this.children = c;
//   }
// }

import { _Node, TreeNode } from './util';

// https://leetcode.com/problems/encode-n-ary-tree-to-binary-tree/solutions/4945464/recursive-solution-in-typescript/?envType=study-plan-v2&envId=premium-algo-100
class Codec {
  constructor() {
    // empty
  }

  // Encodes a tree to a binary tree.
  serialize(root: _Node | null): TreeNode | null {
    if (!root) return null;
    return this.encode(root);
  }

  // Decodes your encoded data to tree.
  deserialize(root: TreeNode | null): _Node | null {
    if (!root) return null;
    const decRoot = this.decode(root);
    return !decRoot.length ? null : decRoot[0];
  }

  private encode(root: _Node | null): TreeNode | null {
    if (!root) return null;

    const childrenCount = root.children.length;
    const encodeRoot = new TreeNode(root.val);

    if (!childrenCount) {
      return encodeRoot;
    }

    let subtrees = [];
    for (const child of root.children) {
      subtrees.push(this.encode(child));
    }

    // at most 2 children
    if (childrenCount === 1) {
      encodeRoot.left = subtrees[0];
      return encodeRoot;
    }
    if (childrenCount === 2) {
      encodeRoot.left = subtrees[0];
      encodeRoot.right = subtrees[1];
      return encodeRoot;
    }

    // more than 2 children
    while (subtrees.length > 2) {
      const n = Math.ceil(subtrees.length / 2);
      const temp = [];

      for (let i = 0; i < n; i++) {
        const left = 2 * i;
        const right = left + 1;

        if (left < subtrees.length && right < subtrees.length) {
          temp.push(new TreeNode(-1, subtrees[left], subtrees[right]));
        } else if (left < subtrees.length) {
          temp.push(subtrees[left]);
        }
      }

      subtrees = temp;
    }

    const rightTree = subtrees.pop();
    const leftTree = subtrees.pop();

    encodeRoot.left = leftTree ?? null;
    encodeRoot.right = rightTree ?? null;
    return encodeRoot;
  }

  private decode(root: TreeNode | null): _Node[] {
    if (!root) return [];

    const decodeRoot = new _Node(root.val);
    let leftSubtree: _Node[] = [];
    let rightSubtree: _Node[] = [];

    if (root.left) {
      leftSubtree = this.decode(root.left);
    }

    if (root.right) {
      rightSubtree = this.decode(root.right);
    }

    const children = [...leftSubtree, ...rightSubtree];

    if (root.val === -1) {
      return children;
    }

    decodeRoot.children = children;
    return [decodeRoot];
  }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));
