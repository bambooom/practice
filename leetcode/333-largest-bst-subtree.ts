// https://leetcode.com/problems/largest-bst-subtree/
// Given the root of a binary tree, find the largest subtree, which is also a Binary Search Tree (BST),
// where the largest means subtree has the largest number of nodes.

// A Binary Search Tree (BST) is a tree in which all the nodes follow the below-mentioned properties:
// - The left subtree values are less than the value of their parent (root) node's value.
// - The right subtree values are greater than the value of their parent (root) node's value.
// Note: A subtree must include all of its descendants.

import { TreeNode } from './util';

// https://leetcode.com/problems/largest-bst-subtree/solutions/5087194/dfs-postorder-clear-readable-code-typescript/?envType=study-plan-v2&envId=premium-algo-100
// postorder dfs
type NodeResult = {
  isNull?: boolean;
  numNodes: number;
  min: number;
  max: number;
  isBST: boolean;
};

function largestBSTSubtree(root: TreeNode | null): number {
  let maxNodes = 0;

  const dfs = (node: TreeNode | null): NodeResult => {
    if (!node) {
      return {
        isNull: true,
        numNodes: 0,
        min: Infinity,
        max: -Infinity,
        isBST: false,
      };
    }

    const left = dfs(node.left);
    const right = dfs(node.right);

    const isBST =
      (left.isNull || (left.isBST && left.max < node.val)) &&
      (right.isNull || (right.isBST && node.val < right.min));

    if (isBST) {
      // if BST, # of nodes is left + right + 1
      const numNodes = 1 + (left.numNodes ?? 0) + (right.numNodes ?? 0);
      maxNodes = Math.max(maxNodes, numNodes);
      return {
        numNodes,
        min: !left.isNull ? left.min : node.val,
        max: !right.isNull ? right.max : node.val,
        isBST: true,
      };
    }
    return {
      numNodes: 0,
      min: Infinity,
      max: -Infinity,
      isBST: false,
    };
  };

  dfs(root);

  return maxNodes;
}
