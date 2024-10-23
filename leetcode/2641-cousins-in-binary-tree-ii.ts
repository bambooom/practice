// https://leetcode.com/problems/cousins-in-binary-tree-ii
// Given the root of a binary tree, replace the value of each node in the tree with the sum of all its cousins' values.
// Two nodes of a binary tree are cousins if they have the same depth with different parents.
// Return the root of the modified tree.
// Note that the depth of a node is the number of edges in the path from the root node to it.

// Example1
// Input: root = [5,4,9,1,10,null,7]
// Output: [0,0,0,7,7,null,11]
// Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
// - Node with value 5 does not have any cousins so its sum is 0.
// - Node with value 4 does not have any cousins so its sum is 0.
// - Node with value 9 does not have any cousins so its sum is 0.
// - Node with value 1 has a cousin with value 7 so its sum is 7.
// - Node with value 10 has a cousin with value 7 so its sum is 7.
// - Node with value 7 has cousins with values 1 and 10 so its sum is 11.

// Example2:
// Input: root = [3,1,2]
// Output: [0,0,0]
// Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
// - Node with value 3 does not have any cousins so its sum is 0.
// - Node with value 1 does not have any cousins so its sum is 0.
// - Node with value 2 does not have any cousins so its sum is 0.

import { TreeNode } from './util';

// https://leetcode.com/problems/cousins-in-binary-tree-ii/solutions/3420504/typescript-siblingnode-interface-bfs/
// siblingNode
interface SiblingNode {
  sum: number;
  node: TreeNode;
}
function replaceValueInTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  let queue: SiblingNode[] = [{ node: root, sum: root.val }];

  while (queue.length > 0) {
    // sum up all cousins
    const cousinSum = queue.reduce(
      (s, sibling: SiblingNode) => s + sibling.node.val,
      0,
    );

    const nextQueue: SiblingNode[] = [];
    queue.forEach((sibling) => {
      const siblingSum =
        (sibling.node.left?.val || 0) + (sibling.node.right?.val || 0);

      if (sibling.node.left !== null) {
        nextQueue.push({ node: sibling.node.left, sum: siblingSum });
      }

      if (sibling.node.right !== null) {
        nextQueue.push({ node: sibling.node.right, sum: siblingSum });
      }
    });
    // replace values with (cousinSum - siblingSum)
    queue.forEach((sibling) => (sibling.node.val = cousinSum - sibling.sum));
    queue = nextQueue;
  }

  return root;
}

// https://leetcode.com/problems/cousins-in-binary-tree-ii/solutions/5955172/beats-97/
// dfs, slower than previous
function replaceValueInTree2(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;
  const dfs = (arr: TreeNode[]) => {
    if (arr.length === 0) return;

    let sum = 0;

    for (const node of arr) {
      if (!node) continue;
      if (node.left) {
        sum += node.left.val;
      }
      if (node.right) {
        sum += node.right.val;
      }
    }

    const childArr: TreeNode[] = [];

    for (const node of arr) {
      let curSum = 0;

      if (node.left) {
        curSum += node.left.val;
      }

      if (node.right) {
        curSum += node.right.val;
      }

      if (node.left) {
        node.left.val = sum - curSum;
        childArr.push(node.left);
      }

      if (node.right) {
        node.right.val = sum - curSum;
        childArr.push(node.right);
      }
    }

    dfs(childArr);
  };

  root.val = 0;

  dfs([root]);

  return root;
}
